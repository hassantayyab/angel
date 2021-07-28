import { graphql } from 'gatsby'

export const query = graphql`
  fragment SeoPageFragment on WpPage {
    seo {
      title
      opengraphDescription
      opengraphSiteName
      opengraphType
      opengraphImage {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1200)
          }
        }
      }
      metaKeywords
      canonical
      twitterTitle
      twitterDescription
      twitterImage {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1200)
          }
        }
      }
    }
  }
`
