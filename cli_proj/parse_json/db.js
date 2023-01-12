import sqlite from 'sqlite3'

const s = sqlite.verbose()
const db = new s.Database('test.sqlite')

db.serialize(() => {
    db.run("create table if not exists articles(id interger primary key,title,context text)")
})

export default db