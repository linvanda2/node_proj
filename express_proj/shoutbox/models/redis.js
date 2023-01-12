import redis from 'redis'
const db = redis.createClient({ url: 'redis://db.redis.wcc.cn:6379', password: 'XEXeh1l6nT3wHL0z' })

db.on('error', (err) => console.log('Redis Client Error', err))

await db.connect()

export default db