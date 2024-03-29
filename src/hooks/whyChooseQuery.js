import { useStaticQuery, graphql } from 'gatsby'

export const useWhyChooseQuery = () => {
  const data = useStaticQuery(graphql`
    query WhyChooseQuery {
      wpPage(slug: { eq: "home" }) {
        ...SeoPageFragment
        _whyChoose {
          whyChooseHeading
          whyChooseBgImage {
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

  return data.wpPage._whyChoose
}
