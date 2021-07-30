import { ImgBackground, ImgHeating, ImgHeatingFan } from '../../../images'
import React from 'react'
import LayoutSecondary from '../../utils/layout-secondary'
import Separator from '../../utils/separator'
import Frame from '../../utils/frame'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const SpecialtiesDesktop = ({ logo }) => (
  <section className='relative py-20'>
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
    <LayoutSecondary>
      <div className='relative flex flex-col lg:flex-row gap-8 xl:gap-20'>
        <div className='flex-1'>
          <h3 className='text-white uppercase'>Some of our specialties</h3>
          <ul className='w-full mt-8'>
            <li className='flex items-center px-6 py-4 text-white gap-6'>
              <img src={ImgHeating} alt='heating service' className='w-10' />
              <div className='font-graphikMedium'>
                Air conditioning & Cooling
              </div>
            </li>
            <li className='flex items-center px-6 py-4 gap-6 bg-yellow'>
              <img
                src={ImgHeating}
                alt='heating service'
                className='w-10 filter brightness-0'
              />
              <div className='font-graphikMedium'>
                Air conditioning & Cooling
              </div>
            </li>
            <li className='flex items-center px-6 py-4 text-white gap-6'>
              <img src={ImgHeating} alt='heating service' className='w-10' />
              <div className='font-graphikMedium'>
                Air conditioning & Cooling
              </div>
            </li>
          </ul>
        </div>

        {/* Description */}
        <div className='relative z-20 w-full -mb-40 lg:w-2/3'>
          <GatsbyImage
            image={getImage(logo?.localFile)}
            alt={logo?.altText}
            className='z-20 w-64 absolute-x-center -top-9'
          />
          <div className='absolute top-0 bottom-0 left-0 z-0 right-8'>
            <Frame />
          </div>
          <div className='relative px-8 py-24 mt-6 ml-6 md:px-12 xl:px-40'>
            <img
              src={ImgBackground}
              alt='bg'
              className='absolute inset-0 object-cover w-full h-full'
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
                <h5 className='tracking-wider font-graphikMedium'>Reason To</h5>
                <h2>The Best Services</h2>
              </div>

              {/* Separator */}
              <div className='w-40 mx-auto mt-6 mb-10'>
                <Separator />
              </div>

              <div className='mx-auto'>
                <img
                  src={ImgHeatingFan}
                  alt='heating fan'
                  className='inline-block w-16 mb-5'
                />
              </div>

              <h4 className='font-graphikMedium'>Ductless HVAC Systems</h4>
              <p className='mt-3 text-gray'>
                At Angel Heating & Cooling, we have over 20+ years experience
                repairing and installing heating and cooling systems in
                Philadelphia, Bucks County and Montgomery County areas. We
                understand that unexpected interruptions with your HVAC system
                can leave your family freezing in the dead of Winter or
                sweltering in the middle of Summer.
              </p>
              <div className='flex flex-col items-center justify-center px-5 mt-12 gap-4 sm:flex-row'>
                <button type='button' className='flex-1 px-0 btn btn-primary'>
                  Schedule Service Now
                </button>
                <button type='button' className='flex-1 px-0 btn btn-secondary'>
                  Virtual Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutSecondary>
  </section>
)

export default SpecialtiesDesktop
