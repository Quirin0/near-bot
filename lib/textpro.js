/*
   TextPro Scrap By NaufalCream
*/
const fetch = require("node-fetch")
const cheerio = require("cheerio")
const cookie = require('cookie')
const FormData = require("form-data")
const form = new FormData()

async function post(url, formdata = {}, cookies) {
	let encode = encodeURIComponent
	let body = Object.keys(formdata).map(key => {
		let vals = formdata[key]
		let isArray = Array.isArray(vals)
		let keys = encode(key + (isArray ? '[]' : ''))
		if (!isArray) vals = [vals]
		let out = []
		for (let valq of vals) out.push(keys+ '=' + encode(valq))
		return out.join('&')
	}).join('&')
	return await fetch(`${url}?${body}`, {
		method: 'GET',
		headers: {
			"Accept": "*/*",
			"Accept-Language": "en-US,en;q=0.9",
			"User-Agent": "GoogleBot",
			"Cookie": cookies
		}
	})
}

async function textpro(url, text){
      console.log('Scraping textpro.me')
	if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url)) throw new Error('Link errado!!')
	const geturl = await fetch(url, {
		method: 'GET',
		headers: {
			"User-Agent": "GoogleBot"
		}
	})
	const caritoken = await geturl.text()
	let hasilcookie = geturl.headers.get('set-cookie').split(',').map(v => cookie.parse(v)).reduce((a, c) => { return {...a, ...c} }, {})
	hasilcookie = {
		__cfduid: hasilcookie.__cfduid,
		PHPSESSID: hasilcookie.PHPSESSID
	}
	hasilcookie = Object.entries(hasilcookie).map(([ name, value ]) => cookie.serialize(name, value)).join('; ')
	const $ = cheerio.load(caritoken)
	const token = $('input[name="token"]').attr("value")
	if (typeof text === 'string') text = [text]
	for (let texts of text) form.append('text[]', texts)
	form.append('submit', 'Go')
	form.append('token', token)
	form.append('build_server', 'https://textpro.me')
	form.append('build_server_id', 1)
	const geturl2 = await fetch(url, {
		method: 'POST',
		headers: {
			"Accept": "*/*",
			"Accept-Language": "en-US,en;q=0.9",
			"User-Agent": "GoogleBot",
			"Cookie": hasilcookie,
			...form.getHeaders()
		},
		body: getBuffer()
	})
	const caritoken2 = await geturl2.text()
	const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(caritoken2)
	if (!token2) throw new Error('Token Tidak Ditemukan!!')
	const prosesimage = await post('https://textpro.me/effect/create-image', JSON.parse(token2[1]), hasilcookie)
	const hasil = await prosesimage.json()
	console.log('Success Scraping textpro.me')
	linkimg = `https://textpro.me${hasil.fullsize_image}`
        data = await fetch('https://api.imgbb.com/1/upload?key=2685f71965fa6c56702e9e70644ff0ad&image='+linkimg).then(v => v.json())
        return data.data.url
}

module.exports = textpro
