import { ImgAddressBlue } from '../../images'
import React, { useEffect, useState } from 'react'
import Container from '../utils/container'
import Separator from '../utils/separator'
import Frame from '../utils/frame'
import { useServiceAreasQuery } from '../../hooks/serviceAreasQuery'
import { useInView } from 'react-intersection-observer'
import { defaultTransition, slideDown, slideUp, View } from '../../animations'
import { useAnimation } from 'framer-motion'
import Subtitle from '../utils/subititle'
import Title from '../utils/title'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Button from '../utils/button'
import { navigate } from 'gatsby'
import ServiceAreasAccordianSection from './serviceAreasAccordianSection'

const ServiceAreas = () => {
  const data = useServiceAreasQuery()
  const [selected, setselected] = useState(0)

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
    <Container>
      <section
        className='items-center grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-2 md:gap-16'
        ref={ref}
      >
        <div className='xl:ml-20 col-span-1 md:col-span-2 lg:col-span-1'>
          <div className='mb-4 text-center text-black uppercase md:text-left'>
            <Subtitle
              className='mb-1 tracking-wider font-graphikMedium'
              animate={animateSubtitle}
            >
              Map
            </Subtitle>
            <Title animate={animateTitle}>{data.areaHeading}</Title>
          </div>
          <div className='w-1/2 mx-auto mt-8 mb-4 sm:w-1/3 md:ml-0'>
            <Separator />
          </div>

          {/* TODO: Extract this into a separate component */}
          <ul className='hidden mt-10 md:flex space-x-4'>
            {data.areaLocations.length > 0 &&
              data.areaLocations.map(({ title }, i) => {
                let template = []

                if (i > 0 && i < data.areaLocations.length) {
                  template.push(
                    <div
                      key={`border${i}`}
                      className='self-center h-4 w-0.5 bg-gray'
                    ></div>
                  )
                }

                template.push(
                  <div
                    key={`location${i}`}
                    className={`hover:text-orange default-transition cursor-pointer ${
                      selected === i && 'active-link-secondary'
                    }`}
                  >
                    {title}
                  </div>
                )

                return (
                  <li
                    key={i}
                    className='flex text-base uppercase space-x-4 text-gray-dark font-graphikMedium'
                    onClick={() => setselected(i)}
                  >
                    {template}
                  </li>
                )
              })}
          </ul>

          <div className='hidden mt-5 mb-8 overflow-y-scroll h-44 md:grid gap-x-4'>
            <ul className='items-start grid grid-cols-3 grid-rows-3'>
              {data.areaLocations[selected].places.length > 0 &&
                data.areaLocations[selected].places.map(({ name }, i) => (
                  <li
                    className='flex p-4 cursor-pointer space-x-3 hover:bg-yellow default-transition'
                    key={i}
                  >
                    <img
                      width='auto'
                      height='auto'
                      src={ImgAddressBlue}
                      alt='address icon'
                      className='max-w-4'
                    />
                    <span className='text-gray font-graphik'>{name}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className='hidden md:block'>
            <Button
              className='btn btn-primary'
              onClick={() => navigate('/service-areas/')}
            >
              View All Cities Areas
            </Button>
          </div>
        </div>

        <div className='relative col-span-1 md:h-auto h-80 sm:h-96'>
          <div className='relative z-10 object-cover w-full h-full pb-6 pr-6'>
            <GatsbyImage
              image={getImage(data.areaImage?.localFile)}
              alt={data.areaImage?.altText}
            />
          </div>
          <div className='absolute bottom-0 right-0 z-0 w-92 h-92'>
            <Frame />
          </div>
        </div>

        {/* TODO: Extract this into a separate component */}
        <div className='block text-center md:hidden'>
          <ServiceAreasAccordianSection data={data} />
          <div className='block mt-8 md:hidden'>
            <Button
              className='btn btn-primary'
              onClick={() => navigate('/service-areas/')}
            >
              View All Cities Areas
            </Button>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default ServiceAreas
