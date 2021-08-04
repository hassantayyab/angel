import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import Separator from '../utils/separator'

const Welcome = ({ data, contactFormRef }) => (
  <section className='container px-0 pt-16 xl:px-40 lg:pt-0'>
    <div className='flex flex-col gap-6 lg:gap-12 lg:flex-row'>
      <div className='flex justify-center lg:mb-0 lg:flex-col gap-3 lg:gap-4'>
        {data.welcomeBadges.length > 0 &&
          data.welcomeBadges.map((badge, i) => (
            <div
              className='px-5 py-3 bg-gray-100 rounded-sm lg:px-6 lg:py-4'
              key={i}
            >
              <GatsbyImage
                image={getImage(badge.image?.localFile)}
                alt={badge.image?.altText}
                className='w-16'
              />
            </div>
          ))}
      </div>
      <div className='flex-grow text-center lg:text-left'>
        <h2 className='uppercase'>{data.welcomeHeading}</h2>
        {/* Separator */}
        <div className='w-40 mx-auto mt-8 mb-4 lg:ml-0'>
          <Separator />
        </div>
        <h6 className='mt-8 mb-2 tracking-wider uppercase font-graphikBold'>
          {data.welcomeSubheading}
        </h6>
        <p className='text-sm text-gray'>{data.welcomeText}</p>
        <button
          className='mt-8 btn btn-primary'
          onClick={() =>
            contactFormRef.current.scrollIntoView({
              block: 'end',
              behavior: 'smooth',
            })
          }
        >
          Schedule Service Now
        </button>
      </div>
    </div>
  </section>
)

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
