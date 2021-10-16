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
import Badge from '../utils/badge'
import { useState } from 'react'
import FormDialog from '../dialog-form/formDialog'
import { navigate } from 'gatsby-link'

const isBrowser = typeof window !== 'undefined'

const Hero = ({
  data,
  isMain = false,
  showBadge = true,
  buttonLabel = 'Schedule Service Now',
  contactNumber,
  carImage,
  logo,
}) => {
  const [ref, inView] = useInView(View)
  const [scroll, setScroll] = useState(false)
  let [isFormModalOpen, setIsFormModalOpen] = useState(false)
  let [type, setType] = useState(null)

  const openFormDialog = (v) => {
    // For financing Learn more
    if (!isMain && !showBadge) {
      navigate('/financing')
      return
    }

    setType(v)
    setIsFormModalOpen(true)
  }

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

    if (isBrowser) {
      document.addEventListener('scroll', () => {
        window.scrollY > 10 ? setScroll(true) : setScroll(false)
      })
    }
  }, [inView, animateTitle, animateSubtitle])

  return (
    <section
      className={`relative bg-black mt-28 h-home-hero ${
        isMain ? 'md:mt-40' : 'md:mt-0'
      }`}
      ref={ref}
    >
      <div
        className={`absolute z-20 w-full text-center sm:w-auto sm:right-20 lg:right-32 bottom-28 sm:bottom-auto ${
          scroll ? 'lg:z-20' : 'lg:z-50'
        }`}
      >
        {showBadge && <Badge />}
      </div>
      <BackgroundImage
        image={getImage(data.bgImage?.localFile)}
        alt={data.bgImage?.altText}
      />
      <div className='relative h-full px-6 pb-40 pt-28 sm:py-40 2xl:py-40 3xl:py-40 sm:px-16'>
        <div
          className={`flex flex-col justify-center w-full h-full px-8 py-12 text-white uppercase br-frame sm:text-left sm:items-start sm:w-3/5 lg:w-2/3 xl:w-1/2 3xl:w-1/3 top-20 border-yellow ${
            isMain ? 'items-center text-center' : 'items-left'
          }`}
        >
          {isMain && (
            <div className='px-6 py-2 -mt-44 sm:-mt-28 md:-mt-24 lg:-mt-16 xl:-mt-16 2xl:-mt-16 3xl:-mt-16 mb-7 bg-orange transform -skew-x-12'>
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
            className='mt-3 sm:mt-6 btn btn-primary'
            onClick={() => openFormDialog('service')}
          >
            {buttonLabel}
          </Button>
        </div>
      </div>

      {/* VideoDialog */}
      <FormDialog
        contactNumber={contactNumber}
        type={type}
        isOpen={isFormModalOpen}
        setIsOpen={setIsFormModalOpen}
        logo={logo}
        carImage={carImage}
      />
    </section>
  )
}

export default Hero
