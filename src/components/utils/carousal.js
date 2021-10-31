import { ImgDownArrow } from '../../images'
import React, { useEffect, useState } from 'react'
import Button from './button'

const Carousal = ({ data, id }) => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const element = document.getElementById(`${id}-${active}`)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  }, [active, id])

  return (
    <div className='flex justify-center space-x-6'>
      <Button
        className={`w-10 h-10 overflow-hidden text-black bg-orange rounded-full shadow sm:hidden ${
          active < 1 && 'opacity-60'
        }`}
        disabled={active < 1}
        onClick={() => setActive(active - 1)}
      >
        <img
          src={ImgDownArrow}
          alt='click to scroll'
          className='w-4 m-auto transform rotate-90 filter brightness-0 invert'
        />
      </Button>
      <Button
        className={`w-10 h-10 overflow-hidden text-black bg-orange rounded-full shadow sm:hidden ${
          active >= data.length - 1 && 'opacity-60'
        }`}
        disabled={active >= data.length - 1}
        onClick={() => setActive(active + 1)}
      >
        <img
          src={ImgDownArrow}
          alt='click to scroll'
          className='w-4 m-auto filter brightness-0 invert transform -rotate-90'
        />
      </Button>
    </div>
  )
}

export default Carousal
