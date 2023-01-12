import db from './db.js'

class Entry {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key]
        }
    }

    static async getEntry(id) {
        const entries = await db('entries').select(['title', 'body']).where({ id }).first()
        if (!entries) {
            return null
        }
        
        return new Entry({ title: entries.title, body: entries.body })
    }
}

export default Entry