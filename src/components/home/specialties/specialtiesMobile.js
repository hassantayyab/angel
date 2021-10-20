import React, { useEffect, useState } from 'react'
import Accordian from './accordian'
import BackgroundImage from '../../../components/utils/backgroundImage'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import { scale, springTransition, View } from '../../../animations'
import { motion, useAnimation } from 'framer-motion'
import FormDialog from '../../../components/dialog-form/formDialog'

const SpecialtiesMobile = ({ data, contactNumber, carImage, logo }) => {
  const [openItems, setOpenItems] = useState([])
  let [isOpen, setIsOpen] = useState(false)
  let [type, setType] = useState(null)

  const openDialog = (v) => {
    setType(v)
    setIsOpen(true)
  }

  const handleOpenItem = (item) => {
    setOpenItems(
      openItems.includes(item)
        ? openItems.filter((i) => i !== item)
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
            <Accordian data={data.specialtiesItems} />
          </ul>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center px-12 my-12 space-y-4'>
        <button
          type='button'
          className='w-full px-0 btn btn-primary'
          onClick={() => openDialog('service')}
        >
          Same Day Services
        </button>
        <button
          type='button'
          className='w-full px-0 btn btn-secondary'
          onClick={() => openDialog('estimate')}
        >
          Virtual Estimate
        </button>
      </div>

      {/* VideoDialog */}
      <FormDialog
        contactNumber={contactNumber}
        type={type}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        logo={logo}
        carImage={carImage}
      />
    </section>
  )
}

export default SpecialtiesMobile
