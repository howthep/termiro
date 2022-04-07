const clog=console.log
export function pipe(...args){
	return function pipeFn(input){
		// for(let i=0;i<args.length;i++){
		// 	res=args[i](res)
		// }
		// return res;
		return args.reduce((res,fn)=>fn(res)
			,input)
	}
}
export function curry(fn){
	return function curryFn(...args){
		if(args.length>=fn.length){
			return fn(...args)
		}
		return function(rest){
			return curryFn(...args,rest)
		}
	}
}



// const mplCurry=curry(mpl)
// clog(mplCurry(3,5))

// const strAdd=curry(strcat)
// clog(strAdd("fisrt")("blood"))
// const add2=add(-2);
// const square=(x)=>x*x;
// const cpt=pipe(add2,square)
// console.log("%o",cpt(3))
