import React, { useEffect, useState } from 'react'
import ContainerSecondary from '../../utils/containerSecondary'
import Separator from '../../utils/separator'
import Frame from '../../utils/frame'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import BackgroundImage from '../../../components/utils/backgroundImage'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  defaultTransition,
  fadeIn,
  scale,
  slideDown,
  slideUp,
  springTransition,
  View,
} from '../../../animations'
import Subtitle from '../../utils/subititle'
import Title from '../../utils/title'
import Button from '../../utils/button'
import FormDialog from '../../../components/dialog-form/formDialog'

const SpecialtiesDesktop = ({
  data,
  contactNumber,
  carImage,
  logo,
  contactFormRef,
}) => {
  const [selected, setSelected] = useState(0)
  let [isOpen, setIsOpen] = useState(false)
  let [type, setType] = useState(null)

  const openDialog = (v) => {
    setType(v)
    setIsOpen(true)
  }

  const [ref, inView] = useInView(View)

  const animateHeading = useAnimation()
  const animateTitle = useAnimation()
  const animateSubtitle = useAnimation()
  const animateContent = useAnimation()
  useEffect(() => {
    if (inView) {
      animateHeading.start({
        ...scale.visible,
        ...springTransition,
      })

      animateTitle.start({
        ...slideDown.visible,
        ...defaultTransition,
      })

      animateSubtitle.start({
        ...slideUp.visible,
        ...defaultTransition,
      })

      animateContent.start({
        ...fadeIn.visible,
        ...defaultTransition,
      })
    }
  }, [inView, animateHeading, animateTitle, animateSubtitle, animateContent])

  return (
    <section className='relative py-20' ref={ref}>
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
      <ContainerSecondary>
        <div className='relative flex flex-col lg:flex-row space-x-8 xl:space-x-20'>
          <div className='flex-1'>
            <motion.h3
              className='text-white uppercase'
              variants={scale}
              initial='hidden'
              animate={animateHeading}
            >
              {data.specialtiesHeading}
            </motion.h3>
            <ul className='w-full mt-8'>
              {data.specialtiesItems.length > 0 &&
                data.specialtiesItems.map((specialty, i) => (
                  <li
                    key={i}
                    className={`flex items-center default-transition border border-transparent px-6 py-4 space-x-6 cursor-pointer hover:border-yellow ${
                      selected === i ? 'bg-yellow' : 'text-white'
                    }`}
                    onClick={() => setSelected(i)}
                  >
                    <GatsbyImage
                      image={getImage(specialty.image?.localFile)}
                      alt={specialty.image?.altText}
                      className={`w-10 filter ${
                        selected === i ? 'brightness-0' : 'brightness-0 invert'
                      }`}
                    />
                    <div className='font-graphikMedium'>{specialty.title}</div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Description */}
          <div className='relative z-20 w-full -mb-40 lg:w-2/3'>
            <div className='z-20 w-64 absolute-x-center -top-9'>
              <GatsbyImage
                image={getImage(logo?.localFile)}
                alt={logo?.altText}
              />
            </div>
            <div className='absolute top-0 bottom-0 left-0 z-0 right-8'>
              <Frame />
            </div>
            <div className='relative px-8 py-24 mt-6 ml-6 md:px-12 xl:px-40'>
              <BackgroundImage
                image={getImage(data.specialtiesBgImage?.localFile)}
                alt={data.specialtiesBgImage?.altText}
              />
              <div
                className='absolute inset-0'
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) 0%)',
                }}
              ></div>
              <div className='relative text-center'>
                <div className='mb-2 text-black uppercase'>
                  <Subtitle
                    className='tracking-wider font-graphikMedium'
                    animate={animateSubtitle}
                  >
                    Reason To
                  </Subtitle>
                  <Title animate={animateTitle}>The Best Services</Title>
                </div>

                {/* Separator */}
                <div className='w-40 mx-auto mt-6 mb-10'>
                  <Separator />
                </div>

                <div className='mx-auto'>
                  <GatsbyImage
                    image={getImage(
                      data.specialtiesItems[selected].image?.localFile
                    )}
                    alt={data.specialtiesItems[selected].image?.altText}
                    className='inline-block w-16 mb-5 filter brightness-0'
                  />
                </div>

                <motion.h4
                  className='font-graphikMedium'
                  variants={fadeIn}
                  initial='hidden'
                  animate={animateContent}
                >
                  {data.specialtiesItems[selected].title}
                </motion.h4>
                <motion.p
                  className='mt-3 text-gray'
                  variants={fadeIn}
                  initial='hidden'
                  animate={animateContent}
                >
                  {data.specialtiesItems[selected].description}
                </motion.p>
                <div className='flex flex-col items-center justify-center px-5 mt-12 space-x-4 sm:flex-row'>
                  <Button
                    type='button'
                    className='flex-1 px-0 btn btn-primary'
                    onClick={() => openDialog('service')}
                  >
                    Same Day Service
                  </Button>
                  <Button
                    type='button'
                    className='flex-1 px-0 btn btn-secondary'
                    onClick={() => openDialog('estimate')}
                  >
                    Virtual Estimate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerSecondary>

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
export default SpecialtiesDesktop
