import { useStaticQuery, graphql } from 'gatsby'

export const useHeaderMenuQuery = () => {
  const data = useStaticQuery(graphql`
    {
      allWpMenuItem(
        filter: {
          locations: { eq: GATSBY_HEADER_MENU }
          parentId: { eq: null }
        }
        sort: { fields: order }
      ) {
        nodes {
          id
          label
          path
          childItems {
            nodes {
              id
              label
              path
              childItems {
                nodes {
                  id
                  label
                  path
                }
              }
            }
          }
        }
      }
    }
  `)

  return data.allWpMenuItem.nodes
}
