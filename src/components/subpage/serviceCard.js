import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { ImgChevron } from '../../images'
import Accordian from '../utils/accordian'

const ServiceAccordianCard = ({ data, servicesData }) => {
  return (
    <Accordian btnIcon={ImgChevron}>
      <Link className='text-white uppercase font-graphikMedium' to={data.path}>
        {data.label}
      </Link>
      <ul>
        {data.childItems.nodes.length > 0 &&
          data.childItems.nodes.map((item, i) => (
            <li
              className={`flex items-center px-6 py-2 border-gray-200 ${
                i > 0 && 'border-t'
              }`}
              key={i}
            >
              {servicesData[i] && (
                <GatsbyImage
                  image={getImage(
                    servicesData[i]._servicePost.serviceImage?.localFile
                  )}
                  alt={servicesData[i]._servicePost.serviceImage?.altText}
                  className='w-8 mr-6'
                />
              )}
              <Link className='font-graphikMedium' to={item.path}>
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </Accordian>
  )
}

export default ServiceAccordianCard
