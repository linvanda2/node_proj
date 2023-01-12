// 流
const fs = require('fs')
const zlib = require('zlib')

const readSt = fs.createReadStream('in.txt')
const gzipSt = zlib.createGzip()
const writeStr = fs.createWriteStream('out.txt')

readSt.pipe(gzipSt).pipe(writeStr)