import { useStaticQuery, graphql } from 'gatsby'

export const useServicesQuery = () => {
  const data = useStaticQuery(graphql`
    query ServicesQuery {
      allWpService {
        nodes {
          title
          serviceCategories {
            nodes {
              name
            }
          }
          _servicePost {
            serviceText
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
            serviceBgImage {
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
  return serviceData.reduce((obj, item) => {
    const { serviceCategories, ...data } = item
    const key = serviceCategories.nodes[0].name

    if (obj && obj.hasOwnProperty(key)) {
      return { ...obj, [key]: [...obj[key], data] }
    } else {
      return { ...obj, [key]: [data] }
    }
  }, {})
}
