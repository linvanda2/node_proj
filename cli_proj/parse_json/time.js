#! /usr/bin/env node

/**
 * 该程序能够检测前面的进程执行了多长时间
 * 因为管道连接的程序是同时启动的进程，而前面程序退出时其 stdout 才关闭，该 stdout 的内容被重定向给该程序，
 * 该程序将接收到的数据原封不动地丢给 stdout 并退出，此时监测到的时间就是前面程序执行的时间
 */

const start = Date.now()

// 将标准输入的内容直接给到标准输出
process.stdin.pipe(process.stdout)

process.on('exit', () => {
    console.error('use time:', (Date.now() - start) / 1000)
})
