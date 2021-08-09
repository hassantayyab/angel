import { useStaticQuery, graphql } from 'gatsby'

export const useMenuDropdownImageQuery = () => {
  const data = useStaticQuery(graphql`
    {
      wpMenuItem(locations: { eq: GATSBY_HEADER_MENU }) {
        menu {
          node {
            menuDropdownImage {
              images {
                image {
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
        }
      }
    }
  `)

  return data.wpMenuItem.menu.node.menuDropdownImage.images
}
