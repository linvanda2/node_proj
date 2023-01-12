const connect = require('connect')

// 中间件：打印日志
// 通过返回一个中间件格式函数，实现可配置中间件
function loggerSetup(format) {
    const regexp = /:[\w]+/g

    return function logger(req, res, next) {
        // 根据 format 格式打印日志
        console.log(
            format.replace(regexp, (match) => {
                return req[match.substr(1)]
            })
        )
        next()
    }
}

// 错误处理中间件
// 比普通中间件多了个 err 参数
function errorHandler(err, req, res, next) {
    // 将错误以 json 格式返回
    console.error(err)
    res.end(JSON.stringify({code:500, msg: err.message}))
}

// 中间件：响应
function hello(req, res) {
    if (req.url == '/error') {
        throw new Error('some error')
    }

    res.end('hello word')
}

// 使用中间件
connect().use(loggerSetup(':method :url')).use(hello).use(errorHandler).listen(9999)
