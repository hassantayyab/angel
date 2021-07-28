const path = require('path')

// Create aliases for folder names
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@fonts': path.resolve(__dirname, './src/fonts'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@images': path.resolve(__dirname, './src/images'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@fragments': path.resolve(__dirname, './src/fragment'),
      },
    },
  })
}

// Generate pages
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      subpage: allWpPage(
        filter: { template: { templateName: { eq: "Subpage" } } }
      ) {
        edges {
          node {
            id
            uri
          }
        }
      }

      blogpost: allWpPost(sort: { fields: date, order: DESC }) {
        edges {
          node {
            id
            uri
          }
        }
      }
    }
  `)
  if (result.errors) {
    throw new Error(result.errors)
  }

  const { subpage, blogpost } = result.data

  const subpageTemplate = require.resolve(`./src/templates/sub-page.js`)
  subpage.edges.forEach(({ node }) => {
    createPage({
      path: node.uri,
      component: subpageTemplate,
      context: { id: node.id },
    })
  })

  const blogpostTemplate = require.resolve(`./src/templates/blog-post.js`)
  blogpost.edges.forEach(({ node }) => {
    createPage({
      path: `/blog${node.uri}`,
      component: blogpostTemplate,
      context: { id: node.id },
    })
  })
}
