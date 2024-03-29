import { ImgCall } from '../../images'
import React from 'react'
import Container from '../utils/container'
import { motion } from 'framer-motion'
import { fadeIn } from '../../animations'

const MobileContactMenu = ({ data }) => (
  <motion.section
    className='absolute inset-x-0 top-0 bottom-0 z-30 w-full h-screen text-white pt-52 md:-top-1 lg:hidden'
    style={{ backgroundColor: '#004284' }}
    variants={fadeIn}
    initial='hidden'
    animate='visible'
  >
    <div className='h-full border-t border-white bg-blue border-opacity-10'>
      <Container>
        <div className='px-6 pt-12'>
          {data.length > 0 &&
            data.map(({ number, location }, i) => (
              <div key={i}>
                <a
                  href={`tel:${number}`}
                  className={`flex items-center hover:text-yellow default-transition w-full text-lg mb-8`}
                >
                  <img
                    width='auto'
                    height='auto'
                    src={ImgCall}
                    alt='call'
                    className='w-6 mr-3'
                  />
                  <div className='flex flex-wrap items-center'>
                    <span className='mr-2 text-white font-graphik text-opacity-80'>
                      {location}:
                    </span>
                    <span className='font-graphikMedium'>{number}</span>
                  </div>
                </a>
              </div>
            ))}
        </div>
      </Container>
    </div>
  </motion.section>
)

export default MobileContactMenu
