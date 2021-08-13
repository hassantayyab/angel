import React from 'react'
import { motion } from 'framer-motion'
import { hoverScale, scale } from '../../animations'

const Button = ({ children, ...props }) => {
  return (
    <motion.button {...props} variants={scale} whileHover={hoverScale}>
      {children}
    </motion.button>
  )
}

export default Button
