import express from 'express'
import Entry from '../models/entry.js'
import * as validator from '../middleware/validate.js'

const router = express.Router()

router.get('/', (req, res) => {
    // 渲染表单
    res.render('post', { title: 'Post' })
})

// 使用多个校验中间件
router.post('/', validator.require('entry[title]'), validator.lengthAbove('entry[body]', 6), (req, res) => {
    // 提交数据
    const ent = new Entry(req.body.entry)
    ent.save()
    .then(() => {
        res.json({ code: 200, msg: 'OK' })
    })
    .catch(err => {
        res.json({ code: 500, msg: err.message })
    })
})

router.get('/list', async (req, res) => {
    const entries = await Entry.getRange(0, 20)
    res.render('list', { entries: entries })
})

export default router