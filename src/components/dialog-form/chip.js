import React from 'react'

const Chip = ({ selected, setValue, children, className }) => {
  return (
    <div
      className={`inline-block hover:bg-orange hover:text-white cursor-pointer default-transition py-2 px-5 border border-orange rounded-full text-xs font-graphikMedium ${className}  ${
        selected ? 'text-white bg-orange' : 'text-orange bg-white'
      }`}
      onClick={setValue}
    >
      {children}
    </div>
  )
}

export default Chip
