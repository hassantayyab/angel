import { useStaticQuery, graphql } from 'gatsby'

export const useReasonsQuery = () => {
  const data = useStaticQuery(graphql`
    query ReasonsQuery {
      allWpReason {
        nodes {
          title
          _reasonPost {
            reasonText
            reasonImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 100
                    placeholder: BLURRED
                    formats: [WEBP]
                  )
                }
              }
            }
          }
          reasonCategories {
            nodes {
              slug
            }
          }
        }
      }
    }
  `)

  return data.allWpReason.nodes
}
