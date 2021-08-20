import { ImgAddress, ImgCalendar, ImgContactCardBg } from '../../images'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Frame from '../utils/frame'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import { carTransition, slideLeft, View } from '../../animations'
import { motion, useAnimation } from 'framer-motion'

const ContactCard = ({ carImage, isCarAtBottom = false }) => {
  const [startDate, setStartDate] = useState(new Date())

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
            src={ImgContactCardBg}
            alt='card bg'
            className='absolute inset-0 object-cover w-full h-full'
          />
          <div className='absolute inset-0'></div>
          <div className='relative px-8 py-8 xl:px-12'>
            <h5 className='mb-3 tracking-wider text-white uppercase font-graphikBold'>
              Same Day Services
            </h5>
            <div className='relative flex w-full'>
              <img
                src={ImgAddress}
                alt='input address'
                className='left-4 absolute-y-center'
              />
              <select className='flex-1 inline-block pl-10 rounded-none outline-none placeholder-gray'>
                <option defaultValue value='' disabled>
                  Service area
                </option>
                <option>Air Conditioning</option>
                <option>Heating</option>
              </select>
              <button className='px-5 py-3 text-white btn bg-orange'>Go</button>
            </div>
          </div>
        </div>
        <div className={`relative lg:pb-0 ${isCarAtBottom && 'pb-8'}`}>
          <img
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
          <div className='relative px-8 py-8 xl:px-12'>
            <h5 className='mb-3 tracking-wider text-white uppercase font-graphikBold'>
              Virtual Estimates
            </h5>
            <div className='relative flex w-full'>
              <div className='z-10 left-4 absolute-y-center'>
                <img src={ImgCalendar} alt='input address' />
              </div>
              <div className='w-full'>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <button className='px-5 py-3 btn bg-yellow'>Go</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCard
