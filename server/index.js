const express = require('express')
const Mock = require('mockjs')
const bodyParser = require('body-parser')
const { getLocalIP } = require('./utils')

const app = express()
const Random = Mock.Random
const ip = getLocalIP()
const port = 3001

// 数据源，简单模拟一个数据库
const users = [
  {userName: 'admin', password: 'admin'}
]
let total = 789
let articles = []
for (let i = 0; i < total; i++) {
  const mockArticle = Mock.mock({
    id: String(i + 1),
    title: Random.ctitle(),
    content: Random.cparagraph(1, 10),
    createTime: Random.datetime('yyyy-MM-dd hh:mm:ss'),
    author: Random.cname()
  })
  articles.push(mockArticle)
}

// post body解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 跨域配置
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});


app.post('/login', (req, res) => {
  const {userName, password} = req.body
  if (users.find(user => user.userName === userName && user.password === password)) {
    res.json({
      code: 1,
      data: {userName},
      msg: 'success'
    })
  } else {
    res.json({
      code: 0,
      data: null,
      msg: '账号密码错误'
    })
  }
})

app.get('/articles', (req, res) => {
  try {
    let { start, limit } = req.query
    start = Number(start) || 0
    limit = Number(limit) || (articles.length - 1)
    const data = articles.slice(start, start + limit)
    res.json({
      code: 1,
      data,
      total,
      msg: 'success'
    })
  } catch (e) {
    res.json({
      code: 0,
      data: null,
      msg: JSON.stringify(e)
    })
  }
})

app.get('/article', (req, res) => {
  const { id } = req.query
  const data = articles.find(article => article.id === id)
  if (data) {
    res.json({
      code: 1,
      data,
      msg: 'success'
    })
  } else {
    res.json({
      code: 0,
      data: null,
      msg: '未找到该文章'
    })
  }
})

app.post('/article', (req, res) => {
  try {
    let { id, title, content, author, createTime } = req.body
    if (!id) id = +new Date() + Math.random() + ''
    articles.unshift({id, title, content, author, createTime})
    ++total
    res.json({
      code: 1,
      data: {id, title, content, author, createTime},
      msg: 'success'
    })
  } catch (e) {
    res.json({
      code: 0,
      data: null,
      msg: JSON.stringify(e)
    })
  }
})


app.listen(port, () => {
  console.log(`blog server start on http://${ip}:${port}`)
})
