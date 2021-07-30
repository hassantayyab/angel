import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import BackgroundImage from '../utils/backgroundImage'
import Layout from '../utils/layout'

const IndustryLeading = ({ data, carImage }) => {
  return (
    <section className='relative py-12 md:py-20 xl:pb-20 xl:pt-36'>
      <BackgroundImage
        image={getImage(data.industryLeadingBgImage?.localFile)}
        alt={data.industryLeadingBgImage?.altText}
        loading='lazy'
      />
      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(180deg, rgba(254,199,36,0.9) 0%, rgba(254,199,36,0.9) 100%)',
        }}
      ></div>
      <Layout>
        <div className='relative z-10 flex flex-col items-center text-center lg:text-left lg:flex-row'>
          <div className='px-0 text-black sm:w-3/5 lg:w-1/2 xl:px-20 lg:pr-20'>
            <h5 className='mb-2 tracking-wider uppercase font-graphikBold'>
              {data.industryLeadingSubheading}
            </h5>
            <h2 className='uppercase'>{data.industryLeadingHeading}</h2>
            <p className='mt-4 text-sm mb-7'>{data.industryLeadingText}</p>

            <button className='btn btn-secondary bg-blue hover:bg-blue-light'>
              Request Service Today
            </button>
          </div>
          <div className='w-full mx-auto mt-16 2xl:-mr-12 lg:4/5 lg:w-1/2 lg:ml-auto lg:mt-0'>
            <GatsbyImage
              image={getImage(carImage?.localFile)}
              alt={carImage?.altText}
              className=''
            />
          </div>
        </div>
      </Layout>
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
