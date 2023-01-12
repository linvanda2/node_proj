import User from '../models/user.js'
import assert from 'assert'

describe('user', () => {
    describe('save', () => {
        it('should save user to db', async () => {
            const user = new User({ id: 1233, name: 'zhangsan', pass: '8dafda' })
            await user.save()
            const u = await User.getByName('zhangsan')
            assert.notEqual(u, null)
            assert.equal(u.id, 1233)
        })
    })
})
