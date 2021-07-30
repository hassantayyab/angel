import { graphql } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import BackgroundImage from '../utils/backgroundImage'
import Layout from '../utils/layout'

const CardContact = ({ data }) => (
  <section className='relative py-8 md:py-20 lg:px-12 xl:px-52'>
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
    <Layout>
      <div className='relative flex flex-col md:flex-row'>
        <div className='px-4 pt-8 pb-10 mx-4 -mb-2 uppercase md:mb-4 md:px-12 md:py-20 md:w-3/4 br-frame border-yellow md:mx-0'>
          <div className='text-center md:w-3/5 md:text-left'>
            <h6 className='mb-2 text-yellow font-graphik'>Reason To</h6>
            <h2>{data.cardContactHeading}</h2>
            <button className='mt-8 btn btn-secondary'>
              Schedule Service Now
            </button>
          </div>
        </div>
        <div className='right-0 md:w-1/2 md:absolute top-7 md:mt-0'>
          <GatsbyImage
            image={getImage(data.cardContactImage?.localFile)}
            alt={data.cardContactImage?.altText}
            className='relative z-20 object-fill w-full h-full'
          />
        </div>
      </div>
    </Layout>
  </section>
)

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

export default CardContact
