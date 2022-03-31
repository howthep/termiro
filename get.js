// const https = require('https')
import * as https from 'https'
const options={
	hostname:'www.dushu.com',
	path:'/meiwen/',
	method:'GET'
}
const req = https.request(options,res=>{
	console.log(`status: ${res.statusCode}`)

	res.on('data',d=>{
		// let context = d.toString().slice(d.indexOf('class="text"'),d.indexOf('margin-large'))
		const  data = d.toString()
		// process.stdout.write(context)
		// console.log("%o",context.slice(context.lastIndexOf("container")))
		const article = data.slice(data.lastIndexOf("margin:0;padding:0;")+21,data.lastIndexOf('<blockquote class="margin-large bg-mix">')).replace(/<\/*p>/g,'');
		const title =  article.slice(0,3)
		let mainText = article.slice(article.indexOf('32px;')+7,article.lastIndexOf('</div')).trim().split('\n')
		mainText = mainText.filter((item)=> item.length>0 )
		console.log(title)
		console.log(mainText.join('\n'))
	})
})

req.on('error',e=>{
	console.error(e)
})
req.end()
