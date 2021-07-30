import { ImgBackground, ImgHeating, ImgHeatingFan } from '../../../images'
import React, { useState } from 'react'
import Accordian from './accordian'

const SpecialtiesMobile = ({ data }) => {
  const [openItem, setOpenItem] = useState(undefined)

  const handleOpenItem = (item) => {
    setOpenItem(item === openItem ? undefined : item)
  }

  return (
    <section>
      <div className='relative pt-12 pb-4 text-center sm:px-16'>
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

          <ul className='mt-4'>
            <li className='border-b-2 border-gray-300 border-opacity-20'>
              <Accordian
                defaultOpen={false}
                isForServiceArea={false}
                bgColor='bg-transparent'
                setOpenItem={() => handleOpenItem(1)}
              >
                <div
                  className={`flex items-center gap-4 ${
                    openItem === 1 ? 'text-black' : 'text-white'
                  }`}
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
                    Ductless HVAC Systems
                  </div>
                </div>
                <div className='px-6 pb-4 bg-yellow'>
                  <div className='p-6 text-center bg-yellow-darker'>
                    <div className='mx-auto'>
                      <img
                        src={ImgHeatingFan}
                        alt='heating fan'
                        className='inline-block w-16 mb-4'
                      />
                    </div>

                    <h4 className='font-graphikMedium'>
                      Ductless HVAC Systems
                    </h4>
                    <p className='text-sm text-black'>
                      At Angel Heating & Cooling, we have over 20+ years
                      experience repairing and installing heating and cooling
                      systems in Philadelphia, Bucks County and Montgomery
                      County areas. We understand that unexpected interruptions.
                    </p>
                  </div>
                </div>
              </Accordian>
            </li>

            <li>
              <Accordian
                defaultOpen={false}
                isForServiceArea={false}
                bgColor='bg-transparent'
                setOpenItem={() => handleOpenItem(2)}
              >
                <div
                  className={`flex items-center gap-4 ${
                    openItem === 2 ? 'text-black' : 'text-white'
                  }`}
                >
                  <img
                    src={ImgHeating}
                    alt='heating service'
                    className={`w-8 ${openItem === 2 && 'filter brightness-0'}`}
                  />
                  <div
                    className={`font-graphikMedium ${
                      openItem === 2 ? 'text-black' : 'text-white'
                    }`}
                  >
                    Air conditioning & Cooling
                  </div>
                </div>
                <div className='px-6 pb-4 bg-yellow'>
                  <div className='p-6 text-center bg-yellow-darker'>
                    <div className='mx-auto'>
                      <img
                        src={ImgHeatingFan}
                        alt='heating fan'
                        className='inline-block w-16 mb-4'
                      />
                    </div>

                    <h4 className='font-graphikMedium'>
                      Air conditioning & Cooling
                    </h4>
                    <p className='text-sm text-black'>
                      At Angel Heating & Cooling, we have over 20+ years
                      experience repairing and installing heating and cooling
                      systems in Philadelphia, Bucks County and Montgomery
                      County areas. We understand that unexpected interruptions.
                    </p>
                  </div>
                </div>
              </Accordian>
            </li>
          </ul>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center px-12 my-12 gap-4'>
        <button type='button' className='w-full px-0 btn btn-primary'>
          Schedule Service Now
        </button>
        <button type='button' className='w-full px-0 btn btn-secondary'>
          Virtual Estimate
        </button>
      </div>
    </section>
  )
}

export default SpecialtiesMobile
