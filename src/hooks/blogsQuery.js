import { useStaticQuery, graphql } from 'gatsby'

export const useBlogs = () => {
  const data = useStaticQuery(graphql`
    query Blogs {
      wpPage(slug: { eq: "blogs" }) {
        ...SeoPageFragment
        ...HeroPageFragment
      }
    }
  `)

  return data.wpPage
}
