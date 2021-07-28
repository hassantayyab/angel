import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const BenefitCard = ({ data }) => (
  <div className='w-48 px-4 py-8 mx-auto mt-12 text-center bg-white shadow-2xl'>
    <div className='relative w-20 h-20 mx-auto -mt-20 rounded-full bg-blue'>
      <div className='absolute w-3/5 absolute-center'>
        <GatsbyImage
          image={getImage(data._reasonPost.reasonImage?.localFile)}
          alt={data._reasonPost.reasonImage?.altText}
          className='mx-auto'
        />
      </div>
      <div className='absolute top-0 border-2 rounded-full -left-1 -right-1 -bottom-2 border-yellow'></div>
    </div>
    <h6 className='mt-6 text-sm'>{data.title}</h6>
    <p className='mt-3 text-xs text-gray truncate-3'>
      {data._reasonPost.reasonText}
    </p>
  </div>
)

export default BenefitCard
