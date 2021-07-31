import { getImage } from 'gatsby-plugin-image'
import React from 'react'
import BackgroundImage from '../utils/backgroundImage'

const Hero = ({ data }) => (
  <div className='relative bg-black h-subpage-hero'>
    <BackgroundImage
      image={getImage(data.heroBgImage?.localFile)}
      alt={data.heroBgImage?.altText}
    />
    <div
      className='absolute inset-0 z-0'
      style={{
        background:
          'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)',
      }}
    ></div>
    <div className='relative z-20 px-6 pt-20 sm:px-16'>
      <div className='w-full px-8 py-12 border-2 sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 top-20 h-3/5 border-yellow'>
        <h4 className='mb-3 uppercase text-orange font-graphikMedium'>
          {data.heroSubtitle}
        </h4>
        <h1 className='text-5xl text-white uppercase xl:text-7xl'>
          {data.heroTitle}
        </h1>
      </div>
    </div>
  </div>
)

export default Hero
