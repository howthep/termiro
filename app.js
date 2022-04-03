#! /usr/bin/env node
import {center,right}from './lib/text.js'
import {cursorManage,pageManage}from './lib/manage.js'
import {readCache,writeCache}from './lib/cache.js'
import * as fs from 'fs'

let {stdin,stdout} =process;
let pm = new pageManage();
let TODO=null;
let cursor = cursorManage();

const clog = str=> process.stdout.write(str);
const clear = console.clear;
const storage = 'storage.txt';

stdin.setRawMode(true);
stdin.resume();
// stdin.setEncoding('utf8'); // no need

fs.readFile(storage,(err,data)=>{
	let todos=data.toString().trim().split('\n')
	TODO=todos
		.map((item)=>item.replace(/#+/,"$&".cyan()))
		.map((item)=>item.replace("-","o".red()))
	cursor.move([0,0])
})


cursor.xBound=(x)=>clamp(x,3,width(-1));
cursor.yBound=(y)=>clamp(y,0,height(-1));
cursor.afterMove=(args)=>{
	let [key="noKey",code=-1]=args;

	pm.bottom(1,'>_:你好'.blue())
	pm.bottom(0,`width:${width()},height:${height()},${code}-${key},cursor:(${cursor.value()}),cache:${readCache()}`.green())
	TODO?TODO.forEach((item,index)=>{
		pm.top(index,item)
	}):1+1//1+1 is doing nothing

	pm.print(lineNum)

	stdout.cursorTo(...cursor.value())
}

cursor.move([0,0])

stdin.on('data',(key)=>{
	let code =key.toString().codePointAt(0) 
	if(code=='3') {
		clear()
		process.exit(0)
	}
	cursor.move(getDirection(key),key,code)
})

stdout.on('resize',()=>{
	pm.resize()
	cursor.move([0,0])
})

function lineNum(arr){
	let res = [...arr]
	res.forEach((item,index,arr)=>{
		let prefix =index.toString().padStart(2,' ') +' ' ;
		arr[index]=prefix+item.slice(0,width(-prefix.length))
	})
	return res
}

function getDirection(key){
	let x=0,y=0;
	if(key=='j')y+=1
	if(key=='k')y-=1
	if(key=='l')x+=1
	if(key=='h')x-=1
	return [x,y]
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
