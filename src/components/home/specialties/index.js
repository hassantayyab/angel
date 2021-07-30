import React from 'react'
import SpecialtiesDesktop from './specialtiesDesktop'
import SpecialtiesMobile from './specialtiesMobile'

const Specialties = ({ data }) => {
  return (
    <>
      <div className='hidden lg:block'>
        <SpecialtiesDesktop data={data} />
      </div>

      <div className='lg:hidden'>
        <SpecialtiesMobile data={data} />
      </div>
    </>
  )
}

export default Specialties
