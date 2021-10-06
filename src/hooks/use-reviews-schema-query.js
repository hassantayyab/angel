import { useStaticQuery, graphql } from 'gatsby'

export const useReviewsSchemaQuery = () => {
    
const { wp, site, query1, forRatingValuePart1, forRatingValuePart2 } = useStaticQuery(
    graphql`
    query ReviewsSchemaQuery {
      wp {
        nexvelSchemaMarkup {
          nexvelschema {
            whichPages {
              ... on WpPage {
                title
              }
              ... on WpPost {
                title
              }
            }
            businessName
          }
        }
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
      query1: allBirdeyedata(
        filter: {id: {ne: "dummy"}, sourceType: {nin: ["Direct Feedback", "Facebook"]}}
      ) {
         nodes {
           id
           sourceType
           reviewDate
           rating
           reviewer {
             firstName
             lastName
           }
           comments
           businessName
         }
       }
       forRatingValuePart1: allBirdeyedata(
        filter: {id: {ne: "dummy"}, sourceType: {ne: "Direct Feedback"}}
      ) {
        nodes {
          rating
        }
      }
      forRatingValuePart2: allBirdeyedata(
        filter: {id: {ne: "dummy"}, rating: {ne: 0}}
      ) {
        nodes {
          rating
        }
      }
    }
  `
);
return {wp, site, query1, forRatingValuePart1, forRatingValuePart2};
}