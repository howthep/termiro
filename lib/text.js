String.prototype.trimAnsi=function(){
	let str = this
	return str.slice(str.indexOf('m')+1,str.lastIndexOf('\x1b[0m'))
}


String.prototype.underline=function(){
	let str =this
	return	str.ansi(4)
}

String.prototype.invert=function(){
	let str =this
	return	str.ansi(7)
}
String.prototype.ansi=function(code){
	// \x1b[a;b;cmCONTENT\x1b[0m
	// 1. there is no ansicode
	// 2. there is ansicode with one property
	// 3. there is ansicode with many property
	let str =this
	// plain text
	if (!str.includes('\x1b[0m')) return `\x1b[${code}m${str}\x1b[0m`
	else if(str.indexOf('\x1b[')==0&& str.lastIndexOf('\x1b[0m')+3 == str.length-1){
		//str with single color
		return str.insert(';'+code,str.indexOf('m'))
	}
	else {
		// white green white red white
		str = str.replace(/\x1b\[0m/g,`\x1b[${code}m`)
		// return `\x1b[${code}m${str}\x1b[0m`
		return str.ansi(code)
	}
}
String.prototype.green=function(){
	let str =this
	return str.ansi(32)
}
String.prototype.magenta=function(){
	let str =this
	return str.ansi(35)
}
String.prototype.blue=function(){
	let str =this
	return str.ansi(34)
}
String.prototype.yellow=function(){
	let str =this
	return str.ansi(33)
}
String.prototype.cyan=function(){
	let str =this
	return str.ansi(36)
}
String.prototype.grey=function(){
	let str =this
	return str.ansi(90)
}
String.prototype.red=function(){
	let str =this
	return str.ansi(31)
}
String.prototype.insert=function(str,position){
	let origin = this;
	if(origin.length>position){
		return origin.slice(0,position)+str+origin.slice(position)
	}
}

export function center(text){
	let width = process.stdout.getWindowSize()[0]
	let len = text.trimAnsi().length
	let str = ' '.repeat(Math.round((width-len)/2))+text
	return str
}

export function right(text){
	let width = process.stdout.getWindowSize()[0]
	// let len = text.trim().trimAnsi().length
	let len = text.trimAnsi().length
	let str = ' '.repeat(Math.round(width-len))+text
	return str
}

// console.log(`${'let'.cyan()} foo ${'='.red()} bar`.green())
// console.log('red and green'.invert().red().green().underline())
// console.log('green and red'.green().red().underline())
// console.log('\x1B[31m这是红色\x1B[0m'.ansi(97).ansi(42))
// console.log('\x1B[4;31m这是红色\x1B[0m')
// console.log("012345".insert("rose",3))
// console.log(trimAnsi('\x1B[31m这是红色\x1B[0m'))
