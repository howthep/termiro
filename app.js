#! /usr/bin/env node
import {center,right}from './lib/text.js'
import {render,cursorManage,height,width}from './lib/manage.js'
import {dailyArticle} from './lib/get.js'
import * as fs from 'fs'


const {stdin,stdout} =process;
const cursor = cursorManage();
const clog = str=> process.stdout.write(str);
const clear = console.clear;
const storage = 'storage.txt';

let TODO=null;
let article = null;
let text=[],bottom = ['>_:'];

init()
// fs.readFile(storage,(err,data)=>{
// 	let todos=data.toString().trim().split('\n')
// 	TODO=todos
// 		.map((item)=>item.replace(/#+/,"$&".cyan()))
// 		.map((item)=>item.replace("-","o".red()))
// 	cursor.move([0,0])
// })

dailyArticle().then(data=>{
	let artc = data;
	text=artc
	cursor.move([0,0])
})

cursor.xBound=(x)=>clamp(x,0,width(-1) );
cursor.yBound=(y)=>clamp(y,0,height(-1) );
cursor.afterMove=(args)=>{
	let [key="noKey",code=-1]=args;
	render(formatArticle(text),bottom)
	// need to some optimize
	// you havan't use FP, why not?
	stdout.cursorTo(...cursor.value())
}


stdin.on('data',(key)=>{
	let code =key.toString().codePointAt(0) 
	if(code=='3') {
		clear()
		process.exit(0)
	}
	cursor.move(getDirection(key),key,code)
})
function formatArticle(article){
	const title=center(article[0].green())
	const author=center(article[1].yellow())
	const maintext = article.slice(2).map(item=>' '.repeat(4)+item)
	let res = [title,author,...maintext]
	return res;
}

function getDirection(key){
	let x=0,y=0;
	if(key=='j')y+=1
	if(key=='k')y-=1
	if(key=='l')x+=1
	if(key=='h')x-=1
	return [x,y]
}

function clamp(x,min,max){
	if (x<min)x=min;
	if (x>max)x=max;
	return x
}

function init(){
	stdin.setRawMode(true);
	stdin.resume();
	// stdin.setEncoding('utf8'); // no need

	clog('\n'.repeat(height())) // full screen
	stdout.cursorTo(0,0)

	stdout.on('resize',()=>{
		// cursor.move([0,0])
	// render(text,bottom)
	render(formatArticle(text),bottom)
	})
}
