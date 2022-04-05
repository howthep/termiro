import {visualLength} from './text.js'
Array.prototype.add=function(delta){
	return this.map((item,index)=>item+delta[index])
}
export function cursorManage(x0=0,y0=0){
	let x=x0,y=y0;
	return{
		value:()=>[x,y],
		move:function(dp,...args){
			[x,y]=[x,y].add(dp)
			x=this.xBound(x);
			y=this.yBound(y);
			this.afterMove(args)
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


export function render(content,bottom=[]){
	console.clear()
	print(content.join('\n'))
	const len = bottom.length
	moveCursor(0,height(-len));
	print(bottom.join('\n'))
}
export function print(str){
	process.stdout.write(str+'')
}

export function moveCursor(x,y){
	process.stdout.cursorTo(x,y)
}
export function height(offset=0){
	return process.stdout.getWindowSize()[1]+offset
}
export function width(offset=0){
	return process.stdout.getWindowSize()[0]+offset
}
