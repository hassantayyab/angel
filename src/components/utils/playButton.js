import { ImgPlay } from '../../images'
import React from 'react'

const PlayButton = () => {
  return (
    <button
      type='button'
      className='border rounded-full p-1.5 border-yellow-50 border-opacity-30'
    >
      <div className='border rounded-full p-1.5 border-yellow-50 border-opacity-30'>
        <div className='border rounded-full p-1.5 border-yellow-50 border-opacity-30'>
          <div className='py-5 pl-6 pr-5 rounded-full bg-yellow'>
            <img src={ImgPlay} alt='play video' />
          </div>
        </div>
      </div>
    </button>
  )
}

export default PlayButton
