import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

const Confirmation = ({ carImage, value }) => {
  return (
    <>
      <div className='pb-4 bg-blue'>
        {/* Car image */}
        <div className='mx-auto w-80'>
          <GatsbyImage
            image={getImage(carImage?.localFile)}
            alt={carImage?.altText}
          />
        </div>
      </div>
      <div className='pt-8 pb-3'>
        <h6 className='mb-3 uppercase text-black-light font-graphikMedium'>
          Thank you for choosing angel heating & cooling
        </h6>
        <div className='text-sm text-black-light font-graphikMedium'>
          Request Details:
          <div className='text-black text-opacity-60 font-graphik leading-6'>
            {`${value.details.personalInfo.firstName} ${value.details.personalInfo.lastName}`}
            <br />
            {value.request}
            <br />
            {value.details.issue}
            <br />
            {value.schedule.date.toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            <br />
            {value.schedule.timeSlot}
            <br />
            {`${value.details.addressInfo.street}, ${value.details.addressInfo.suite}, ${value.details.addressInfo.zipCode}, ${value.details.addressInfo.city}, ${value.details.addressInfo.state}`}
            <br />
            {value.details.personalInfo.mobile}
            <br />
            {value.details.personalInfo.email}
          </div>
        </div>
      </div>
    </>
  )
}

export default Confirmation
