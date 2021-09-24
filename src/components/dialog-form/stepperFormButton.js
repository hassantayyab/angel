import React from 'react'
import { motion } from 'framer-motion'
import { hoverScale, scale } from '../../animations'
import { ImgArrowForm } from '../../images'

const StepperFormButton = ({
  children,
  step,
  nextStep,
  isDisabled = false,
}) => {
  return (
    <motion.div
      className='flex items-center cursor-pointer default-transition'
      variants={scale}
      whileHover={!isDisabled && hoverScale}
      onClick={!isDisabled ? nextStep : () => {}}
    >
      <button
        type='button'
        className={`flex flex-col items-center justify-center px-0 mr-3 border border-black rounded-full w-14 h-14 ${
          isDisabled && 'border-opacity-40'
        }`}
        disabled={isDisabled}
      >
        {step === 5 ? (
          <div className='text-5xl text-blue'>&times;</div>
        ) : (
          <img
            src={ImgArrowForm}
            className={`w-7 filter ${isDisabled && 'contrast-0'}`}
            alt='arrow'
          />
        )}
      </button>
      <div
        className={`text-sm text-black uppercase font-graphikMedium ${
          isDisabled && 'text-opacity-40'
        }`}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default StepperFormButton
