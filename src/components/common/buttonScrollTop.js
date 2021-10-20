import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import scrollTo from 'gatsby-plugin-smoothscroll'
import Button from '../utils/button'
import { ImgDownArrow } from '../../images'

const isBrowser = typeof window !== 'undefined'

const ButtonScrollTop = () => {
  const [visible, setvisible] = useState(false)

  useEffect(() => {
    if (isBrowser) {
      document.addEventListener('scroll', () => {
        window.scrollY > 560 ? setvisible(true) : setvisible(false)
      })
    }
    return () => {
      setvisible(false)
    }
  }, [])

  return (
    <>
      {visible && (
        <Button
          type='button'
          className='fixed z-50 flex flex-col items-center justify-center rounded-full shadow w-14 h-14 bg-orange bottom-7 right-5 bg-opacity-80 default-transition'
          id='button-scroll-top'
          onClick={() => scrollTo('#top', 'end')}
        >
          <img
            src={ImgDownArrow}
            alt='arrow'
            className='transform rotate-180 filter brightness-0 invert'
          />
        </Button>
      )}
    </>
  )
}

export default ButtonScrollTop
