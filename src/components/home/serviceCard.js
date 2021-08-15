import React from 'react'
import Frame from '../utils/frame'
import { motion } from 'framer-motion'
import { hoverScale, scale } from '../../animations'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

const ServiceCard = ({ data }) => {
  return (
    <motion.div
      className='relative max-w-md transition-all'
      variants={scale}
      whileHover={hoverScale}
    >
      <Link to={data.offeredLink.url}>
        <div className='relative z-10 flex flex-col mb-6 mr-6 bg-white shadow-lg default-transition hover:shadow-xl'>
          <section className='h-60'>
            {/* <img
            src={ImgBackground}
            alt='service'
            className='object-cover w-full h-full'
          /> */}
            <GatsbyImage
              image={getImage(data.offeredBg?.localFile)}
              alt={data.offeredBg?.altText}
              className='object-cover w-full h-full'
            />
          </section>
          <section className='h-56 px-6 pt-12 text-center lg:px-12 lg:pt-14'>
            <h5 className='mb-2 font-graphikBold'>{data.offeredTitle}</h5>
            <p className='text-sm text-gray line-clamp-3'>
              {data.offeredDescription}
            </p>
          </section>

          <div className='mt-2 absolute-center'>
            <div className='flex items-center justify-center p-4 border-2 border-white rounded-full bg-blue'>
              <GatsbyImage
                image={getImage(data.offeredImage?.localFile)}
                alt={data.offeredImage?.altText}
                className='w-10'
              />
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 right-0 -z-10 w-92 h-92'>
          <Frame />
        </div>
      </Link>
    </motion.div>
  )
}

export default ServiceCard
