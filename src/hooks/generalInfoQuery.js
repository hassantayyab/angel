import { useStaticQuery, graphql } from 'gatsby'

export const useGeneralInfoQuery = () => {
  const data = useStaticQuery(graphql`
    query GeneralDataQuery {
      wp {
        generalInfo {
          _cardCall {
            cardCallSubheading
            cardCallHeading
            cardCallBgImage {
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
          _generalData {
            address
            email
            topInfoText
            websiteName
            infoLink {
              url
            }
            imagePlaceholder {
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
            contactNumbers {
              number
              location
            }
            socialLinks {
              url
              image {
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
            carImage {
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
            footerImages {
              link
              image {
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
            logo {
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
            socialLinks {
              image {
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
          _guaranteeCard {
            guaranteeHeading
            guaranteeBg {
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
            guaranteeImage {
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

  return data.wp.generalInfo
}
