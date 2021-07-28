import { ImgAddress, ImgCalendar, ImgContactCardBg } from '../../images'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Frame from '../utils/frame'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const ContactCard = ({ carImage, isForHome = false }) => {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <section className='relative'>
      <div className='absolute top-14 left-6 -right-3 -bottom-3 sm:-right-6 sm:-bottom-6 -z-10'>
        <Frame />
      </div>
      <div className='relative z-0 mt-4 grid lg:grid-cols-3 grid-cols-1 bg-blue'>
        <GatsbyImage
          image={getImage(carImage?.localFile)}
          alt={carImage?.altText}
          className={`absolute left-0 z-20 w-80 lg:w-5/12 lg:top-auto lg:-bottom-12 lg:-left-16 2xl:-left-40 lg:translate-x-0 ${
            isForHome ? '-bottom-28' : '-top-12'
          }`}
        />
        <div className='relative'>
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
        <div className={`relative lg:pt-0 ${!isForHome && 'pt-24'}`}>
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
              <select className='flex-1 inline-block pl-10 outline-none placeholder-gray'>
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
        <div className={`relative lg:pb-0 ${isForHome && 'pb-8'}`}>
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
              <img
                src={ImgCalendar}
                alt='input address'
                className='z-10 left-4 absolute-y-center'
              />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <button className='px-5 py-3 btn bg-yellow'>Go</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCard
