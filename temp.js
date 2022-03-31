const clog=console.log

function fact(x,res=1){
	return x==1 ? res:fact(x-1,x*res)
}
function test(input){
	console.time('test')
	clog(	fact(input))
	console.timeEnd('test')
}

test(10)
test(20)
//maybe nodejs have function cache 
