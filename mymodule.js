function calc(a, b, type) {
    switch (type) {
        case '+':
            return a + b
        case '-':
            return a - b
        case '*':
            return a * b
        case '/':
            return a / b
    }
}

exports.add = (a, b) => calc(a, b, '+')
exports.sub = (a, b) => calc(a, b, '-')
exports.mul = (a, b) => calc(a, b, '*')
exports.div = (a, b) => calc(a, b, '/')
exports.obj = {name:'zhangsan'}