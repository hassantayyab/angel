import { useStaticQuery, graphql } from 'gatsby'

export const useServicesQuery = () => {
  const data = useStaticQuery(graphql`
    query ServicesQuery {
      allWpService {
        nodes {
          title
          serviceCategories {
            nodes {
              slug
              name
            }
          }
          _servicePost {
            servicePageLink {
              url
            }
            serviceImage {
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
        }
      }
    }
  `)

  return formatData(data.allWpService.nodes)
}

function formatData(serviceData) {
  const unOrdered = serviceData.reduce((obj, item) => {
    const { serviceCategories, ...data } = item
    const key = serviceCategories.nodes[0].slug.replace('_', '-')

    if (obj && obj.hasOwnProperty(key)) {
      return { ...obj, [key]: [...obj[key], data] }
    } else {
      return { ...obj, [key]: [data] }
    }
  }, {})

  return Object.keys(unOrdered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unOrdered[key]
      return obj
    }, {})
}
