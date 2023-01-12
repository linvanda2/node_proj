// 使用 ES module 模式加载模块，需要在 package.json 中加 type:"module"
import express from 'express'
import bodyParser from 'body-parser'
import { Article } from './models/db.js'

const app = express()

app.set('port', process.env.PORT || 8888)

/**
 * 设置请求体解析器
 */
// json 请求体
app.use(bodyParser.json())
// 表单请求体
app.use(bodyParser.urlencoded({ extended: true }))
// 加载 bootstrap 静态文件
app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));

app.get('/', (req, res) => {
    res.send("hello node")
})

app.get('/articles', (req, res) => {
    Article.all((err, result) => {
        if (err) {
            throw err
        }

        res.format({
            html: () => {
                res.render('articles.ejs', { articles: result })
            },
            json: () => {
                res.send(result)
            }
        })
    })
})

app.get('/articles/:id', (req, res) => {
    Article.one(req.params.id, (err, result) => {
        if (err) {
            throw err
        }

        res.send(result)
    })
})

app.post('/articles', (req, res) => {
    const article = { title: req.body.title }
    Article.add(article, (err, result) => {
        if (err) {
            throw err
        }

        if (!result.affectedRows) {
            throw new Error("插入失败")
        }

        res.send(article)
    })
})

app.delete('/articles/:id', (req, res) => {
    Article.delete(req.params.id, (err) => {
        if (err) {
            throw err
        }

        res.send('OK')
    })
})

app.listen(app.get('port'), () => {
    console.log(`listen on ${app.get('port')}`)
})
