import React from 'react'

const SectionHeader = ({ heading, subheading, color }) => (
  <div className={`text-center uppercase ${color}`}>
    <h5 className='mb-2 tracking-wider font-graphikMedium'>{subheading}</h5>
    <h2>{heading}</h2>
  </div>
)

export default SectionHeader
