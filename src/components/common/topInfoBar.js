import { ImgInfo } from '../../images'
import React from 'react'
import Container from '../utils/container'

const TopInfoBar = ({ data }) => (
  <section className='relative z-50 md:mb-32 lg:mb-40 xl:mb-36 bg-blue-light sm:mb-1'>
    <Container>
      <div className='flex items-center justify-center py-3 text-white uppercase'>
        <img
          width='auto'
          height='auto'
          src={ImgInfo}
          alt='information icon'
          className='w-4 md:w-6'
        ></img>
        <span className='ml-2 mr-1 text-xs md:ml-3 md:text-sm'>
          {data.topInfoText}
        </span>
        <a
          href={data.infoLink}
          target='_blank'
          rel='noreferrer'
          className='text-xs cursor-pointer text-yellow md:text-sm'
        >
          Click here...
        </a>
      </div>
    </Container>
  </section>
)

export default TopInfoBar
