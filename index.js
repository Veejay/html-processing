const RewritingStream = require('parse5-html-rewriting-stream');
const fs = require('fs')

const readStream = fs.createReadStream('./sample.html', { encoding: 'utf-8' })

const rewriter = new RewritingStream();

// useful for debugging purposes, we notice that each tag is a token in the stream
rewriter.on('data', data => {
  console.log(`
    got data: ${data}
`)
})
// Replace divs with spans
rewriter.on('startTag', startTag => {
  if (startTag.tagName === 'span') {
    startTag.tagName = 'div';
  }
  rewriter.emitStartTag(startTag);
});

rewriter.on('endTag', endTag => {
  if (endTag.tagName === 'span') {
    endTag.tagName = 'div';
  }
  rewriter.emitEndTag(endTag);
});

rewriter.on('text', (_, raw) => {
  // Use raw representation of text without HTML entities decoding
  rewriter.emitRaw(`${raw}`);
});
const writeStream = fs.createWriteStream('result.html', { encoding: 'utf-8' })
// rewriter is a transform stream (BOOM)
readStream.pipe(rewriter).pipe(writeStream)