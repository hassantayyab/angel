import { ImgArrow } from '../../images'
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
    <>
      {active < data.length - 1 && (
        <Button
          className='absolute z-20 w-10 h-10 overflow-hidden text-black bg-white border rounded-full shadow -right-2 absolute-y-center sm:hidden border-gray border-opacity-60'
          onClick={() => setActive(active + 1)}
        >
          <img src={ImgArrow} alt='click to scroll' className='w-4 m-auto' />
        </Button>
      )}
      {active > 0 && (
        <Button
          className='absolute z-20 w-10 h-10 overflow-hidden text-black bg-white border rounded-full shadow border-gray border-opacity-60 -left-2 absolute-y-center sm:hidden'
          onClick={() => setActive(active - 1)}
        >
          <img
            src={ImgArrow}
            alt='click to scroll'
            className='w-4 m-auto transform rotate-180'
          />
        </Button>
      )}
    </>
  )
}

export default Carousal
