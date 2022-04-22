#! /usr/bin/env node
import {center,align}from './lib/text.js'
import {textBox,clamp,show,cursorManage,
	height,width} from './lib/manage.js'
import {dailyArticle} from './lib/get.js'
import {pipe,curry} from './lib/FP.js'

import * as fs from 'fs'

const {stdin,stdout} =process;
const storage = 'storage.txt';

const clear = console.clear;
const cursor = cursorManage();
const clog = str=> process.stdout.write(str);

let artlen=10000;
let bottom = [' >_:'];
let todoBox = new textBox('todo')
let articleBox = new textBox('article')
articleBox.format=formatArticle

let BoxArray=[];
BoxArray.push(articleBox)
BoxArray.push(todoBox)
BoxArray.push(new textBox('text',{
	origin:['hell','wolrd'],
	bottom:['paradise','is','hell']
})
)

INIT()
fs.readFile(storage,(err,data)=>{
	let todos=data.toString().trim().split('\n')
	todoBox.origin=todos
		.map((item)=>item.replace(/#+/,"$&".cyan()))
		.map((item)=>item.replace("-","o".red()))
	// formatTodo
	todoBox.bottom=['TODO'.invert()]
})

getArticle()

cursor.xBound=(x)=>x<0?x+BoxArray.length:x%BoxArray.length;
cursor.yBound=(y)=>clamp(y,0,artlen-1);

cursor.afterMove=loop;

function loop(args){
	let offset = cursor.y()
	let [key="noKey",code=-1]=args;
	bottom[1]=align(
		` key:${key},code:${code},corsor:${cursor.value()},artlen:${artlen}`,
		'',
		getHMStime()+'  '
	);
	articleBox.bottom=[...bottom.map(i=>i.invert().blue())]
	let currentBox = BoxArray[cursor.x()]
	artlen=currentBox.render(offset,offset+height(-bottom.length))

	// you havan't use FP, why not?
}
function getHMStime(){
	let today = new Date()
	let time=[today.getHours(),today.getMinutes(),today.getSeconds()]
	time = time
		.map(i=>(i+'').padStart(2,'0'))
	return time.join(':')
}

stdin.on('data',(key)=>{
	key = key.toString()[0]
	let code =key.codePointAt(0) 
	cursor.move(getDirection(key),key,code)
})

function getArticle(i=1){
	dailyArticle().then(article=>{
		articleBox.origin=[...article]
		cursor.move([0,0],'Article Get')
	}).catch(err=>{
		articleBox.origin=[`没有网络`,`No Internet`].map(item=>item+'... '+i)
		cursor.move([0,0],'No Internet'+i)
		setTimeout(getArticle,2000,i+1)
	})
}

function formatArticle(data){
	let article=[...data]
	const title=center(article[0].green())
	const author=center(article[1].yellow())
	const maintext = article.slice(2)
		.map(item=>[' '.repeat(4)+item,' '])
		.flat()
	let res = [title,author,...maintext]
	return res
}

function getDirection(key){
	let x=0,y=0;
	const keyEvent={
		j:()=>y+=1,
		k:()=>y-=1,
		d:()=>y+=5,
		g:()=>y-=cursor.y(),
		G:()=>y+=artlen-cursor.y()-height(-2),
		u:()=>y-=5,
		l:()=>x+=1,
		h:()=>x-=1,
		'\x09':()=>{
			//Tab
			x+=1;
			y=-cursor.y();
		},
		Q:()=>EXIT(),
		'\x03':()=>EXIT(),
	}
	keyEvent.hasOwnProperty(key)?keyEvent[key]():1+1
	return [x,y]
}


function INIT(){
	stdin.setRawMode(true);
	stdin.resume();
	// stdin.setEncoding('utf8'); // no need

	clog('\n'.repeat(height())) // full screen
	stdout.cursorTo(0,0)

	stdout.on('resize',()=>{
		cursor.move([0,-1],'Resize')
	})
}
function EXIT(){
	clear()
	process.exit(0)
}
