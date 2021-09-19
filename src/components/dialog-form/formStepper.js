import React from 'react'

const FormStepper = ({ steps, stepNumber = 1 }) => {
  return (
    <div className='flex items-center justify-center ml-2 sm:ml-4'>
      {steps.length > 0 &&
        steps.slice(0, -1).map((s, i) => (
          <div key={i} className='flex flex-col items-start justify-start'>
            <div className='flex items-center justify-center'>
              {/* circle */}
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${
                  stepNumber === i + 1 ? 'bg-yellow' : 'bg-white'
                }`}
              />
              {/* line */}
              <div
                className={`w-12 sm:w-20 h-0.5 sm:h-1 ${
                  stepNumber === i + 1 ? 'bg-yellow' : 'bg-white'
                }`}
              />
            </div>
            <small
              className={`mt-1 uppercase ${i === 0 ? 'ml-0' : '-ml-4'} ${
                stepNumber === i + 1 ? 'text-yellow' : 'text-white'
              }`}
            >
              {s}
            </small>
          </div>
        ))}

      <div className='flex flex-col'>
        <div
          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${
            stepNumber === steps.length ? 'bg-yellow' : 'bg-white'
          }`}
        />
        <small
          className={`mt-1 -ml-4 uppercase ${
            stepNumber === steps.length ? 'text-yellow' : 'text-white'
          }`}
        >
          {steps.slice(-1)[0]}
        </small>
      </div>
    </div>
  )
}

export default FormStepper
