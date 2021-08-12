import { getImage } from 'gatsby-plugin-image'
import React, { useEffect } from 'react'
import BackgroundImage from '../utils/backgroundImage'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  defaultTransition,
  scale,
  springTransition,
  slideUp,
  View,
} from '../../animations'
import Button from '../utils/button'

const Hero = ({ data, isMain = false, contactFormRef }) => {
  const [ref, inView] = useInView(View)

  const animateTitle = useAnimation()
  const animateSubtitle = useAnimation()
  useEffect(() => {
    if (inView) {
      animateTitle.start({
        ...scale.visible,
        ...springTransition,
      })

      animateSubtitle.start({
        ...slideUp.visible,
        ...defaultTransition,
      })
    }
  }, [inView, animateTitle, animateSubtitle])

  return (
    <section className='relative bg-black h-home-hero' ref={ref}>
      <BackgroundImage
        image={getImage(data.bgImage?.localFile)}
        alt={data.bgImage?.altText}
      />
      <div className='relative h-full px-6 py-40 sm:px-16'>
        <div
          className={`flex flex-col justify-center w-full h-full px-8 py-12 text-white uppercase br-frame sm:text-left sm:items-start sm:w-3/5 lg:w-1/2 top-20 border-yellow ${
            isMain ? 'items-center text-center' : 'items-left'
          }`}
        >
          {isMain && (
            <div className='px-6 py-2 -mt-32 sm:-mt-28 md:-mt-24 lg:-mt-12 xl:-mt-16 mb-7 bg-orange transform -skew-x-12'>
              <h6 className=' transform skew-x-12'>Your Comfort Is</h6>
            </div>
          )}

          <motion.h1
            className='mb-2 font-graphikBold md:mb-0 lg:text-7xl'
            variants={scale}
            initial='hidden'
            animate={animateTitle}
          >
            {data.title}
          </motion.h1>
          <motion.h6
            className='uppercase font-graphikMedium'
            variants={slideUp}
            initial='hidden'
            animate={animateSubtitle}
          >
            {data.subtitle}
          </motion.h6>
          <Button
            type='button'
            className='mt-6 btn btn-primary'
            onClick={() =>
              contactFormRef.current.scrollIntoView({
                block: 'end',
                behavior: 'smooth',
              })
            }
          >
            Schedule Service Now
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
