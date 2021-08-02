import { ImgArrow } from '../../images'
import React from 'react'
import Frame from '../utils/frame'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const BlogCard = ({ data }) => (
  <div className='relative cursor-pointer w-80'>
    <div className='relative z-10 flex flex-col mb-6 mr-6 bg-white shadow-lg default-transition hover:shadow-xl'>
      <section className='relative overflow-hidden h-52'>
        <GatsbyImage
          image={getImage(data._heroSection?.heroBgImage?.localFile)}
          alt={data._heroSection?.heroBgImage?.altText}
        />
        <div className='absolute bottom-0 pl-6 pr-5 text-white uppercase border-r-4 -left-1 bg-orange border-orange-dark transform -skew-x-12'>
          <span className='inline-block text-xs font-graphikMedium leading-7 transform skew-x-12'>
            {data.date}
          </span>
        </div>
      </section>
      <section className='flex flex-col items-start pt-5 pb-9 h-52 px-7'>
        <h5 className='mb-2 font-graphikBold line-clamp-2'>{data.title}</h5>
        <div
          className='text-sm text-gray truncate-3'
          dangerouslySetInnerHTML={{ __html: data.excerpt }}
        />
        {/* <p className='text-sm text-gray'>{data.excerpt}</p> */}

        <img src={ImgArrow} alt='arrow' className='mt-auto' />
      </section>
    </div>

    <div className='absolute bottom-2 right-2 -z-10 w-92 h-92'>
      <Frame />
    </div>
  </div>
)

export default BlogCard
