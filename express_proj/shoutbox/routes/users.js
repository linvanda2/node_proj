import express from 'express'
const router = express.Router();

router.get('/', function(req, res, next) {
  // 返回当前登录的用户
  res.json(req.session.user || {})
});

export default router
