import db from './redis.js'
import bcrypt from 'bcrypt'

class User {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key]
        }
    }

    async save() {
        if (this.id) {
            // 走更新
            return this.update()
        }

        // 新建
        // 获取 id
        const id = await db.incr('node:user:id')
        this.id = id

        // 密码处理
        this.hashPassword()

        return this.update()
    }

    async update() {
        // 记录 name 到 id 的关系
        await db.set(`node:user:id:${this.name}`, this.id)

        return await db.hSet(`node:user:${this.id}`, this)
    }

    static async getByName(name) {
        const id = await db.get(`node:user:id:${name}`)
        const obj = await db.hGetAll(`node:user:${id}`)

        if (!obj || Object.keys(obj).length == 0) {
            return null
        }

        return new User(obj)
    }

    // 对密码执行 hash 加密
    hashPassword() {
        const salt = bcrypt.genSaltSync()
        this.salt = salt
        this.pass = bcrypt.hashSync(this.pass, salt)
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }
}

export default User