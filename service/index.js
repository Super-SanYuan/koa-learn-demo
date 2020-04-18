/**
 * 通过header里面传递一个role属性admin，使用post请求，发送给koa这边的/api/user接口json数据为{name: "imooc", email: "imooc@test.com"}。
 * 1. koa侧判断role属性是否存在，是否是admin，不是，则返回status 401
   2. 判断email与name属性是否存在，并且不为空字符串
   3. 返回用户上传的数据，封装到data对象中，给一个code： 200，message： '上传成功'
 * 需要中间件: koa-router koa-body @koa/cors
 * /api/user
 */

// 引入相关依赖
const Koa = require('koa')
const Router = require('@koa/router')
const Body = require('koa-body')
const cors = require('@koa/cors')


// 构造服务
const app = new Koa()
// 添加路由配置
const router = new Router({ prefix: '/api' })

router.post('/usr', (ctx) => {
  const reqBody = ctx.request.body
  const reqHeader = ctx.request.header
  const body = {
    code: 200,
    message: '上传成功'
  }
  if(!reqHeader.role || reqHeader.role !== 'admin') {
    body.code = 401
    body.message = 'Unauthorized post'
  } else if(!reqBody.email && reqBody.email === '' && !reqBody.name && reqBody.name === '' ) {
    body.code = 404
    body.message = 'name与email不能为空'
  } else {
    body.data = {...reqBody}
  }
  ctx.body = body
})

app.use(Body())
// app.use(cors())
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000)