const fs = require('fs')
const zlib = require('zlib')
// dummy data to write, simulate lawyer URLs
const buildUrls = () => {
  let urls = []
  for (let i = 0; i < 20000; i++) {
    const random = require('crypto').randomBytes(64).toString('hex');
    urls.push(`http://www.google.com/${random}`)
  }
  return urls
}

// not much more complicated than using ejs and probably way more
// memory-efficient
const writeStream = fs.createWriteStream('sitemap.xml.gz')
const zlibTransformStream = zlib.createGzip()
zlibTransformStream.pipe(writeStream).on('finish', () => {
  console.log('done')
})
zlibTransformStream.write(`
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`)
const urls = buildUrls()
for (let url of urls) {
  zlibTransformStream.write(` <url>
      <loc>${url}</loc>
      <lastmod>2019-07-01</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
  `)
}
zlibTransformStream.end('</urlset>')