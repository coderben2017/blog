import React from 'react'
import './Paginations.css'

const Paginations = ({ page, pageCount, hidden, goto }) => {
  if (hidden) return null

  let pageIndexs = []
  for (let i = 0; i < pageCount; i++) {
    pageIndexs.push(i + 1)
  }

  if (pageCount > 10) {
    if (page <= 5) {
      pageIndexs = [...pageIndexs.slice(0, 5), '...', ...pageIndexs.slice(-1)]
    } else if (page >= pageCount - 4) {
      pageIndexs = [...pageIndexs.slice(0, 1), '...', ...pageIndexs.slice(-5)]
    } else {
      pageIndexs = [...pageIndexs.slice(0, 1), '...', ...pageIndexs.slice(page - 2, page + 1), '...', ...pageIndexs.slice(-1)]
    }
  }

  return (
    <ul className="pages">
      <li className="page" onClick={() => goto(page - 1)}>&lt;</li>
      {
        pageIndexs.map((pageIndex, index) => (
          <li
            key={index}
            className={
              pageIndex === '...'
                ? ''
                : pageIndex === page
                  ? 'page-active'
                  : 'page'
            }
            onClick={() => goto(pageIndex)}
          >
            {pageIndex}
          </li>
        ))
      }
      <li className="page" onClick={() => goto(page + 1)}>&gt;</li>
    </ul>
  )
}

export default Paginations