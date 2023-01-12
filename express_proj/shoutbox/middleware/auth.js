/**
 * 登录认证中间件，检查用户是否登录
 */
export default () => {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.json({ code: 500, msg: 'not login' })
        }

        // 设置到请求本地变量
        res.locals.user = req.session.user
        next()
    }
}