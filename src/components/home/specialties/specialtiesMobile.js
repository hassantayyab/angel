import { ImgBackground, ImgHeating } from '../../../images'
import React, { useState } from 'react'
import Accordian from '../../../components/utils/accordian'

const SpecialtiesMobile = ({ data }) => {
  const [openItem, setOpenItem] = useState(undefined)

  const handleOpenItem = (item) => {
    console.log('clicked', openItem)
    setOpenItem(item === openItem ? undefined : item)
  }

  return (
    <section className='relative pt-12 pb-4 text-center sm:px-16'>
      <img
        src={ImgBackground}
        alt='bg'
        className='absolute inset-0 object-cover w-full h-full'
      />
      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(90deg, rgba(0,74,143,1) 0%, rgba(0,74,143,0.9) 0%)',
        }}
      ></div>
      <div className='relative'>
        <h3 className='mx-auto text-white uppercase md:w-1/2'>
          Some of our specialties
        </h3>

        <ul>
          <li className='border-b-2 border-gray-300 border-opacity-20'>
            <Accordian
              defaultOpen={false}
              isForServiceArea={false}
              bgColor='bg-transparent'
            >
              <div
                className={`flex items-center px-6 py-4 gap-4 ${
                  openItem === 1 ? 'text-black' : 'text-white'
                }`}
                onClick={() => handleOpenItem(1)}
              >
                <img
                  src={ImgHeating}
                  alt='heating service'
                  className={`w-8 ${openItem === 1 && 'filter brightness-0'}`}
                />
                <div
                  className={`font-graphikMedium ${
                    openItem === 1 ? 'text-black' : 'text-white'
                  }`}
                >
                  Air conditioning & Cooling
                </div>
              </div>
              <div className='p-4 bg-yellow-dark'></div>
            </Accordian>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default SpecialtiesMobile
