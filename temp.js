const clog=console.log

function fact(x,res=1){
	return x==1 ? res:fact(x-1,x*res)
}
function test(input){
	console.time('test')
	clog(fact(input))
	console.timeEnd('test')
}

function getSomething(){
	let r = 0;
	return new Promise((resolve)=>{
		setTimeout(()=>{
			r=2;
			resolve(r+1)},1000)
	})
}

function foo(str) {
	for (let chr of str){
		console.log(chr) }
}

// foo('aaa我和你')

async function compute(){
	clog(await getSomething())
	// let x = await getSomething()
	// clog('x: '+x)
}
// so when you want to match '\', '\\' can
const str = 'ac \\asd';
const regexp = /^ab+.*d$/;
// console.log(str.match(regexp))
// compute()

let origin = [1,2,3,[1,2,3,4],4,9]
let target = [0,0,0,0,0]
let res = Object.assign(target,origin)
// this is not pure, res === target
res[2]=11111
clog('res:%s target:%s',res,target)
clog(res===target)
