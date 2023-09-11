import React from 'react'
import './pagination.css';
function Pagination({ pages, currentPage, setCurrentPage }) {
  const generetePage = [];
  for (let i = 1; i <= pages; i++) {
    generetePage.push(i)
  }
  console.log(pages)
  return (
    <div className='pagination'>
      <button
        className='page previous'
        onClick={() => setCurrentPage(prev => prev - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {generetePage.map(page => (
        <div
          onClick={() => setCurrentPage(page)}
          key={page}
          className={currentPage === page ? "page active" : "page"}>
          {page}
        </div>
      ))}
      <button
        className='page next'
        onClick={() => setCurrentPage(prev => prev + 1)}
        disabled={currentPage === pages}
      >
        next
      </button>

    </div>
  )
}

export default Pagination
