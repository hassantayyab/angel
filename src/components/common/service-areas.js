import {
  ImgAddress,
  ImgAddressBlue,
  ImgAddressYellow,
  ImgMap,
} from '../../images'
import React from 'react'
import Layout from '../utils/layout'
import Separator from '../utils/separator'
import ButtonPrimary from '../utils/button-primary'
import Frame from '../utils/frame'
import Accordian from '../utils/accordian'

const ServiceAreas = () => {
  return (
    <Layout>
      <section className='items-center grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-2 md:gap-16'>
        <div className='xl:ml-20 col-span-1 md:col-span-2 lg:col-span-1'>
          <div className='mb-4 text-center text-black uppercase md:text-left'>
            <h5 className='mb-1 tracking-wider font-graphikMedium'>Map</h5>
            <h2>Service Areas</h2>
          </div>
          <div className='w-1/2 mx-auto mt-8 mb-4 sm:w-1/3 md:ml-0'>
            <Separator />
          </div>

          <div className='hidden mt-10 text-base uppercase gap-4 text-gray-dark font-graphikMedium md:flex'>
            <a
              href='javascript;'
              className='hover:text-orange default-transition active-link-secondary'
            >
              Bucks County
            </a>
            <div className='self-center h-4 w-0.5 bg-gray'></div>
            <a
              href='javascript;'
              className='hover:text-orange default-transition'
            >
              Montgomery County
            </a>
            <div className='self-center h-4 w-0.5 bg-gray'></div>
            <a
              href='javascript;'
              className='hover:text-orange default-transition'
            >
              Philadelphia
            </a>
          </div>

          <div className='hidden mt-5 mb-8 overflow-y-scroll h-44 md:grid grid-cols-3 gap-x-4'>
            <ul>
              <li className='flex p-4 cursor-pointer gap-3 hover:bg-yellow default-transition'>
                <img src={ImgAddressBlue} alt='address icon' />
                <span className='text-gray font-graphik'>Durham</span>
              </li>
              <li className='flex p-4 cursor-pointer gap-3 hover:bg-yellow default-transition bg-blue-light'>
                <img src={ImgAddressYellow} alt='address icon' />
                <span className='text-white font-graphik'>Durham</span>
              </li>
              <li className='flex p-4 cursor-pointer gap-3 hover:bg-yellow default-transition'>
                <img src={ImgAddressBlue} alt='address icon' />
                <span className='text-gray font-graphik'>Durham</span>
              </li>
              <li className='flex p-4 cursor-pointer gap-3 hover:bg-yellow default-transition'>
                <img src={ImgAddressBlue} alt='address icon' />
                <span className='text-gray font-graphik'>Durham</span>
              </li>
              <li className='flex p-4 cursor-pointer gap-3 hover:bg-yellow default-transition'>
                <img src={ImgAddressBlue} alt='address icon' />
                <span className='text-gray font-graphik'>Durham</span>
              </li>
              <li className='flex p-4 cursor-pointer gap-3 hover:bg-yellow default-transition'>
                <img src={ImgAddressBlue} alt='address icon' />
                <span className='text-gray font-graphik'>Durham</span>
              </li>
            </ul>
            <ul>
              <li className='flex p-4 cursor-pointer gap-3 hover:bg-yellow default-transition'>
                <img src={ImgAddressBlue} alt='address icon' />
                <span className='text-gray font-graphik'>Durham</span>
              </li>
              <li className='flex p-4 cursor-pointer gap-3 hover:bg-yellow default-transition'>
                <img src={ImgAddressBlue} alt='address icon' />
                <span className='text-gray font-graphik'>Durham</span>
              </li>
              <li className='flex p-4 cursor-pointer gap-3 hover:bg-yellow default-transition'>
                <img src={ImgAddressBlue} alt='address icon' />
                <span className='text-gray font-graphik'>Durham</span>
              </li>
            </ul>
            <ul>
              <li className='flex p-4 cursor-pointer gap-3 hover:bg-yellow default-transition'>
                <img src={ImgAddressBlue} alt='address icon' />
                <span className='text-gray font-graphik'>Durham</span>
              </li>
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

        <div className='block text-center md:hidden'>
          <Accordian>
            <span className='px-6 py-4 text-white'>Bucks County</span>
            <ul>
              <li className='flex justify-center p-4 cursor-pointer gap-3 default-transition'>
                <img src={ImgAddress} alt='address icon' />
                <span className='text-gray font-graphik'>Durham</span>
              </li>
              <li className='flex justify-center p-4 cursor-pointer gap-3 default-transition'>
                <img src={ImgAddressBlue} alt='address icon' />
                <span className='text-blue-light font-graphik'>
                  Blooming Glen
                </span>
              </li>
              <li className='flex justify-center p-4 cursor-pointer gap-3 default-transition'>
                <img src={ImgAddress} alt='address icon' />
                <span className='text-gray font-graphik'>Durham</span>
              </li>
            </ul>
          </Accordian>
          <div className='block mt-8 md:hidden'>
            <ButtonPrimary>View All Cities Areas</ButtonPrimary>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ServiceAreas
