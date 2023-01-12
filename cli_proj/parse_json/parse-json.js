#! /usr/bin/env node

import yargs from 'yargs'
import miss from 'mississippi'
import { readFile } from 'fs'

const argv = yargs(process.argv)
            .usage('parse-json [options]')
            .alias('h', 'help')
            .help('h')
            .alias('f', 'filename')
            .describe('f', '指定从哪个文件读取原始 json 字符串数据。- 表示从标准输入读取数据')
            .default('f', '-')
            .nargs('f', 1)
            .argv

// 打印出来
function printJSON(str) {
    const val = JSON.parse(str)
    if (!val) {
        return console.error('json parse fail')
    }

    console.log(val)
}

// 从文件或者标准输入中读取数据
function parse() {
    if (argv.f == '-') {
        // 从标准输入读取，用 mississippi 的 concat 函数创建一个合并流数据的 WriteStream
        miss.pipe(process.stdin, miss.concat(printJSON), (err) => {
            if (err) {
                return console.error('parse json from stdin fail:' + err.message)
            }
        })
    } else {
        // 从普通文件读取
        readFile(argv.f, (err, buffer) => {
            if (err) {
                return console.error('read file fail:' + err.message)
            }

            printJSON(buffer)
        })
    }
}

parse()