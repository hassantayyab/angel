import { useStaticQuery, graphql } from 'gatsby'

export const useGeneralSchemaQuery = () =>{
    const { wp, site } = useStaticQuery(
        graphql`
        query GeneralSchemaQuery {
            wp {
              nexvelSchemaMarkup {
                nexvelschema {
                  businessType
                  businessName
                  logo {
                    localFile {
                      publicURL
                    }
                  }
                  image {
                    localFile {
                      publicURL
                    }
                  }
                  describeYourBusiness
                  phoneNumber
                  streetAddress
                  city
                  state
                  zipCode
                  hoursOfOperation {
                    monday {
                      areYouOpen
                      open {
                        openHour
                        openMinute
                        amorpm
                      }
                      close {
                        closeHour
                        closeMinute
                        amorpm
                      }
                    }
                    tuesday {
                      areYouOpen
                      open {
                        openHour
                        openMinute
                        amorpm
                      }
                      close {
                        closeHour
                        closeMinute
                        amorpm
                      }
                    }
                    wednesday {
                      areYouOpen
                      open {
                        openHour
                        openMinute
                        amorpm
                      }
                      close {
                        closeHour
                        closeMinute
                        amorpm
                      }
                    }
                    thursday {
                      areYouOpen
                      open {
                        openHour
                        openMinute
                        amorpm
                      }
                      close {
                        closeHour
                        closeMinute
                        amorpm
                      }
                    }
                    friday {
                      areYouOpen
                      open {
                        openHour
                        openMinute
                        amorpm
                      }
                      close {
                        closeHour
                        closeMinute
                        amorpm
                      }
                    }
                    saturday {
                      areYouOpen
                      open {
                        openHour
                        openMinute
                        amorpm
                      }
                      close {
                        closeHour
                        closeMinute
                        amorpm
                      }
                    }
                    sunday {
                      areYouOpen
                      open {
                        openHour
                        openMinute
                        amorpm
                      }
                      close {
                        closeHour
                        closeMinute
                        amorpm
                      }
                    }
                  }
                  services {
                    service
                    linkToRelevantPageOnYourWebsite
                  }
                  cities {
                    city
                  }
                }
              }
            }
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
          
        `
    ); return {wp, site}
}