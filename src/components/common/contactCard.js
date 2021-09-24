import { ImgContactCardBg } from '../../images'
import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import Frame from '../utils/frame'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import { carTransition, slideLeft, View } from '../../animations'
import { motion, useAnimation } from 'framer-motion'
import Button from '../utils/button'
import FormDialog from '../dialog-form/formDialog'

const ContactCard = ({ carImage, isCarAtBottom = false, logo }) => {
  let [isOpen, setIsOpen] = useState(false)
  let [type, setType] = useState(null)

  const openDialog = (v) => {
    setType(v)
    setIsOpen(true)
  }

  const [ref, inView] = useInView(View)
  const animateCar = useAnimation()
  useEffect(() => {
    if (inView) {
      animateCar.start({
        ...slideLeft.visible,
        ...carTransition,
      })
    }
  }, [inView, animateCar])

  return (
    <section className='relative' ref={ref}>
      <div className='absolute top-14 left-6 -right-3 -bottom-3 sm:-right-6 sm:-bottom-6 -z-10'>
        <Frame />
      </div>
      <div className='relative z-0 flex flex-col justify-end mt-4 lg:flex-row bg-blue'>
        <motion.div
          className={`absolute left-0 z-20 w-80 lg:w-5/12 lg:top-auto lg:-bottom-12 lg:-left-16 2xl:-left-40 lg:translate-x-0 ${
            isCarAtBottom ? '-bottom-28' : '-top-12'
          }`}
          variants={slideLeft}
          initial='hidden'
          animate={animateCar}
        >
          <GatsbyImage
            image={getImage(carImage?.localFile)}
            alt={carImage?.altText}
          />
        </motion.div>
        <div className='relative w-full lg:w-1/3'>
          <img
            width='auto'
            height='auto'
            src={ImgContactCardBg}
            alt='card bg'
            className='absolute inset-0 object-cover w-full h-full'
          />
          <div
            className='absolute inset-0'
            style={{
              background:
                'linear-gradient(90deg, rgba(0,74,143,0.9) 0%, rgba(0,74,143,0.9) 0%)',
            }}
          ></div>
        </div>
        <div
          className={`relative w-full lg:w-1/3 lg:pt-0 ${
            !isCarAtBottom && 'pt-24'
          }`}
        >
          <img
            width='auto'
            height='auto'
            src={ImgContactCardBg}
            alt='card bg'
            className='absolute inset-0 object-cover w-full h-full'
          />
          <div className='absolute inset-0'></div>
          <div className='relative px-8 py-8 text-center xl:px-12'>
            <Button
              type='button'
              className='px-0 w-60 md:w-64 btn btn-primary'
              onClick={() => openDialog('service')}
            >
              Same Day Services
            </Button>
          </div>
        </div>
        <div className={`relative lg:pb-0 ${isCarAtBottom && 'pb-8'}`}>
          <img
            width='auto'
            height='auto'
            src={ImgContactCardBg}
            alt='card bg'
            className='absolute inset-0 object-cover w-full h-full'
          />
          <div
            className='absolute inset-0'
            style={{
              background:
                'linear-gradient(90deg, rgba(9,89,164,0.6) 0%, rgba(9,89,164,0.6) 0%)',
            }}
          ></div>
          <div className='relative px-8 py-8 text-center xl:px-12'>
            <Button
              type='button'
              className='px-0 w-60 md:w-64 btn btn-secondary'
              onClick={() => openDialog('estimate')}
            >
              Virtual Estimates
            </Button>
          </div>
        </div>
      </div>

      {/* VideoDialog */}
      <FormDialog
        type={type}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        logo={logo}
        carImage={carImage}
      />
    </section>
  )
}

export default ContactCard
