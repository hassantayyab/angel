import {
  defaultTransition,
  fadeIn,
  slideDown,
  slideUp,
  View,
} from '../../animations'
import { motion, useAnimation } from 'framer-motion'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import BackgroundImage from '../utils/backgroundImage'
import Button from '../utils/button'
import Container from '../utils/container'
import Subtitle from '../utils/subititle'
import Title from '../utils/title'
import scrollTo from 'gatsby-plugin-smoothscroll'

const IndustryLeading = ({ data, carImage, contactFormRef }) => {
  const [ref, inView] = useInView(View)
  const animateTitle = useAnimation()
  const animateSubtitle = useAnimation()
  const animateContent = useAnimation()
  useEffect(() => {
    if (inView) {
      animateTitle.start({
        ...slideDown.visible,
        ...defaultTransition,
      })

      animateSubtitle.start({
        ...slideUp.visible,
        ...defaultTransition,
      })

      animateContent.start({
        ...fadeIn.visible,
        ...defaultTransition,
      })
    }
  }, [inView, animateTitle, animateSubtitle, animateContent])

  return (
    <section className='relative py-12 md:py-20 xl:pb-20 xl:pt-36' ref={ref}>
      <BackgroundImage
        image={getImage(data.industryLeadingBgImage?.localFile)}
        alt={data.industryLeadingBgImage?.altText}
      />
      <div
        className='absolute inset-0'
        // style={{
        //   background:
        //     'linear-gradient(180deg, rgba(254,199,36,0.9) 0%, rgba(254,199,36,0.9) 100%)',
        // }}
      ></div>
      <Container>
        <div className='relative z-10 flex flex-col text-center lg:text-left lg:flex-row'>
          <div className='px-0 text-black sm:w-3/5 lg:w-1/2 xl:px-20 lg:pr-20'>
            <Subtitle
              className='mb-2 tracking-wider uppercase font-graphikBold'
              animate={animateSubtitle}
            >
              {data.industryLeadingSubheading}
            </Subtitle>
            <Title className='uppercase' animate={animateTitle}>
              {data.industryLeadingHeading}
            </Title>
            <motion.p
              className='mt-4 text-sm mb-7'
              variants={fadeIn}
              initial='hidden'
              animate={animateContent}
            >
              <div
                id='industry-leading'
                dangerouslySetInnerHTML={{ __html: data.industryLeadingText }}
              />
            </motion.p>

            <Button
              className='btn btn-secondary bg-blue hover:bg-blue-light'
              onClick={() => scrollTo(contactFormRef, 'end')}
            >
              Request Service Today
            </Button>
          </div>
          <div className='w-full mx-auto mt-16 2xl:-mr-12 lg:4/5 lg:w-1/2 lg:ml-auto lg:mt-16'>
            <GatsbyImage
              image={getImage(carImage?.localFile)}
              alt={carImage?.altText}
              className=''
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment InudstryLeadingFragment on WpPage {
    _industryLeading {
      industryLeadingHeading
      industryLeadingSubheading
      industryLeadingText
      industryLeadingBgImage {
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
`

export default IndustryLeading
