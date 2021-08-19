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

      blogListPage: allWpPost(sort: { fields: date, order: DESC }) {
        edges {
          node {
            id
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

      couponsListPage: allWpCoupon(sort: { fields: date, order: DESC }) {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Constants
  const postsPerPage = 9

  const { subpage, blogpost, blogListPage, couponsListPage } = result.data

  const subpageTemplate = require.resolve(`./src/templates/sub-page.js`)
  subpage.edges.forEach(({ node }) => {
    createPage({
      path: node.uri,
      component: subpageTemplate,
      context: { id: node.id },
    })
  })

  const blogListPageTemplate = require.resolve('./src/templates/blog-list.js')
  Array.from({
    length: Math.ceil(blogListPage.edges.length / postsPerPage),
  }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blogs/` : `/blogs/${i + 1}`,
      component: blogListPageTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: Math.ceil(blogListPage.edges.length / postsPerPage),
        currentPage: i + 1,
      },
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

  const couponsListPageTemplate = require.resolve(
    './src/templates/coupons-list.js'
  )
  Array.from({
    length: Math.ceil(couponsListPage.edges.length / postsPerPage),
  }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/deals/` : `/deals/${i + 1}`,
      component: couponsListPageTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: Math.ceil(couponsListPage.edges.length / postsPerPage),
        currentPage: i + 1,
      },
    })
  })
}
