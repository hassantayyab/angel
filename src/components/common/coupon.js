import { ImgTick } from '../../images'
import React, { useRef } from 'react'
import Frame from '../utils/frame'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ReactToPrint from 'react-to-print'

const Coupon = ({ data, logo, borderColor }) => {
  const componentRef = useRef()

  return (
    <div
      className='relative max-w-sm pb-5'
      id='coupon-print'
      ref={componentRef}
    >
      <div className='relative z-10 p-3 mr-5 text-white bg-blue'>
        <div className='w-5/6 absolute-center logo'>
          <GatsbyImage
            image={getImage(logo?.localFile)}
            alt={logo?.altText}
            className='mx-auto -z-20'
          />
        </div>

        <div className='relative px-6 py-6 border border-white border-dashed font-graphikMedium bg-blue bg-opacity-90'>
          <div className='flex justify-center mb-6 ml-6 gap-2'>
            <h2 className='mt-2 font-graphikBold'>$</h2>
            <h1 className='text-8xl'>{data.title}</h1>
            <div className='mt-5 mr-2.5 h-0.5 w-9 bg-yellow transform rotate-90'></div>
            <div className='flex items-end flex-shrink w-0 transform rotate-90'>
              <span className='uppercase'>Off</span>
            </div>
          </div>
          <ul className='text-sm'>
            {data._couponPost.items.length > 0 &&
              data._couponPost.items.map(({ text }, i) => (
                <li
                  className='flex items-center mb-6 tracking-wider uppercase'
                  key={i}
                >
                  <img className='mr-3' src={ImgTick} alt='checked icon' />
                  <span>{text}</span>
                </li>
              ))}
          </ul>

          <div className='w-full mt-8 text-center'>
            <ReactToPrint
              trigger={() => (
                <button
                  className='w-5/6 btn btn-primary'
                  onClick={() => window.print()}
                >
                  Get Started
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 right-0 z-0 w-92 h-92 frame'>
        <Frame borderColor='border-yellow-dark' />
      </div>
    </div>
  )
}

export default Coupon
