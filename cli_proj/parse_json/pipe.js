import fs from 'fs'
import miss from 'mississippi'

const readStream = fs.createReadStream('./test.txt')
const writeStream = fs.createWriteStream('./test_out.txt')

miss.pipe(readStream, writeStream, (err) => {
    if (err) {
        return console.error('copy error')
    }

    console.log('copy suc')
})
