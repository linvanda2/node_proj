import * as net from 'net'

const svr = net.createServer(socket => {
    socket.on('data', data => {
        socket.write(data)
    })
})

svr.listen(8888)