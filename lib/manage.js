import {visualLength} from './text.js'
Array.prototype.add=function(delta){
	return this.map((item,index)=>item+delta[index])
}
Array.prototype.isEqual=function(otherArray){
	return this.every((item,index)=>item==otherArray[index])
}
export function cursorManage(x0=0,y0=0){
	let x=x0,y=y0;
	return{
		value:()=>[x,y],
		y:()=>y,
		x:()=>x,
		move:function(dp,...args){
			let [newx,newy]=[x,y].add(dp)
			newx=this.xBound(newx);
			newy=this.yBound(newy);
			// console.log(newx,newy,dp,dp.isEqual([0,0]))
			if(![newx,newy].isEqual([x,y])||args[0].length>1){
				;
				[x,y]=[newx,newy];
				this.afterMove(args);
			}
			return this
		},
		//call after move()
		afterMove:()=>{},
		xBound:(newx)=>{
			return newx;
		},
		yBound:(newy)=>{
			return newy;
		},
	}
}
// let arr = [0,0]

// console.log(arr.isEqual([0,0]))
export class textBox{
	constructor(name,{origin=[],bottom=[]}={}){
		// ={} is must 
		this.origin=origin;
		this.bottom=bottom;
		this.name = name;
	}
	format(origin){
		return origin;
	}
	render(start=0,end=-1){
		let formated = this.format(this.origin).fitPage()
		let toScreen = formated.slice(start,end<0?formated.length:end);
		show(toScreen,this.bottom)
		return formated.length
	}
}

export function show(content=['no content'],bottom=[]){
	console.clear()
	const len = bottom.length
	print(content.join('\n'))
	moveCursor(0,height(-len));
	print(bottom.join('\n'))
}
Array.prototype.fitPage=function(){
	let res = [...this]
	//'./lib/text.js'
	return res
		.map(text=>text.splitByWidth(width()))
		.flat()
}
function print(str){
	process.stdout.write(str+'')
}

export function moveCursor(...args){
	if (args.length==2){
		let [x,y]=args
		process.stdout.cursorTo(x,y)
	}
	else if (args.length==1){
		process.stdout.cursorTo(...args[0])
	}
}
export function height(offset=0){
	return process.stdout.getWindowSize()[1]+offset
}
export function width(offset=0){
	return process.stdout.getWindowSize()[0]+offset
}
export function clamp(x,min,max){
	if(max<min)return x;
	if (x<min)x=min;
	if (x>max)x=max;
	return x
}
