const slideUp = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

const slideDown = {
  hidden: { y: -10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

const slideLeft = {
  hidden: { x: -400 },
  visible: { x: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const scale = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
}

const hoverScale = {
  scale: 1.01,
  originX: 0,
  transition: { type: 'spring' },
}

const staggerList = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const staggerItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export {
  slideUp,
  slideDown,
  slideLeft,
  fadeIn,
  scale,
  hoverScale,
  staggerList,
  staggerItem,
}
