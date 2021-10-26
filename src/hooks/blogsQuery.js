import { useStaticQuery, graphql } from 'gatsby'

export const useBlogs = () => {
  const data = useStaticQuery(graphql`
    query Blogs {
      wpPage(slug: { eq: "blog" }) {
        ...SeoPageFragment
        ...HeroPageFragment
      }
    }
  `)

  return data.wpPage
}
