#! /usr/bin/env node
import {center,right}from './lib/text.js'
import {cursorManege}from './lib/manage.js'
import * as fs from 'fs'
var {stdin,stdout} =process
// const clog = console.log

const clog = str=> process.stdout.write(str)
const clear = console.clear
stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')


let page=reset([]);
page.fill('='.repeat(width(-2)));

const storage = 'storage.txt';
fs.readFile(storage,(err,data)=>{
	let lines=data.toString().trim().split('\n')
	page.splice(0,lines.length,...lines)
})

page.forEach((item,index,arr)=>{
	// add line number
	arr[index]=index.toString().padStart(2," ")+arr[index]
})

let cursor = cursorManege();
cursor.xBound=(x)=>clamp(x,0,width(-1));
cursor.yBound=(y)=>clamp(y,0,height(-1));
cursor.afterMove=()=>{
	stdout.cursorTo(...cursor.value())
}

TUI()
cursor.move([0,0])

function TUI(key='Nokey'){

	page[height(-2)]='>:_'.green().grey()
	page[height(-1)]=`width:${width()}, height:${height()}, key:${key.charCodeAt(0)}-${key} ${cursor.value()}`.green()
	// let show=page.map((str)=> str.slice(0,width()) )
	//it will slice my ANSI
	clog(page.join('\n'))
}

stdin.on('data',function(key){
	clear()
	if(key==='\x03') {
		process.exit()
	}
	else if (key==='\x01'){
		clog("trl+A")
	}

	TUI(key)
	cursor.move(getDirection(key))
})

stdout.on('resize',()=>{
	clear()
	page=reset([]).fill('~')
	TUI()
	//clog('resize: '+stdout.getWindowSize().toString())
})


function getDirection(key){
	let x=0,y=0;
	if(key=='j')y+=1
	if(key=='k')y-=1
	if(key=='l')x+=1
	if(key=='h')x-=1
	return [x,y]
}

function reset(arr){
	arr.length=height()
	return arr.fill("")
}
function height(offset=0){
	return process.stdout.getWindowSize()[1]+offset
}
function width(offset=0){
	return process.stdout.getWindowSize()[0]+offset
}
function clamp(x,min,max){
	if (x<min)x=min;
	if (x>max)x=max;
	return x
}
