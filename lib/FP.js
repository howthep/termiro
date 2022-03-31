const clog=console.log
function pipe(...args){
	return function pipeFn(input){
		// for(let i=0;i<args.length;i++){
		// 	res=args[i](res)
		// }
		// return res;
		return args.reduce((res,fn)=>fn(res)
			,input)
	}
}
function curry(fn){
	return function curryFn(...args){
		if(args.length>=fn.length){
			return fn(...args)
		}
		return function(rest){
			return curryFn(...args,rest)
		}
	}
}

// function curry(fn){
// 	return function curryFn(...args){
// 		function (rest){
// 			return fn(...args,rest)
// 		}
// 	}
// }

function add(x){
	return function addFn(y){
		clog('add',x,y)
		return x+y
	}
}
function mpl(x,y){
	return x*y
}
function strcat(str1,str2){
	return str2+str1
}

const mplCurry=curry(mpl)
clog(mplCurry(3,5))

const strAdd=curry(strcat)
clog(strAdd("fisrt")("blood"))
// const add2=add(-2);
// const square=(x)=>x*x;
// const cpt=pipe(add2,square)
// console.log("%o",cpt(3))
