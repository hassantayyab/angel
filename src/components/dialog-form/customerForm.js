import React from 'react'
import Chip from './chip'

const CustomerForm = ({ value, setValue }) => (
  <div className='flex flex-col items-center justify-center h-full'>
    <h3 className='text-black-light font-graphikMedium'>
      Have We Served You in the Past?
    </h3>

    <div className='py-16 space-x-8'>
      <Chip
        className='px-7'
        selected={value === false}
        value={value}
        setValue={() => setValue(false)}
      >
        Yes
      </Chip>
      <Chip
        className='px-7'
        selected={value === true}
        value={value}
        setValue={() => setValue(true)}
      >
        No
      </Chip>
    </div>
  </div>
)

export default CustomerForm
