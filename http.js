const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("hello app")
})

app.get('/user', (req, res) => {
    res.send('user info')
})

app.listen(8080, () => {
    console.log('listen ok')
})