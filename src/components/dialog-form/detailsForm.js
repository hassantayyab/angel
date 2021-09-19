import React, { useState } from 'react'
import Accordian from './accordian'
import Chip from './chip'

const Detailsform = ({ step, value, setValue }) => {
  const options = {
    'Heating and Cooling': [
      'No Cooling',
      'No Heat',
      'Water Leak',
      'Other Heating or Cooling Issue',
    ],
    'Ventilation and DuctWork': [
      'Broken Ventilation',
      'Ductwork repair',
      'Other Ventilation and DuctWork Issue',
    ],
  }

  const issueSelection = () => (
    <>
      <h3 className='mb-4 text-black text-opacity-70 font-graphikMedium'>
        Select Your Issue
      </h3>
      {Object.keys(options).map((title, i) => (
        <Accordian key={i}>
          <h5 className='text-blue font-graphik'>{title}</h5>

          {/* Hidden Content */}
          <div className='flex flex-wrap pb-3'>
            {options[title].map((option, i) => (
              <Chip
                className='mb-3 mr-3'
                key={i}
                selected={option === value?.issue}
                value={value}
                setValue={setValue}
              >
                {option}
              </Chip>
            ))}
          </div>
        </Accordian>
      ))}
    </>
  )

  const message = () => (
    <div>
      <h3 className='mb-4 text-left text-black text-opacity-70 font-graphikMedium'>
        Tell Us more about your request
      </h3>
      <textarea
        className='w-full p-3 bg-transparent border border-blue'
        rows='8'
        placeholder='Provide details about your request here'
        value={value.message}
        onChange={(e) => setValue({ ...value, message: e.target.value })}
      ></textarea>
    </div>
  )

  return (
    <div className='h-full pb-4'>
      {step === 2 && issueSelection()}
      {step === 3 && message()}
    </div>
  )
}

export default Detailsform
