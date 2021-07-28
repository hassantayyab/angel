import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { ImgChevron } from '../../images'
import Accordian from '../utils/accordian'

const ServiceAccordianCard = ({ data, heading }) => (
  <Accordian btnIcon={ImgChevron}>
    <span className='text-white uppercase font-graphikMedium'>{heading}</span>
    {data.length > 0 &&
      data.map((content, i) => (
        <ul key={i}>
          <li
            className={`flex items-center px-6 py-2 border-gray-200 ${
              i > 0 && 'border-t'
            }`}
          >
            <GatsbyImage
              image={getImage(content._servicePost.serviceImage?.localFile)}
              alt={content._servicePost.serviceImage?.altText}
              className='w-8 mr-6'
            />
            <span className='font-graphikMedium'>{content.title}</span>
          </li>
        </ul>
      ))}
  </Accordian>
)

export default ServiceAccordianCard
