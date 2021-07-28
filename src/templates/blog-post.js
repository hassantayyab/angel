import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/utils/layout'

const BlogPost = ({ data }) => {
  const { title } = data.wpPost
  return (
    <Layout>
      <h1>{title}</h1>
    </Layout>
  )
}
export default BlogPost

export const query = graphql`
  query ($id: String!) {
    wpPost(id: { eq: $id }) {
      title
    }
  }
`
