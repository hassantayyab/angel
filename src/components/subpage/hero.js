import {
  defaultTransition,
  scale,
  slideUp,
  springTransition,
  View,
} from '../../animations'
import { getImage } from 'gatsby-plugin-image'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import BackgroundImage from '../utils/backgroundImage'
import { motion, useAnimation } from 'framer-motion'

const Hero = ({ data, heightClassName = 'h-subpage-hero' }) => {
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

    return function cleanup() {
      return false
    }
  }, [inView, animateTitle, animateSubtitle])

  return (
    <section
      className={`relative bg-black mt-28 md:mt-0 ${heightClassName}`}
      ref={ref}
    >
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
      {data.heroTitle && (
        <div className='relative z-20 px-6 pt-20 overflow-hidden sm:px-16'>
          <div className='w-full px-8 py-12 border-2 sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 sm:min-w-min top-20 h-3/5 border-yellow'>
            <motion.h4
              className='mb-3 uppercase text-orange font-graphikMedium'
              variants={slideUp}
              initial='hidden'
              animate={animateSubtitle}
            >
              {data.heroSubtitle}
            </motion.h4>
            <motion.div
              className='text-3xl text-white uppercase sm:text-5xl xl:text-7xl title'
              variants={scale}
              initial='hidden'
              animate={animateTitle}
            >
              {data.heroTitle}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
