import { useStaticQuery, graphql } from 'gatsby'

export const useServiceCategoriesQuery = () => {
  const data = useStaticQuery(graphql`
    query ServiceCategoriesQuery {
      allWpServiceCategory {
        nodes {
          name
          slug
        }
      }
    }
  `)

  return data.allWpServiceCategory.nodes
    .map((n) => ({
      ...n,
      slug: n.slug.replace('_', '-'),
    }))
    .sort((a, b) => (a.slug > b.slug ? 1 : -1))
}
