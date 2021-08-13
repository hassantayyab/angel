import { ImgBackground, ImgBuilding } from '../../images'
import React from 'react'
import Frame from '../utils/frame'
import { motion } from 'framer-motion'
import { hoverScale, scale } from '../../animations'

const ServiceCard = () => {
  return (
    <motion.div
      className='relative max-w-md cursor-pointer transition-all'
      variants={scale}
      whileHover={hoverScale}
    >
      <div className='relative z-10 flex flex-col mb-6 mr-6 bg-white shadow-lg default-transition hover:shadow-xl'>
        <section className='h-60'>
          <img
            src={ImgBackground}
            alt='service'
            className='object-cover w-full h-full'
          />
        </section>
        <section className='h-56 px-6 pt-12 text-center lg:px-12 lg:pt-14'>
          <h5 className='mb-2 font-graphikBold'>
            Philadelphia Residential Heating & Air Conditioning
          </h5>
          <p className='text-sm text-gray'>
            Air conditioner on the fritz? Heater stopped working? Get your HVAC
            unit fixed fast when you need it the most
          </p>
        </section>

        <div className='mt-2 absolute-center'>
          <div className='flex items-center justify-center p-4 border-2 border-white rounded-full bg-blue'>
            <img src={ImgBuilding} alt='building' className='w-10' />
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 right-0 -z-10 w-92 h-92'>
        <Frame />
      </div>
    </motion.div>
  )
}

export default ServiceCard
