import { useStaticQuery, graphql } from 'gatsby'

export const useReasonCategoriesQuery = () => {
  const data = useStaticQuery(graphql`
    query ReasonCategoriesQuery {
      allWpReasonCategory {
        nodes {
          name
          slug
        }
      }
    }
  `)

  return data.allWpReasonCategory.nodes.sort((a, b) =>
    a.slug > b.slug ? 1 : -1
  )
}
