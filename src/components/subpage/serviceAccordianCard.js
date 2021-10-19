import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { ImgChevron } from '../../images'
import Accordian from './accordian'

const ServiceAccordianCard = ({ category, servicesData }) => {
  return (
    <Accordian btnIcon={ImgChevron} defaultOpen={true}>
      <Link
        className='text-white uppercase font-graphikMedium'
        to={category.serviceCategoryLink}
      >
        {category.name}
      </Link>
      <ul>
        {servicesData.length > 0 &&
          servicesData.map((service, i) => (
            <li
              className={`flex items-center px-6 py-2 border-gray-200 ${
                i > 0 && 'border-t'
              }`}
              key={i}
            >
              {service && (
                <GatsbyImage
                  image={getImage(service._servicePost.serviceImage?.localFile)}
                  alt={service._servicePost.serviceImage?.altText}
                  className='w-8 mr-6'
                />
              )}
              <Link
                className='font-graphikMedium'
                to={service._servicePost.servicePageLink.url}
              >
                {service.title}
              </Link>
            </li>
          ))}
      </ul>
    </Accordian>
  )
}

export default ServiceAccordianCard
