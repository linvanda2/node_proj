import knex from "knex"

export default knex({
    client: 'mysql',
    connection: {
        host: 'db.main.wcc.cn',
        port: 3306,
        user: 'weicheche',
        password: 'weicheche123',
        database: 'test'
    }
})