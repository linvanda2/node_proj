import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import * as validator from '../middleware/validate.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', validator.require('user[name]'), validator.require('user[pass]'), async (req, res) => {
    // 获取用户信息
    const uinfo = req.body.user
    const user = await User.getByName(uinfo.name)
    
    if (Object.keys(user).length == 0) {
        return res.end(JSON.stringify({ code: 404, msg: 'user not found' }))
    }

    // 验证密码
    if (!bcrypt.compareSync(uinfo.pass, user.pass)) {
        return res.end(JSON.stringify({ code: 500, msg: 'password wrong' }))
    }

    // 验证成功，将用户信息保存到 session 中
    req.session.user = user

    res.json({ code: 200, msg: 'OK' })
})

// 退出登录
router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.json({ code: 200, msg: 'OK' })
    })
})

export default router