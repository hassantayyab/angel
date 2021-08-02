import { ImgPaginationArrow } from '../../images'
import React, { useEffect, useState } from 'react'

const Pagination = ({
  currentPage = 1,
  totalData,
  perPageData,
  pageChange,
}) => {
  const data = Array(totalData).fill('')

  const [pageNumber, setPageNumber] = useState(currentPage)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const pages = Math.ceil(data.length / perPageData)
    setTotalPages(pages)
    return () => {
      setTotalPages(1)
    }
  }, [data.length, perPageData])

  const handlePageChange = (page) => {
    setPageNumber(page)
    pageChange(page - 1)
  }

  return (
    <div id='pagination' className='flex items-center justify-center'>
      <button
        type='button'
        className='py-2 mr-4 transform rotate-180'
        disabled={pageNumber === 1}
        onClick={() => handlePageChange(pageNumber - 1)}
      >
        <img src={ImgPaginationArrow} alt='arrow' className='w-12' />
      </button>
      {Array(totalPages)
        .fill('')
        .map((_, i) => (
          <div key={i} className={`flex items-center justify-center text-grey`}>
            {/* First Buttons */}
            {pageNumber >= 4 && i === 0 && totalPages > 5 && (
              <button
                type='button'
                className={`rounded-full w-10 h-10 mr-4 ${
                  currentPage === i + 1
                    ? 'border-none bg-blue text-white'
                    : 'text-grey border border-grey'
                }`}
                onClick={() => handlePageChange(i + 1)}
                onKeyPress={() => handlePageChange(i + 1)}
              >
                <span>{i + 1}</span>
              </button>
            )}
            {pageNumber < 4 && i < 4 && totalPages > 5 && (
              <button
                type='button'
                className={`rounded-full w-10 h-10 mr-4 ${
                  currentPage === i + 1
                    ? 'border-none bg-blue text-white'
                    : 'text-grey border border-grey'
                }`}
                onClick={() => handlePageChange(i + 1)}
                onKeyPress={() => handlePageChange(i + 1)}
              >
                <span>{i + 1}</span>
              </button>
            )}

            {/* Ellipses */}
            {i === 0 && pageNumber > 3 && totalPages > 5 && (
              <div className='mr-2 md:mr-4'>....</div>
            )}

            {/* Middle Buttons */}
            {pageNumber >= 4 &&
              pageNumber < totalPages - 2 &&
              i >= 2 &&
              i > pageNumber - 3 &&
              i < pageNumber + 1 &&
              i < totalPages - 1 &&
              totalPages > 5 && (
                <button
                  type='button'
                  className={`rounded-full w-10 h-10 mr-4 ${
                    currentPage === i + 1
                      ? 'border-none bg-blue text-white'
                      : 'text-grey border border-grey'
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                  onKeyPress={() => handlePageChange(i + 1)}
                >
                  <span>{i + 1}</span>
                </button>
              )}

            {/* Middle Buttons When Few */}
            {totalPages <= 5 && (
              <button
                type='button'
                className={`rounded-full w-10 h-10 mr-4 ${
                  currentPage === i + 1
                    ? 'border-none bg-blue text-white'
                    : 'text-grey border border-grey'
                }`}
                onClick={() => handlePageChange(i + 1)}
                onKeyPress={() => handlePageChange(i + 1)}
              >
                <span>{i + 1}</span>
              </button>
            )}

            {/* Ellipses */}
            {i === totalPages - 1 &&
              pageNumber < totalPages - 2 &&
              totalPages > 5 && <div className='mr-2 md:mr-4'>....</div>}

            {/* Last Buttons */}
            {pageNumber >= totalPages - 2 &&
              i >= totalPages - 4 &&
              totalPages > 5 && (
                <button
                  type='button'
                  className={`rounded-full w-10 h-10 mr-4 ${
                    currentPage === i + 1
                      ? 'border-none bg-blue text-white'
                      : 'text-grey border border-grey'
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                  onKeyPress={() => handlePageChange(i + 1)}
                >
                  <span>{i + 1}</span>
                </button>
              )}
            {pageNumber < totalPages - 2 &&
              i === totalPages - 1 &&
              totalPages > 5 && (
                <button
                  type='button'
                  className={`rounded-full w-10 h-10 mr-4 ${
                    currentPage === i + 1
                      ? 'border-none bg-blue text-white'
                      : 'text-grey border border-grey'
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                  onKeyPress={() => handlePageChange(i + 1)}
                >
                  <span>{i + 1}</span>
                </button>
              )}
          </div>
        ))}
      <button
        type='button'
        className='py-2'
        disabled={pageNumber === totalPages}
        onClick={() => handlePageChange(pageNumber + 1)}
      >
        <img src={ImgPaginationArrow} alt='arrow' className='w-12' />
      </button>
    </div>
  )
}

export default Pagination
