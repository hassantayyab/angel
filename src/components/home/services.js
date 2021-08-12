import { defaultTransition, slideDown, slideUp, View } from '../../animations'
import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Container from '../utils/container'
import Separator from '../utils/separator'
import ServiceCard from './serviceCard'
import { useAnimation } from 'framer-motion'
import Subtitle from '../utils/subititle'
import Title from '../utils/title'

const Services = ({ data }) => {
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
    <section className='max-w-4xl mx-auto' ref={ref}>
      <Container>
        <div className='text-center uppercase'>
          <Subtitle
            className='mb-2 tracking-wider font-graphikMedium'
            animate={animateSubtitle}
          >
            {data.serviceSubheading}
          </Subtitle>
          <Title animate={animateTitle}>{data.serviceHeading}</Title>
        </div>

        <div className='w-40 mx-auto my-6'>
          <Separator />
        </div>

        <div className='flex flex-col items-center justify-between mt-12 md:mt-16 md:flex-row gap-12'>
          <ServiceCard />
          <ServiceCard />
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment ServiceFragment on WpPage {
    _serviceSection {
      serviceSubheading
      serviceHeading
    }
  }
`

export default Services
