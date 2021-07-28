import { getImage } from 'gatsby-plugin-image'
import React from 'react'
import BackgroundImage from '../utils/backgroundImage'

const Hero = ({ data }) => (
  <div className='relative bg-black h-home-hero'>
    <BackgroundImage
      image={getImage(data.heroBgImage?.localFile)}
      alt={data.heroBgImage?.altText}
      loading='lazy'
    />
    <div className='relative h-full px-6 py-40 sm:px-16'>
      <div className='flex flex-col items-center justify-center w-full h-full px-8 py-12 text-center text-white uppercase border-2 sm:text-left sm:items-start sm:w-3/5 lg:w-1/2 top-20 border-yellow'>
        <div className='px-6 py-2 -mt-32 sm:-mt-28 md:-mt-24 lg:-mt-12 xl:-mt-16 mb-7 bg-orange transform -skew-x-12'>
          <h6 className=' transform skew-x-12'>Your Comfort Is</h6>
        </div>

        <h1 className='mb-2 font-graphikBold md:mb-0 lg:text-7xl'>
          {data.heroTitle}
        </h1>
        <h6 className='uppercase font-graphikMedium'>{data.heroSubtitle}</h6>
        <button type='button' className='mt-6 btn btn-primary'>
          Schedule Service Now
        </button>
      </div>
    </div>
  </div>
)

export default Hero
