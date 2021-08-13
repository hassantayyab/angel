import { ImgPlay } from '../../images'
import React from 'react'
import Button from './button'

const PlayButton = () => {
  return (
    <Button
      type='button'
      className='border rounded-full p-1.5 border-yellow-50 border-opacity-30 transition-all'
    >
      <div className='border rounded-full p-1.5 border-yellow-50 border-opacity-30'>
        <div className='border rounded-full p-1.5 border-yellow-50 border-opacity-30'>
          <div className='py-5 pl-6 pr-5 rounded-full bg-yellow'>
            <img src={ImgPlay} alt='play video' />
          </div>
        </div>
      </div>
    </Button>
  )
}

export default PlayButton
