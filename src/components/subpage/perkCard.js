import Frame from '../utils/frame'
import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const PerkCard = ({ data }) => (
  <div className='relative max-w-sm h-perk-card'>
    <div className='pr-6 h-2/3 md:h-auto'>
      <GatsbyImage
        image={getImage(data.guaranteeBg?.localFile)}
        alt={data.guaranteeBg?.altText}
        className='w-100'
      />
    </div>

    <div className='py-6 pl-8 pr-5 md:pl-14 h-1/3'>
      <GatsbyImage
        image={getImage(data.guaranteeImage?.localFile)}
        alt={data.guaranteeImage?.altText}
        className='ml-0 -mt-32 w-36 sm:ml-6 md:-ml-2'
      />
      <h6 className='ml-6 -mt-4 font-graphikBold md:ml-0'>
        {data.guaranteeHeading}
      </h6>
      <a
        href='javascript;'
        className='hidden mt-2 ml-6 text-sm uppercase text-orange font-graphikBold hover:opacity-80 default-transition md:ml-0'
      >
        Read More
      </a>
    </div>

    <div className='absolute bottom-0 right-0 w-92 h-92'>
      <Frame />
    </div>
  </div>
)

export default PerkCard
