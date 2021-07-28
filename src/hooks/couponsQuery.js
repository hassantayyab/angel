import { useStaticQuery, graphql } from 'gatsby'

export const useCouponsQuery = () => {
  const data = useStaticQuery(graphql`
    query CouponsQuery {
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
