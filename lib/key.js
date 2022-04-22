import {EventEmitter} from 'events'
const {stdin,stdout} = process
const print = (str)=>stdout.write(str+'')

const keyEvent = new EventEmitter()
keyEvent.on('up',k=>{
	print(k+' up\n')
})
keyEvent.on('pressed',k=>{
	print(k+' pressed\n')
})
// keyEvent.on('down',k=>{
// 	print(k+' down another\n')
// })
// keyEvent.removeAllListeners('down')
keyEvent.on('down',k=>{
	print(k+' down\n')
})

function INIT(){
	stdin.setRawMode(true);
	stdin.resume();
	// stdin.setEncoding('utf8'); // no need
	stdin.on('data',key=>{
		key = key.toString()[0]
		getKey(key)
		if(key =='\x03'){
			// print('\n')
			process.exit(0)
		}
	})
}
INIT()
// print(keyEvent.getMaxListeners()) max=10

let currentKey = '';
let stamp = 0;
function getKey(key){
	if (currentKey!=key){
		keyEvent.emit('down',key)
		currentKey=key;
	}
	// console.log(Date.now()*1000)
}
