import { useStaticQuery, graphql } from 'gatsby'

export const useBlogsList = () => {
  const data = useStaticQuery(graphql`
    query BlogsList {
      allWpPost {
        nodes {
          ...HeroPostFragment
          excerpt
          date(formatString: "D MMM, Y")
          uri
        }
      }
    }
  `)

  return data.allWpPost.nodes
}
