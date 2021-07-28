import { graphql } from 'gatsby'

// use title/subtitle for the hero section and heading/subheading for the rest
export const query = graphql`
  fragment HeroPageFragment on WpPage {
    _heroSection {
      heroTitle
      heroSubtitle
      heroBgImage {
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
