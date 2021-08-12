const defaultTransition = {
  transition: { delay: 0.1, duration: 1, ease: 'easeInOut' },
}

const carTransition = {
  transition: { delay: 0.1, duration: 1, ease: 'easeOut' },
}

const springTransition = {
  transition: { delay: 0.1, duration: 1.5, type: 'spring', bounce: 0.3 },
}

const staggerTransition = {
  transition: { delayChildren: 0.5, staggerChildren: 0.3 },
}

export { defaultTransition, carTransition, springTransition, staggerTransition }
