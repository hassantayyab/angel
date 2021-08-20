import { useStaticQuery, graphql } from 'gatsby'

export const useReviewsListQuery = () => {
  const data = useStaticQuery(graphql`
    query ReviewsListQuery {
      allWpCustomerReview {
        nodes {
          title
          _reviewPost {
            rating
            text
          }
        }
      }
    }
  `)

  return data.allWpCustomerReview.nodes
}
