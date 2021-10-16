import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { hoverScale, scale } from '../../animations'
import { motion } from 'framer-motion'

const BenefitCard = ({ data }) => (
  <motion.div
    className='w-5/6 px-4 py-8 mt-12 text-center bg-white shadow-xl sm:w-44 md:w-52 transition-all'
    variants={scale}
    whileHover={hoverScale}
  >
    <div className='relative w-20 h-20 mx-auto -mt-20 rounded-full sm:w-24 sm:h-24 bg-blue'>
      <div className='absolute mx-auto w-4/7 absolute-center'>
        <GatsbyImage
          image={getImage(data._reasonPost.reasonImage?.localFile)}
          alt={data._reasonPost.reasonImage?.altText}
          className='mx-auto'
        />
      </div>
      <div className='absolute top-0 border-2 rounded-full -left-1 -right-1 -bottom-2 border-yellow'></div>
    </div>
    <h6 className='mt-6'>{data.title}</h6>
    <p className='mt-3 text-sm text-gray truncate-3'>
      {data._reasonPost.reasonText}
    </p>
  </motion.div>
)

export default BenefitCard
