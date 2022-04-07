import {center} from './text.js'
import * as https from 'https'
import {readCache,writeCache}from './cache.js'
const opts={
	hostname:'www.dushu.com',
	path:'/meiwen/',
	method:'GET'
}
export function dailyArticle(){
	return new Promise((resolve,reject)=>{

		const {dailyArticle:dArticle={}} = readCache()
		const today = new Date().getDate()

		if (dArticle && dArticle.date&&dArticle.date==today){
			resolve(dArticle.article)
			return
		}

		const response=(rawdata)=>{
				const data = rawdata.toString()

				const start = data.lastIndexOf('<h1 style="text-align:center;');
				const end = data.lastIndexOf('<blockquote class="margin');

				const article = trimTagsToArray(data.slice(start,end))

				const newcache = {
					dailyArticle:{
						article:article,
						date:today
					}
				}

				resolve(article)
				writeCache(newcache)
		}
		get(opts,response);
	})
}
function get(options,fn=data=>data){
		const req = https.request(options,res=>{
			// console.log(`status: ${res.statuscode}`)
			let rawdata ='';

			res.on('data',d=>{
				rawdata+=d
			})

			res.on('end',()=>{
				fn(rawdata)
			})

		})

		req.on('error',e=>{
			console.error(e)
		})
		req.end()
}

// dailyArticle().then(formatArticle)

function trimTagsToArray(str){
	//String ->Array
	return str.replace(/<[^>]+>/g,'').split('\n') 
		.map(item=>item.trim()) 
		.filter(item=> item.length>0 ) 
}


// function formatArticle(article){
// 	const title =  center(article[0].green())
// 	const author = center(article[1].yellow())+'\n'
// 	const mainText = article.slice(2)
// 		.map(item=>" ".repeat(4)+item) // headTab
// 		.join('\n');	//toString
// 	console.log(title)
// 	console.log(author)
// 	console.log(mainText)
// }
