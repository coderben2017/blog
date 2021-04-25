import React from 'react'
import {useHistory} from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  const history = useHistory()

  const gotoLastPage = () => {
    history.go(-1)
  }

  return (
    <div className="container-404">
      <span>404 Not Found</span>
      <button className="btn-large" type="button" onClick={gotoLastPage}>返回上一页</button>
    </div>
  )
}

export default NotFound