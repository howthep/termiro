import {clamp,width as WIDTH} from './manage.js'
const clog = console.log
String.prototype.trimAnsi=function(){
	let str = this
	return str.replace(/\x1b\[[0-9;]*m/g,'')
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
String.prototype.insert=function(str,position){
	let origin = this;
	if(origin.length>position){
		return origin.slice(0,position)+str+origin.slice(position)
	}
}
String.prototype.splitByWidth=function(width){
	let str = this;
	const len = visualLength(str.trimAnsi())
	if(len<=width) return str
	let res = [],tempStr='';
	for (let chr of str){
		tempStr+=chr;
		let vlen = visualLength(tempStr)
		if (vlen==width){
			res.push(tempStr)
			tempStr=''
		}
		else if(vlen>width){
			res.push(tempStr.slice(0,tempStr.length-1))
			tempStr=chr;
		}
	}
	tempStr.length>=1?res.push(tempStr):1+1
	return res;
}

// const str = 'aa\taaa'
// console.log(str,visualLength(str))
export function visualLength(str){
	let chars = Array.from(str);
	let len = chars.reduce((res,value)=>{
		let code = value.codePointAt()
		if (code==9)return res+4;
		return code<255?res+1:res+2
	},0)
	return len
}
export function center(text){
	let width = process.stdout.getWindowSize()[0]
	let len = visualLength(text.trimAnsi())
	// chinese charecter occupy 2 units
	let str = ' '.repeat(Math.round((width-len)/2))+text
	return str
}
export function align(left='no content for align',center='',right=''){
	let width = WIDTH()
	let spaceLC = Math.round(width/2-visualLength(center)/2
		-visualLength(left))
		spaceLC=clamp(spaceLC,0,WIDTH())
	let left_center = left
		+' '.repeat(spaceLC)
		+center
	let spaceCR = Math.round(width-visualLength(left_center)
		-visualLength(right))
		spaceCR=clamp(spaceCR,0,WIDTH())
	let res = left_center+' '.repeat(spaceCR)+right
	return res
}



// console.log(`大学毕业之后干什么: ${visualLength('大学毕业之后干什么')}`)
// console.log(center('大学毕业之后干什么'.green()))
// console.log(`${'let'.cyan()} foo ${'='.red()} bar`.green())
// console.log('red and green'.invert().red().green().underline())
// console.log('green and red'.green().red().underline())
// console.log('\x1B[31m这是红色\x1B[0m'.ansi(97).ansi(42))
// console.log('\x1B[4;31m这是红色\x1B[0m')
// console.log("012345".insert("rose",3))
// console.log(trimAnsi('\x1B[31m这是红色\x1B[0m'))
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
String.prototype.underline=function(){
	let str =this
	return	str.ansi(4)
}

String.prototype.invert=function(){
	let str =this
	return	str.ansi(7)
}
// clog(align('left','center','right'))
