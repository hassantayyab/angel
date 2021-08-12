import { ImgBadgeCount } from '../../images'
import React from 'react'

const Badge = () => {
  return (
    <div className='relative z-40 inline-block pt-3 pb-8 text-center'>
      <div className='relative z-20 flex flex-col justify-center w-32 h-32 p-3 text-black rounded-full bg-yellow'>
        <div className='flex items-center justify-center mb-2 gap-2'>
          <img src={ImgBadgeCount} alt='total reviews count' className='w-8' />
          <h3 className='font-graphik'>36</h3>
        </div>
        <small
          className='text-center text-black uppercase font-graphikMedium'
          style={{ fontSize: '0.6rem' }}
        >
          Customer Reviews
        </small>

        <div className='w-16 mx-auto mt-1'>
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
              width='950px'
              style={{ fill: '#F71800', height: '100%' }}
              clipPath='url(#stars-circular)'
            ></rect>
          </svg>
        </div>

        <div className='text-sm text-center mt-1.5 font-graphikMedium'>4.9</div>
      </div>
      <div className='absolute inset-0 mx-auto shadow ribbon bg-blue-light' />
    </div>
  )
}

export default Badge
