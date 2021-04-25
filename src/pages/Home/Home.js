import React, { useState, useEffect } from 'react'
import { Route, Switch ,useHistory, useRouteMatch } from 'react-router-dom'
import Articles from '../../components/Articles/Articles'
import Paginations from '../../components/Paginations/Paginations'
import Article from '../../pages/Article/Article'
import './Home.css'
import http from '../../config/http'

const Home = () => {
  const history = useHistory()
  const {path} = useRouteMatch()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [size] = useState(5)
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    getArticles()
  }, [page])

  const getArticles = async () => {
    setLoading(true)
    const start = (page - 1) * size
    const res = await http.get(`/articles?start=${start}&limit=${size}`)
    if (!res?.data) return []
    const { data, total } = res.data
    setArticles(data)
    setPageCount(Math.ceil(total / size))
    setLoading(false)
  }

  const gotoPage = targetPage => {
    if (typeof targetPage !== 'number') return
    if (targetPage < 1) return
    if (targetPage > pageCount) return
    setPage(targetPage)
  }

  const handleClickArticle = article => {
    history.push(`/article/${article.id}`)
  }

  return (
    <div className="container">
      <div className="title">我的文章</div>
      <Switch>
        <Route path={path} exact>
          <Articles articles={articles} loading={loading} onClick={handleClickArticle}></Articles>
          <Paginations page={page} pageCount={pageCount} hidden={loading} goto={gotoPage}></Paginations>
        </Route>
        <Route path={`${path}/article/:id`}>
          <Article></Article>
        </Route>
      </Switch>
    </div>
  )
}

export default Home