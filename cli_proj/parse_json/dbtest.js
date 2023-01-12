import db from './db.js'

// 插入一条记录
function insert(id) {
    db.run("insert into articles(id,title,context) values($id,$title,$context)", { $id:id, $title: '测试'+id, $context: '内容' }, (err, rst) => {
        if (err) {
            return console.error("insert fail:" + err.message)
        }
    
        console.log("insert suc")
    })
}

function get(id) {
    db.get("select * from articles where id=$id", { $id: id }, (err, rst) => {
        if (err) {
            return console.error("get fail:" + err.message)
        }

        console.log(rst)
    })
}

function getAll() {
    db.all("select * from articles", (err, rst) => {
        if (err) {
            return console.error("get fail:" + err.message)
        }

        console.log(rst)
    })
}

getAll()