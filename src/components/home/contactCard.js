import { graphql } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import React, { useEffect } from 'react'
import BackgroundImage from '../utils/backgroundImage'
import Button from '../utils/button'
import Container from '../utils/container'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { defaultTransition, slideDown, slideUp, View } from '../../animations'
import Subtitle from '../utils/subititle'
import Title from '../utils/title'

const ContactCard = ({ data, contactFormRef }) => {
  const [ref, inView] = useInView(View)

  const animateTitle = useAnimation()
  const animateSubtitle = useAnimation()
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
    }
  }, [inView, animateTitle, animateSubtitle])
  return (
    <section className='relative py-8 md:py-20 lg:px-12 xl:px-52' ref={ref}>
      <BackgroundImage
        image={getImage(data.cardContactBg?.localFile)}
        alt={getImage(data.cardContactBg?.altText)}
      />
      <div
        className='absolute inset-0 w-full h-full'
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) 100%)',
        }}
      ></div>
      <Container>
        <div className='relative flex flex-col md:flex-row'>
          <div className='px-4 pt-8 pb-10 mx-4 -mb-2 uppercase md:mb-8 md:px-12 md:py-20 md:w-3/4 br-frame border-yellow md:mx-0'>
            <div className='text-center md:w-3/5 md:text-left'>
              <Subtitle
                className='mb-2 text-yellow font-graphik'
                animate={animateSubtitle}
              >
                Reason To
              </Subtitle>
              <Title animate={animateTitle}>{data.cardContactHeading}</Title>
              <Button
                className='mt-8 btn btn-secondary'
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
          <div className='bottom-0 right-0 overflow-hidden md:w-1/2 md:absolute h-92 md:mt-0'>
            <GatsbyImage
              image={getImage(data.cardContactImage?.localFile)}
              alt={data.cardContactImage?.altText}
              className='h-full'
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment CardContactFragment on WpPage {
    _cardContact {
      cardContactHeading
      cardContactBg {
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
      cardContactImage {
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

export default ContactCard
