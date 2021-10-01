import { useStaticQuery, graphql } from 'gatsby'

export const useContactQuery = () => {
  const data = useStaticQuery(graphql`
    query ContactQuery {
      wpPage(slug: { eq: "home" }) {
        ...SeoPageFragment
        _form {
          formHeading
          formImage {
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
          formBgImage {
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
    }
  `)

  return data.wpPage._form
}
