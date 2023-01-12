import db from './redis.js'

class Entry {
    constructor(obj) {
        // 赋值
        for (let key in obj) {
            this[key] = obj[key]
        }
    }

    save() {
        // 保存到 redis 列表中
        return db.lPush('node_entries', JSON.stringify(this))
    }

    static getRange(from, to) {
        // 从 redis 中取范围值
        return db.lRange('node_entries', from, to).then((items) => {
            let entries = []
            items.forEach(item => {
                entries.push(JSON.parse(item))
            })

            return entries
        })
    }
}

export default Entry