import { ImgAddress } from '../../images'
import Accordian from '../utils/accordian'
import React from 'react'

const ServiceAreasAccordianSection = ({ data }) => {
  return (
    <>
      {data.areaLocations.length > 0 &&
        data.areaLocations.map(({ title, places }, i) => (
          <div key={i} className='mb-2'>
            <Accordian defaultOpen={i === 0 && true}>
              <span className='text-white'>{title}</span>
              <ul className='py-2'>
                {places.length > 0 &&
                  places.map(({ name }, j) => (
                    <li
                      className='flex justify-center px-4 py-3 cursor-pointer space-x-3 default-transition'
                      key={j}
                    >
                      <img
                        width='auto'
                        height='auto'
                        src={ImgAddress}
                        alt='address icon'
                      />
                      <span className='text-gray font-graphikMedium'>
                        {name}
                      </span>
                    </li>
                  ))}
              </ul>
            </Accordian>
          </div>
        ))}
    </>
  )
}

export default ServiceAreasAccordianSection
