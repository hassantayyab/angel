import { ImgAddress, ImgAddressBlue, ImgMap } from '../../images'
import React, { useState } from 'react'
import Container from '../utils/container'
import Separator from '../utils/separator'
import ButtonPrimary from '../utils/button-primary'
import Frame from '../utils/frame'
import Accordian from '../utils/accordian'
import { useServiceAreasQuery } from '../../hooks/serviceAreasQuery'

const ServiceAreas = () => {
  const data = useServiceAreasQuery()
  const [selected, setselected] = useState(0)

  return (
    <Container>
      <section className='items-center grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-2 md:gap-16'>
        <div className='xl:ml-20 col-span-1 md:col-span-2 lg:col-span-1'>
          <div className='mb-4 text-center text-black uppercase md:text-left'>
            <h5 className='mb-1 tracking-wider font-graphikMedium'>Map</h5>
            <h2>{data.areaHeading}</h2>
          </div>
          <div className='w-1/2 mx-auto mt-8 mb-4 sm:w-1/3 md:ml-0'>
            <Separator />
          </div>

          {/* TODO: Extract this into a separate component */}
          <ul className='hidden mt-10 md:flex gap-4'>
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
                    className='flex text-base uppercase gap-4 text-gray-dark font-graphikMedium'
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
                    className='flex p-4 cursor-pointer gap-3 hover:bg-yellow default-transition'
                    key={i}
                  >
                    <img
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
            <ButtonPrimary>View All Cities Areas</ButtonPrimary>
          </div>
        </div>

        <div className='relative col-span-1 md:h-auto h-80 sm:h-96'>
          <img
            src={ImgMap}
            alt='map'
            className='relative z-10 object-cover w-full h-full pb-6 pr-6'
          />
          <div className='absolute bottom-0 right-0 z-0 w-92 h-92'>
            <Frame />
          </div>
        </div>

        {/* TODO: Extract this into a separate component */}
        <div className='block text-center md:hidden'>
          {data.areaLocations.length > 0 &&
            data.areaLocations.map(({ title, places }, i) => (
              <div key={i} className='mb-2'>
                <Accordian>
                  <span className='text-white'>{title}</span>
                  <ul className='py-2'>
                    {places.length > 0 &&
                      places.map(({ name }, j) => (
                        <li
                          className='flex justify-center px-4 py-3 cursor-pointer gap-3 default-transition'
                          key={j}
                        >
                          <img src={ImgAddress} alt='address icon' />
                          <span className='text-gray font-graphikMedium'>
                            {name}
                          </span>
                        </li>
                      ))}
                  </ul>
                </Accordian>
              </div>
            ))}
          <div className='block mt-8 md:hidden'>
            <ButtonPrimary>View All Cities Areas</ButtonPrimary>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default ServiceAreas
