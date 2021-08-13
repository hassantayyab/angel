import React from 'react'
import { motion } from 'framer-motion'
import { slideDown } from '../../animations'

const Title = ({ children, ...props }) => {
  return (
    <motion.h2 {...props} variants={slideDown} initial='hidden'>
      {children}
    </motion.h2>
  )
}

export default Title
