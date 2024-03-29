import { ImageVideoBg, ImgPlayArrow } from '../../images'
import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Container from '../utils/container'
import Separator from '../utils/separator'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Frame from '../utils/frame'
import PlayButton from '../utils/playButton'
import VideoDialog from './videoDialog'
import Button from '../utils/button'
import { useInView } from 'react-intersection-observer'
import {
  defaultTransition,
  fadeIn,
  scale,
  springTransition,
  View,
} from '../../animations'
import { useAnimation } from 'framer-motion'
import Subtitle from '../utils/subititle'
import Title from '../utils/title'
import FormDialog from '../dialog-form/formDialog'

const Video = ({ data, contactNumber, carImage, logo }) => {
  let [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  let [isFormModalOpen, setIsFormModalOpen] = useState(false)
  let [type, setType] = useState(null)

  const openFormDialog = (v) => {
    setType(v)
    setIsFormModalOpen(true)
  }

  const [ref, inView] = useInView(View)
  const animateTitle = useAnimation()
  const animateSubtitle = useAnimation()
  useEffect(() => {
    if (inView) {
      animateTitle.start({
        ...scale.visible,
        ...springTransition,
      })

      animateSubtitle.start({
        ...fadeIn.visible,
        ...defaultTransition,
      })
    }
  }, [inView, animateTitle, animateSubtitle])

  return (
    <section className='relative height-30 lg:h-96' ref={ref}>
      <div className='absolute inset-0 z-10 w-full h-full'>
        <img
          width='auto'
          height='auto'
          src={ImageVideoBg}
          alt='video section background'
          className='object-cover w-full h-full'
        />
      </div>
      <div className='absolute inset-0 z-20 h-full'>
        <div className='flex flex-col justify-center lg:h-full'>
          <Container>
            <div className='h-full py-12 text-white lg:py-20'>
              <div className='flex flex-col items-center justify-between lg:flex-row space-y-10 sm:space-y-8 lg:space-x-20'>
                <div className='flex-1 text-center uppercase lg:text-left'>
                  <Title animate={animateTitle}>{data.videoHeading}</Title>
                  {/* Separator */}
                  <div className='w-40 mx-auto my-6 lg:ml-0'>
                    <Separator color='white' />
                  </div>
                  <Subtitle
                    className='my-8 tracking-wider font-graphikBold'
                    animate={animateSubtitle}
                  >
                    {data.videoSubheading}
                  </Subtitle>
                  <div className='flex flex-col items-center justify-center sm:flex-row flex-nowrap space-y-4 sm:space-x-4 sm:space-y-0 lg:justify-start'>
                    <Button
                      type='button'
                      className='px-0 w-60 md:w-64 btn btn-primary'
                      onClick={() => openFormDialog('service')}
                    >
                      Same Day Services
                    </Button>
                    <Button
                      type='button'
                      className='w-60 md:w-64 btn btn-secondary'
                      onClick={() => openFormDialog('estimate')}
                    >
                      Virtual Estimate
                    </Button>
                  </div>
                </div>

                <div className='w-full lg:flex-1 xs:w-4/5 md:w-3/5'>
                  <div className='relative -mb-28'>
                    <div className='relative'>
                      <div className='relative w-full lg:w-11/12'>
                        <GatsbyImage
                          image={getImage(data.videoImage?.localFile)}
                          alt={data.videoImage?.altText}
                          className='relative z-20 object-fill w-full h-full'
                        />
                        <div
                          className='absolute bottom-0 left-0 right-0 z-30 w-full h-1/3'
                          style={{
                            background:
                              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.40) 40%, rgba(0,0,0,0.75) 100%)',
                          }}
                        ></div>
                      </div>
                      <div
                        className='z-40 absolute-center'
                        onClick={() => setIsVideoModalOpen(true)}
                      >
                        <PlayButton />
                      </div>
                      <img
                        width='auto'
                        height='auto'
                        src={ImgPlayArrow}
                        alt='pointer'
                        className='z-30 pt-16 pr-40 absolute-center'
                      />
                      <h1 className='z-30 w-full text-center absolute-x-center bottom-6 sm:bottom-10 lg:bottom-16 font-perfetto'>
                        Watch our video
                      </h1>
                    </div>
                    <div className='absolute top-0 z-10 -right-2 sm:-right-4 lg:right-6 bottom-6 left-6'>
                      <Frame />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* VideoDialog */}
      <VideoDialog
        isOpen={isVideoModalOpen}
        setIsOpen={setIsVideoModalOpen}
        videoUrl={data.videoEmbed}
      />

      {/* VideoDialog */}
      <FormDialog
        contactNumber={contactNumber}
        type={type}
        isOpen={isFormModalOpen}
        setIsOpen={setIsFormModalOpen}
        logo={logo}
        carImage={carImage}
      />
    </section>
  )
}

export const query = graphql`
  fragment VideoFragment on WpPage {
    _videoSection {
      videoHeading
      videoSubheading
      videoEmbed
      videoImage {
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

export default Video
