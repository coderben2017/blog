import React from 'react'
import './Articles.css'

const Articles = ({ articles, loading, onClick }) => {
  if (loading) {
    return (
      <div className="loading">
        加载中，请稍候...
      </div>
    )
  }
  return (
    <div className="articles">
      {
        articles.map(article => (
          <div key={article.id} className="article" onClick={() => onClick(article)}>
            <h3 className="article-header">{article.title}</h3>
            <div className="article-content">{article.content}</div>
            <div className="article-footer">
              <span>{article.author}</span>
              <span>{article.createTime}</span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Articles