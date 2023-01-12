import { EventEmitter } from 'events'
import * as fs from 'fs'

class Watcher extends EventEmitter {
    constructor(watchDir, targetDir) {
        super()

        this.watchDir = watchDir
        this.targetDir = targetDir
    }

    /**
     * 监听 watchDir 中有文件变动时，将文件转移到 targetDir 并将文件名设为小写
     */
    watch() {
        // 遍历 watchDir 目录
        fs.readdir(this.watchDir, (err, files) => {
            if (err) {
                throw err
            }

            // 遍历数组
            for (let idx in files) {
                // 触发 process 事件
                this.emit('process', files[idx])
            }
        })
    }

    /**
     * 启动监听
     */
    start() {
        fs.watchFile(this.watchDir, () => {
            this.watch()
        })
    }
}

module.exports = Watcher