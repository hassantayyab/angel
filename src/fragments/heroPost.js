import { graphql } from 'gatsby'

export const query = graphql`
  fragment HeroPostFragment on WpPost {
    _heroSection {
      title
      subtitle
      backgroundImage {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`
