const express = require('express')
const Mock = require('mockjs')

const app = express()
const Random = Mock.Random

const port = 3001

const total = 789
const articles = []
for (let i = 0; i < total; i++) {
  const mockArticle = Mock.mock({
    id: i + 1,
    title: Random.ctitle(),
    content: Random.cparagraph(1, 10),
    createTime: Random.datetime('yyyy-MM-dd hh:mm:ss'),
    author: Random.cname()
  })
  articles.push(mockArticle)
}

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/articles', (req, res) => {
  let {start, limit} = req.query
  start = Number(start)
  limit = Number(limit)
  const data = articles.slice(start, start + limit)
  res.json({
    data,
    total
  })
})

app.listen(port, () => {
  console.log(`blog server start on https://localhost:${port}`)
})