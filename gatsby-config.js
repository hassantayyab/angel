require('dotenv').config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: 'Angel',
    siteUrl: `https://angelhvac.netlify.app`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        query: `{
          allSitePage(filter: {isCreatedByStatefulCreatePages: {eq: true}}) {
            edges {
              node {
                id
                slug: path
              }
            }
          }
          allWpPage {
            edges {
              node {
                id
                slug: uri
                updated_at:modified
              }
            }
          }
          allWpPost {
            edges {
              node {
                id
                slug: uri
                updated_at:modified
              }
            }
          }
        }
        
        `,
       mapping: {
        allSitePage: {
          sitemap: `pages`
        },
         allWpPage: {
           sitemap: `pages`
         },
         allWpPost: {
          sitemap: `posts`,
          prefix: 'blog'
        },
       }
      },
    },
     /*This resolves IE 11 white screen of death*/
     {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
         features: [`IntersectionObserver`, `Symbol`, `viewport`, `~viewport` ]
      },
   },
   {
    resolve: `gatsby-plugin-google-gtag`,
  options: {
    // You can add multiple tracking ids and a pageview event will be fired for all of them.
    trackingIds: [
      "UA-101715984-1"
    ]
  }
  },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: `${process.env.WP_URL}/graphql`,
      },
    },
    'gatsby-plugin-smoothscroll',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    // 'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    'gatsby-plugin-postcss',
    // Birdeye
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        // The url, this should be the endpoint you are attempting to pull data from
        url: `http://api.birdeye.com/resources/v1/review/businessid/${process.env.BIRDEYE_BUSINESS_ID}?api_key=${process.env.BIRDEYE_API_KEY}`,

        method: 'get',

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },

        // Request body
        data: {},

        // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
        // using this name. i.e. posts.json
        name: `birdeyedata`,

        // enable disk caching
        allowCache: false,
        // Optionally re-source data when it changes and
        // `gatsby develop` is running.
        // Requires `ENABLE_GATSBY_REFRESH_ENDPOINT=true`.
        // See https://www.gatsbyjs.org/docs/environment-variables/#reserved-environment-variables
        // Default is false
        enableDevRefresh: true,

        // Optionally override key used to re-source data
        // when `gatsby develop` is running.
        // Requires `enableDevRefresh: true`.
        // See setting directly above this one.
        // See also https://github.com/gatsbyjs/gatsby/issues/14653
        // Default is `id`
        refreshId: `id`,

        // Optionally include some output when building
        // Default is false
        verboseOutput: true, // For debugging purposes
      },
    },
  ],
}
