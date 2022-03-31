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
export class pageManage{
	#content=[]
	constructor(){
		this.resize()
	}
	value(x=0,y=-1){
		return y<0?this.#content[x]:this.#content[x].charAt(y)
	}
	forEach(fn){
		this.#content.forEach(fn)
	}
	map(fn){
		return this.#content.map(fn)
	}
	resize(){
		console.clear()
		this.#content.length=height()
		this.#content.fill(" ".repeat(width()))	
		return this
	}
	print(fn=(arg)=>arg){
		console.clear()
		//fn for decrotation
		let ctt = [...this.#content]
		process.stdout.write(fn(ctt).join("\n"))
		return this
	}
	top(offset,content){
		this.#content[offset]=content
		return this
	}
	bottom(offset,content){
		this.#content[height(-1-offset)]=content
		return this
	}
}
// const {stdin,stdout}=process
// stdin.setRawMode(true)
// stdin.resume()
// stdin.setEncoding('utf8')

// let pm = new pageManage()
// pm.top(0,'head').top(5,'paragraph')
// pm.bottom(0,'footer').bottom(2,'[console]>_:')
// pm.print()
// console.log(pm)

// stdin.on('data',key=>{
// 	if(key === '\x03'){
// 		console.clear()
// 		process.exit()
// 	}
// })
// stdout.on('resize',()=>{
// 	pm.resize()
// 	pm.top(0,'head').top(5,'paragraph')
// 	pm.bottom(0,'footer').bottom(2,'[console]>_:')
// 	pm.print()
// })

function height(offset=0){
	return process.stdout.getWindowSize()[1]+offset
}
function width(offset=0){
	return process.stdout.getWindowSize()[0]+offset
}
// function getDir(key){
// 	let x=0,y=0;
// 	if(key=='j')y+=1
// 	if(key=='k')y-=1
// 	if(key=='l')x+=1
// 	if(key=='h')x-=1
// 	return [x,y]
// }
// function clamp(x,min,max){
// 	if (x<min)x=min;
// 	if (x>max)x=max;
// 	return x
// }
// let cm = cursorManege();
// cm.xBound=(x)=>{
// 	return clamp(x,0,6)
// }
// cm.yBound=(y)=>clamp(y,0,6)
// // cm.print()
// // cm.move([3,-9]);
// // console.log("%o",cm)
// let keys=["j","j","j","j","j","j","j","j","j","j","l"]
// keys.forEach((key)=>{
// 	cm.move(getDir(key)).print(key+" :")
// })
