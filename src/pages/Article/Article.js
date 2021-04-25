import React, {useState, useEffect} from "react"
import {useParams} from 'react-router-dom'
import './Article.css'
import http from '../../config/http'

const Article = () => {
  const {id} = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    getArticle()
  }, [])


  const getArticle = async () => {
    const res = await http.get(`/article?id=${id}`)
    if (!res.data?.data) return
    setArticle(res.data.data)
  }

  return (
    <div className="article-page">
      <h3 className="article-page-header">{article.title}</h3>
      <div className="article-page-content">
        {article.content}
      </div>
      <div className="article-page-footer">
        <span>{article.author}</span>
        <span>{article.createTime}</span>
      </div>
    </div>
  )
}

export default Article