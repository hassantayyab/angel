import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useEffect } from 'react'
import Separator from '../utils/separator'
import { motion, useAnimation } from 'framer-motion'
import {
  defaultTransition,
  fadeIn,
  slideDown,
  springTransition,
  View,
} from '../../animations'
import { useInView } from 'react-intersection-observer'
import Button from '../utils/button'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const Welcome = ({ data, contactFormRef }) => {
  const [ref, inView] = useInView(View)

  const animateTitle = useAnimation()
  const animateContent = useAnimation()
  const animateList = useAnimation()
  const animateItem = useAnimation()

  useEffect(() => {
    if (inView) {
      animateTitle.start({
        ...slideDown.visible,
        ...springTransition,
      })

      animateContent.start({
        ...fadeIn.visible,
        ...defaultTransition,
      })

      animateList.start({
        ...container.visible,
      })

      animateItem.start({
        ...item.visible,
      })
    }
  }, [inView, animateTitle, animateContent, animateList, animateItem])

  return (
    <section className='container px-0 pt-16 xl:px-40 lg:pt-0' ref={ref}>
      <div className='flex flex-col gap-6 lg:gap-12 lg:flex-row'>
        <motion.ul
          className='flex justify-center lg:mb-0 lg:flex-col gap-3 lg:gap-4'
          variants={container}
          initial='hidden'
          animate={animateList}
        >
          {data.welcomeBadges.length > 0 &&
            data.welcomeBadges.map((badge, i) => (
              <motion.li
                className='px-5 py-3 bg-gray-100 rounded-sm lg:px-6 lg:py-4'
                key={i}
                variants={item}
                initial='hidden'
                animate={animateItem}
              >
                <GatsbyImage
                  image={getImage(badge.image?.localFile)}
                  alt={badge.image?.altText}
                  className='w-16'
                />
              </motion.li>
            ))}
        </motion.ul>
        <div className='flex-grow text-center lg:text-left'>
          <motion.h2
            className='uppercase'
            variants={slideDown}
            initial='hidden'
            animate={animateTitle}
          >
            {data.welcomeHeading}
          </motion.h2>
          {/* Separator */}
          <div className='w-40 mx-auto mt-8 mb-4 lg:ml-0'>
            <Separator />
          </div>
          <motion.h6
            className='mt-8 mb-2 tracking-wider uppercase font-graphikBold'
            variants={fadeIn}
            initial='hidden'
            animate={animateContent}
          >
            {data.welcomeSubheading}
          </motion.h6>
          <motion.p
            className='text-sm text-gray'
            variants={fadeIn}
            initial='hidden'
            animate={animateContent}
          >
            {data.welcomeText}
          </motion.p>
          <Button
            className='mt-8 btn btn-primary'
            onClick={() =>
              contactFormRef.current.scrollIntoView({
                block: 'end',
                behavior: 'smooth',
              })
            }
          >
            Schedule Service Now
          </Button>
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment WelcomeFragment on WpPage {
    _welcomeSection {
      welcomeHeading
      welcomeSubheading
      welcomeText
      welcomeBadges {
        image {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                layout: FULL_WIDTH
                placeholder: BLURRED
                formats: [WEBP]
              )
            }
          }
        }
      }
    }
  }
`

export default Welcome
