import { useStaticQuery, graphql } from 'gatsby'

export const useCouponsListQuery = () => {
  const data = useStaticQuery(graphql`
    query CouponsListQuery {
      allWpCoupon {
        nodes {
          title
          _couponPost {
            items {
              text
            }
          }
        }
      }
    }
  `)

  return data.allWpCoupon.nodes
}
