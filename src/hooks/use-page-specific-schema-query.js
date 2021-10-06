import { useStaticQuery, graphql } from 'gatsby'

export const usePageSpecificSchemaQuery = () =>{
    const { wp } = useStaticQuery(
        graphql`
        query PageSpecificSchemaQuery {
            wp {
                nexvelSchemaMarkup {
                  nexvelschema {
                    blogPageUrl
                    businessName
                    aboutPageUrl
                    contactPageUrl
                    businessType
                    logo {
                      localFile {
                        publicURL
                      }
                    }
                  }
                }
              }
          }
          
        `
    ); return wp
}