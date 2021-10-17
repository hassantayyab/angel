import Accordian from '../utils/accordian'
import React from 'react'

const ServiceAreasAccordianSection = ({ data }) => {
  return (
    <>
      {data.areaLocations.length > 0 && (
        <div className='mb-2'>
          <Accordian data={data.areaLocations} />
        </div>
      )}
    </>
  )
}

export default ServiceAreasAccordianSection
