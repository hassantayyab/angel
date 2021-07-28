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
              name
            }
          }
        }
      }
    }
  `)

  return formatData(data.allWpReason.nodes)
}

function formatData(data) {
  return data.reduce((obj, item) => {
    const { reasonCategories, ...data } = item
    const key = reasonCategories.nodes[0].name

    if (obj && obj.hasOwnProperty(key)) {
      return { ...obj, [key]: [...obj[key], data] }
    } else {
      return { ...obj, [key]: [data] }
    }
  }, {})
}
