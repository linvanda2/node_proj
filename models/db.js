import * as mysql from 'mysql'

// 创建连接池
const pool = mysql.createPool({
    connectionLimit: 100,
    queueLimit: 100,
    host: 'db.main.wcc.cn',
    user: 'weicheche',
    password: 'weicheche123',
    database: 'test'
})

class Article {
    static all(cb) {
        pool.query('select id,title from articles', cb)
    }

    static one(id, cb) {
        pool.query('select id,title from articles where id=?', id, cb)
    }

    static add(article, cb) {
        pool.query('insert into articles set ?', article, cb)
    }

    static update(article, cb) {
        pool.query('update articles set ? where id=?', [{ title: article.title }, article.id], cb)
    }

    static delete(id, cb) {
        pool.query('delete from articles where id=?', id, cb)
    }
}

export { Article }