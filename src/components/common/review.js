import React from 'react'
import Frame from '../utils/frame'

const Review = ({ data }) => (
  <div className='relative max-w-sm pb-5'>
    <div className='relative z-10 p-3 mr-5 bg-yellow'>
      <div className='relative px-6 py-6 text-black border border-black border-dashed bg-yellow font-graphikMedium bg-opacity-90'>
        <h3>{data.title}</h3>
        <div className='w-20 mt-1 mb-4'>
          <svg viewBox='0 0 1000 200'>
            <defs>
              <polygon
                id='star-circular'
                points='100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66 '
              />

              <clipPath id='stars-circular'>
                <use xlinkHref='#star-circular' />
                <use xlinkHref='#star-circular' x='20%' />
                <use xlinkHref='#star-circular' x='40%' />
                <use xlinkHref='#star-circular' x='60%' />
                <use xlinkHref='#star-circular' x='80%' />
              </clipPath>
            </defs>

            <rect
              style={{ fill: '#D7A100', height: '100%', width: '100%' }}
              clipPath='url(#stars-circular)'
            ></rect>

            <rect
              width={data._reviewPost.rating * 200}
              style={{ fill: '#F71800', height: '100%' }}
              clipPath='url(#stars-circular)'
            ></rect>
          </svg>
        </div>
        <p>{data._reviewPost.text}</p>
      </div>
    </div>

    <div className='absolute bottom-0 right-0 z-0 w-92 h-92 frame'>
      <Frame borderColor='border-blue' />
    </div>
  </div>
)

export default Review
