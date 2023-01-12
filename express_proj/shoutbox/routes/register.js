import express from 'express'
import User from '../models/user.js'
import * as validator from '../middleware/validate.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.render('register', { title: '用户注册' })
})

router.post('/', validator.require('user[name]'), validator.require('user[pass]'), (req, res) => {
    const user = new User(req.body.user)
    user.save().then(() => {
        res.end(JSON.stringify({ code: 200, msg: 'OK' }))
    }).catch((err) => {
        console.log(err)
        res.redirect('back')
    })
})

export default router