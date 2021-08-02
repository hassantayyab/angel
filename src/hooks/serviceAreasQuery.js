import { useStaticQuery, graphql } from 'gatsby'

export const useServiceAreasQuery = () => {
  const data = useStaticQuery(graphql`
    query ServiceAreasQuery {
      wpPage(slug: { eq: "home" }) {
        _areasSection {
          areaHeading
          areaLocations {
            title
            places {
              name
            }
          }
        }
      }
    }
  `)

  return data.wpPage._areasSection
}
