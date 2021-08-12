import React from 'react'
import { motion } from 'framer-motion'
import { slideUp } from '../../animations'

const Subtitle = ({ children, ...props }) => {
  return (
    <motion.h5 {...props} variants={slideUp} initial='hidden'>
      {children}
    </motion.h5>
  )
}

export default Subtitle
