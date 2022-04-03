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

async function compute(){
	clog(await getSomething())
	// let x = await getSomething()
	// clog('x: '+x)
}
// so when you want to match '\', '\\' can
const str = 'ac \\asd';
const regexp = /^ab+.*d$/;
console.log(str.match(regexp))
// compute()
