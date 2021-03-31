import React, { useState, useEffect } from 'react'
import Articles from './components/Articles/Articles'
import Paginations from './components/Paginations/Paginations'
import './App.css'
import axios from 'axios'

function App () {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    getArticles()
  }, [page])

  const getArticles = async () => {
    setLoading(true)
    const start = (page - 1) * size
    const res = await axios.get(`http://localhost:3001/articles?start=${start}&limit=${size}`)
    if (!res?.data) return []
    const {data, total} = res.data
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

  return (
    <div className="container">
      <div className="title">我的文章</div>
      <Articles articles={articles} loading={loading}></Articles>
      <Paginations page={page} pageCount={pageCount} hidden={loading} goto={gotoPage}></Paginations>
    </div>
  )
}

export default App
