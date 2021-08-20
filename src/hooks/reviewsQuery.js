import { useStaticQuery, graphql } from 'gatsby'

export const useReviews = () => {
  const data = useStaticQuery(graphql`
    query Reviews {
      wpPage(slug: { eq: "reviews" }) {
        ...SeoPageFragment
        ...HeroPageFragment
      }
    }
  `)

  return data.wpPage
}
