export function cursorManege(x0=0,y0=0){
	// boundary position 
	// input judgeDir add 
	let x=x0,y=y0;
	return{
		// print:(str)=>{
		// 	console.log(`${str} (${x}:${y})`)
		// },
		value:()=>[x,y],
		move:function(dp){
			x+=dp[0];y+=dp[1]; 
			x=this.xBound(x);
			y=this.yBound(y);
			this.afterMove()
			return this
		},
		afterMove:()=>{},
		xBound:(newx)=>{
			return newx;
		},
		yBound:(newy)=>{
			return newy;
		},
	}
}

function getDir(key){
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
