import React, { useEffect, useState } from 'react'
import Accordian from './accordian'
import BackgroundImage from '../../../components/utils/backgroundImage'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import { scale, springTransition, View } from '../../../animations'
import { motion, useAnimation } from 'framer-motion'

const SpecialtiesMobile = ({ data, contactFormRef }) => {
  const [openItems, setOpenItems] = useState([])

  const handleOpenItem = (item) => {
    setOpenItems(
      openItems.includes(item)
        ? openItems.filter((i) => i != item)
        : [...openItems, item]
    )
  }

  const [ref, inView] = useInView(View)
  const animateHeading = useAnimation()
  useEffect(() => {
    if (inView) {
      animateHeading.start({
        ...scale.visible,
        ...springTransition,
      })
    }
  }, [inView, animateHeading])

  return (
    <section ref={ref}>
      <div className='relative pt-12 pb-4 text-center sm:px-16'>
        <BackgroundImage
          image={getImage(data.specialtiesBgImage?.localFile)}
          alt={data.specialtiesBgImage?.altText}
        />
        <div
          className='absolute inset-0'
          style={{
            background:
              'linear-gradient(90deg, rgba(0,74,143,1) 0%, rgba(0,74,143,0.9) 0%)',
          }}
        ></div>
        <div className='relative'>
          <motion.h3
            className='mx-auto text-white uppercase md:w-1/2'
            variants={scale}
            initial='hidden'
            animate={animateHeading}
          >
            {data.specialtiesHeading}
          </motion.h3>

          <ul className='mt-4'>
            {data.specialtiesItems.length > 0 &&
              data.specialtiesItems.map((specialty, i) => (
                <li
                  key={i}
                  className={`${
                    i < data.specialtiesItems.length - 1 &&
                    'border-b-2 border-gray-300 border-opacity-20'
                  }`}
                >
                  <Accordian
                    isOpen={openItems.includes(i)}
                    isForServiceArea={false}
                    bgColor='bg-transparent'
                    setOpenItem={() => handleOpenItem(i)}
                  >
                    <div
                      className={`flex items-center gap-4 ${
                        openItems.includes(i) ? 'text-black' : 'text-white'
                      }`}
                    >
                      <GatsbyImage
                        image={getImage(specialty.image?.localFile)}
                        alt={specialty.image?.altText}
                        className={`w-8 filter ${
                          openItems.includes(i)
                            ? 'brightness-0'
                            : 'brightness-0 invert'
                        }`}
                      />
                      <div
                        className={`font-graphikMedium ${
                          openItems.includes(i) ? 'text-black' : 'text-white'
                        }`}
                      >
                        {specialty.title}
                      </div>
                    </div>
                    <div className='px-6 pb-4 bg-yellow'>
                      <div className='p-6 text-center bg-yellow-darker'>
                        <div className='mx-auto'>
                          <GatsbyImage
                            image={getImage(specialty.image?.localFile)}
                            alt={specialty.image?.altText}
                            className='inline-block w-16 mb-4'
                          />
                        </div>

                        <h4 className='font-graphikMedium'>
                          {specialty.title}
                        </h4>
                        <p className='text-sm text-black'>
                          {specialty.description}
                        </p>
                      </div>
                    </div>
                  </Accordian>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center px-12 my-12 gap-4'>
        <button
          type='button'
          className='w-full px-0 btn btn-primary'
          onClick={() =>
            contactFormRef.current.scrollIntoView({
              block: 'end',
              behavior: 'smooth',
            })
          }
        >
          Schedule Service Now
        </button>
        <button
          type='button'
          className='w-full px-0 btn btn-secondary'
          onClick={() =>
            contactFormRef.current.scrollIntoView({
              block: 'end',
              behavior: 'smooth',
            })
          }
        >
          Virtual Estimate
        </button>
      </div>
    </section>
  )
}

export default SpecialtiesMobile
