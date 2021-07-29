import React from 'react'

const Frame = ({ borderColor = 'border-yellow' }) => (
  <div className={`w-full h-full br-frame ${borderColor}`}></div>
)

export default Frame
