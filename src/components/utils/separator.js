import React from 'react'

const Separator = ({ color = 'blue' }) => {
  return (
    <div className='relative mt-1.5'>
      <div className={`h-1 bg-${color}`}></div>
      <div
        className={`absolute p-3 rounded-full absolute-y-center bg-${color}`}
      ></div>
    </div>
  )
}

export default Separator
