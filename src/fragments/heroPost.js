import { graphql } from 'gatsby'

export const query = graphql`
  fragment HeroPostFragment on WpPost {
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
