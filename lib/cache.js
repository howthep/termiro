import * as fs from 'fs'
// import * as path from 'path'
import * as os from 'os'

const mydir = os.tmpdir()+'/roseupam'
const cachePath = mydir+'/cache.txt'

let cache = {}

if (!fs.existsSync(mydir)){
	console.log('new dir');
	fs.mkdirSync(mydir);
}
else{
	const jsonCache= fs.readFileSync(cachePath).toString();
	cache = jsonCache?JSON.parse(jsonCache):{}
}

export function writeCache(obj){
	// Object
	cache = Object.assign(cache,obj)
	fs.writeFile(mydir+'/cache.txt',JSON.stringify(cache),err=>{
		if (err) console.log(err)
	})
}
export function readCache(){
	//Object
	return  cache;
}
function clearCache(){
	fs.writeFile(mydir+'/cache.txt',JSON.stringify({}),err=>{
		if (err) console.log(err)
	})
}
// writeCache(JSON.stringify({}))
// console.log(cache);
