import { useStaticQuery, graphql } from 'gatsby'

export const useCoupons = () => {
  const data = useStaticQuery(graphql`
    query Coupons {
      wpPage(slug: { eq: "deals" }) {
        ...SeoPageFragment
        ...HeroPageFragment
      }
    }
  `)

  return data.wpPage
}
