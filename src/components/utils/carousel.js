import React, { useEffect, useRef } from 'react'
import Glide from '@glidejs/glide' // https://glidejs.com/

const Carousel = ({ items = [] }) => {
  const glideRef = useRef()

  useEffect(() => {
    const glide = new Glide(glideRef.current, {
      type: 'carousel',
      startAt: 0,
      perView: Math.min(3, items.length),
      peek: {
        before: 100,
        after: 100,
      },
    })

    glide.mount()

    return () => glide.destroy()
  }, [items.length])

  return (
    <>
      <h1 className='text-xl'>Carousel</h1>
      <div className='glide' ref={glideRef}>
        <div className='glide__track' data-glide-el='track'>
          <ul className='glide__slides'>
            {items.map((item, index) => (
              <li className='glide__slide' key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className='glide__arrows' data-glide-el='controls'>
          <button
            className='glide__arrow glide__arrow--left'
            data-glide-dir='<'
          >
            prev
          </button>
          <button
            className='bg-purple-400 glide__arrow glide__arrow--right'
            data-glide-dir='>'
          >
            next
          </button>
        </div>

        <div className='glide__bullets' data-glide-el='controls[nav]'>
          {items.map((_, index) => (
            <button
              key={index}
              className='glide__bullet'
              data-glide-dir={`=${index}`}
            ></button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Carousel
