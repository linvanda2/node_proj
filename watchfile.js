const Watcher = require('./watcher')
const fs = require('fs')

const w = new Watcher('./src/', './dst/')
w.on('process', file => {
    // 转移到 dst 目录
    fs.rename(`${w.watchDir}/${file}`, `${w.targetDir}/${file.toLowerCase()}`, err => {
        if (err) {
            throw err
        }

        console.log('rename complate')
    })
})

w.start()