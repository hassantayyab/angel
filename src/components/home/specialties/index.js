import { graphql } from 'gatsby'
import React from 'react'
import SpecialtiesDesktop from './specialtiesDesktop'
import SpecialtiesMobile from './specialtiesMobile'

const Specialties = ({ data, logo }) => {
  return (
    <>
      <div className='hidden lg:block'>
        <SpecialtiesDesktop data={data} logo={logo} />
      </div>

      <div className='lg:hidden'>
        <SpecialtiesMobile data={data} />
      </div>
    </>
  )
}

export const query = graphql`
  fragment SpecialtiesFragment on WpPage {
    _specialtiesSection {
      specialtiesHeading
      specialtiesBgImage {
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
      specialtiesItems {
        title
        description
        titleIcon {
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

export default Specialties
