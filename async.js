const async = require('async')

async.series([
    cb => {
        setTimeout(() => {
            console.log('t1')
            cb()
        }, 1000);
    },
    cb => {
        setTimeout(() => {
            console.log('t2')
            cb()
        }, 1000);
    }
])
