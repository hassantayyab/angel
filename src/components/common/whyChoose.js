import React, { useEffect, useState } from 'react'
import Container from '../utils/container'
import BenefitCard from '../subpage/benefitCard'
import Separator from '../utils/separator'
import { useWhyChooseQuery } from '../../hooks/whyChooseQuery'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useReasonsQuery } from '../../hooks/reasonsQuery'
import { useInView } from 'react-intersection-observer'
import { defaultTransition, slideDown, slideUp, View } from '../../animations'
import { useAnimation } from 'framer-motion'
import Button from '../utils/button'
import Subtitle from '../utils/subititle'
import Title from '../utils/title'
import { useReasonCategoriesQuery } from '../../hooks/reasonCategoriesQuery'
import FormDialog from '../dialog-form/formDialog'

const WhyChoose = ({ contactNumber, carImage, logo }) => {
  let [isOpen, setIsOpen] = useState(false)
  let [type, setType] = useState(null)

  const openDialog = (v) => {
    setType(v)
    setIsOpen(true)
  }

  const data = useWhyChooseQuery()
  const reasonsData = useReasonsQuery()
  const reasonCategories = useReasonCategoriesQuery()

  const [selectedReason, setSelectedReason] = useState(reasonCategories[0])

  // Animations
  const [ref, inView] = useInView(View)
  const animateTitle = useAnimation()
  const animateSubtitle = useAnimation()

  useEffect(() => {
    if (inView) {
      animateTitle.start({
        ...slideDown.visible,
        ...defaultTransition,
      })

      animateSubtitle.start({
        ...slideUp.visible,
        ...defaultTransition,
      })
    }
  }, [inView, animateTitle, animateSubtitle])

  return (
    <section className='relative pt-12 pb-44 md:pb-80' ref={ref}>
      <div className='absolute bottom-0 left-0 w-full overflow-hidden h-3/4'>
        <div className='absolute bottom-0 w-full'>
          <GatsbyImage
            image={getImage(data.whyChooseBgImage?.localFile)}
            alt={data.whyChooseBgImage?.altText}
            className='object-fill w-full h-full'
          />
          <div
            className='absolute top-0 left-0 z-10 w-full h-3/4'
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,1) 20%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0) 100%)',
            }}
          ></div>
        </div>
      </div>

      <div className='relative z-10'>
        <div className={`text-center uppercase`}>
          <Subtitle
            className='mb-2 tracking-wider font-graphikMedium'
            animate={animateSubtitle}
          >
            Reason To
          </Subtitle>
          <Title animate={animateTitle}>{data.whyChooseHeading}</Title>
        </div>

        {/* Separator */}
        <div className='w-40 mx-auto mt-8 mb-4'>
          <Separator />
        </div>

        {/* TODO: Extract this into a separate component */}
        <div className='flex items-center justify-center mt-6 space-x-8'>
          {reasonCategories.length > 0 &&
            reasonCategories.map((category, i) => (
              <div
                key={i}
                className='flex items-center justify-center text-base space-x-8 text-gray'
              >
                <button
                  type='button'
                  onClick={() => setSelectedReason(category)}
                  className={`uppercase hover:text-orange default-transition h-7 ${
                    category.slug === selectedReason.slug &&
                    'text-orange border-b-2 border-orange'
                  }`}
                >
                  {category.name}
                </button>
                {i < reasonCategories.length - 1 && (
                  <div className='h-4 w-0.5 bg-gray' />
                )}
              </div>
            ))}
        </div>

        {/* Step Cards */}
        <Container>
          <div className='flex flex-wrap items-center justify-center mx-auto mt-8 xl:flex-nowrap space-x-5 space-y-20'>
            {reasonsData
              .filter((r) =>
                r.reasonCategories.nodes
                  .map(({ slug }) => slug)
                  .includes(selectedReason.slug)
              )
              .map((reason, i) => (
                <BenefitCard data={reason} key={i} />
              ))}
          </div>
        </Container>

        <div className='flex flex-col items-center justify-center mt-12 space-y-6 sm:space-x-6 sm:space-y-0 sm:flex-row'>
          <Button
            type='button'
            className='w-4/5 sm:w-72 btn btn-primary'
            onClick={() => openDialog('service')}
          >
            Same Day Services
          </Button>
          <Button
            type='button'
            className='w-4/5 sm:w-72 btn btn-secondary'
            onClick={() => openDialog('estimate')}
          >
            Virtual Estimate
          </Button>
        </div>
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

export default WhyChoose
