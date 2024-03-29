import { useStaticQuery, graphql } from 'gatsby'

export const useServiceAreasQuery = () => {
  const data = useStaticQuery(graphql`
    query ServiceAreasQuery {
      wpPage(slug: { eq: "home" }) {
        ...SeoPageFragment
        _areasSection {
          areaHeading
          areaLocations {
            title
            places {
              name
              link {
                url
              }
            }
          }
          areaImage {
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
  `)

  return data.wpPage._areasSection
}
