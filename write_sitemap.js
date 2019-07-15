const fs = require('fs')
const buildUrls = () => {
  let urls = []
  for (let i = 0; i < 10000; i++) {
    const random = require('crypto').randomBytes(64).toString('hex');
    urls.push(`http://www.google.com/${random}`)
  }
  return urls
}

const writeStream = fs.createWriteStream('sitemap.xml')
writeStream.write(`
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`)
const urls = buildUrls()
for (let url of urls) {
  writeStream.write(` <url>
      <loc>${url}</loc>
      <lastmod>2019-07-01</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
  `)
}
writeStream.end('</urlset>')