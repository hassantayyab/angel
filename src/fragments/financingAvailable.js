import { graphql } from 'gatsby'

export const query = graphql`
  fragment FinancingFragment on WpPage {
    _financing {
      financingHeading
      financingSubheading
      financingBgImage {
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
