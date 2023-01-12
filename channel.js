/**
 * 简单的聊天室实现
 */
import * as events from 'events'
import * as net from 'net'

// 注册全局的异常捕获
process.on('uncaughtException', err => { 
    console.log("================")
    console.error(err.stack); 
    process.exit(1); 
});

// 创建事件发射器
const channel = new events.EventEmitter()

channel.clients = new Map()

// 注册 join 事件：客户端加入到 channel 中
channel.on('join', (clientId, cliSocket) => {
    if (channel.clients.has(clientId)) {
        return
    }

    // 加入
    channel.clients.set(clientId, cliSocket)

    // 发广播消息
    channel.clients.forEach((sock, cliId) => {
        if (cliId === clientId) {
            // 发送欢迎语
            sock.write(`尊敬的${clientId}欢迎你加入群聊`)
            // 测试：抛出异常
            channel.emit('error', new Error("something wrong!"))
        } else {
            sock.write(`${clientId}加入了群聊`)
        }
    })
})

channel.on('error', err => {
    console.log('--------')
    console.error(err.message)
    console.log('--------')
})

// 客户端退出
channel.on('cancel', clientId => {
    if (!channel.clients.has(clientId)) {
        return
    }

    channel.clients.delete(clientId)
})

// 接收到消息
channel.on('data', (clientId, data) => {
    // 给所有人发消息
    channel.clients.forEach((sock, cliId) => {
        if (cliId === clientId) {
            return
        }

        sock.write(`${cliId}:${data.toString()}`)
    })
})

// 创建聊天服务器
const svr = net.createServer(cliSock => {
    const clientId = `${cliSock.remoteAddress}-${cliSock.remotePort}`
    console.log('client connect:' + clientId)

    // 注册
    channel.emit('join', clientId, cliSock)

    // 客户端连接关闭时取消
    cliSock.on('close', () => {
        channel.emit('cancel', clientId)
    })

    // 接收数据
    cliSock.on('data', (data) => {
        channel.emit('data', clientId, data)
    })

    // error
    cliSock.on('error', error => {
        console.log("got an error:" + error.message)
    })
})

svr.listen(8888)