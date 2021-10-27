import React from 'react'
import { graphql, navigate } from 'gatsby'
import TopInfoBar from '../components/common/topInfoBar'
import Header from '../components/common/header'
import { useGeneralInfoQuery } from '../hooks/generalInfoQuery'
import { useHeaderMenuQuery } from '../hooks/useMenuQuery'
import Hero from '../components/subpage/hero'
import Footer from '../components/footer'
import { useServicesQuery } from '../hooks/servicesQuery'
import Container from '../components/utils/container'
import Frame from '../components/utils/frame'
import { ImgBackArrow } from '../images'
import Seo from '../components/seo'
import Button from '../components/utils/button'
import { useReviewsSchemaQuery } from '../hooks/use-reviews-schema-query'
import ReviewsSchema from '../components/ReviewsSchema'
import GeneralSchema from '../components/GeneralSchema'
import PageSpecificSchema from '../components/PageSpecificSchema'

const BlogPost = ({ data }) => {
  const { title, content, seo } = data.wpPost

  const servicesData = useServicesQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()

  const heroData = {
    ...data.wpPost._heroSection,
    heroBgImage: data.wpPost._heroSection.heroBgImage
      ? data.wpPost._heroSection.heroBgImage
      : generalData._generalData.imagePlaceholder,
  }

  const image =
    seo !== null && seo.opengraphImage !== null
      ? data.site.siteMetadata.siteUrl + seo.opengraphImage.localFile.publicURL
      : '/blank.jpg'
  const { wp } = useReviewsSchemaQuery()
  const other = wp.nexvelSchemaMarkup.nexvelschema.whichPages
  const something = other.find(function (ele) {
    if (ele.title === title) {
      return true
    }
    return false
  })

  return (
    <>
      <GeneralSchema siteUrl={data.site.siteMetadata.siteUrl} />
      <PageSpecificSchema
        siteUrl={data.site.siteMetadata.siteUrl}
        uri={data.wpPost.uri}
        title={title}
        datePublished={data.wpPost.date}
        dateModified={data.wpPost.modified}
        image={image}
        author={
          data.wpPost.author.node.firstName +
          ' ' +
          data.wpPost.author.node.lastName
        }
        categories={data.wpPost.categories}
        tags={data.wpPost.tags}
        articleBody={data.wpPost.content}
        post={true}
        videos={
          data.wpPost.nexvelschemapagesposts !== null
            ? data.wpPost.nexvelschemapagesposts.videos
            : null
        }
        questionsAndAnswers={
          data.wpPost.nexvelschemapagesposts !== null
            ? data.wpPost.nexvelschemapagesposts.questionsAndAnswers
            : null
        }
        maps={
          data.wpPost.nexvelschemapagesposts !== null
            ? data.wpPost.nexvelschemapagesposts.maps
            : null
        }
        digitalDocuments={
          data.wpPost.nexvelschemapagesposts !== null
            ? data.wpPost.nexvelschemapagesposts.digitaldocuments
            : null
        }
        images={
          data.wpPost.nexvelschemapagesposts !== null
            ? data.wpPost.nexvelschemapagesposts.images
            : null
        }
        hasSchema={
          data.wpPost.nexvelschemapagesposts !== null &&
          (data.wpPost.nexvelschemapagesposts.videos ||
            data.wpPost.nexvelschemapagesposts.questionsAndAnswers ||
            data.wpPost.nexvelschemapagesposts.maps ||
            data.wpPost.nexvelschemapagesposts.digitaldocuments ||
            data.wpPost.nexvelschemapagesposts.images) !== null
            ? true
            : false
        }
      />
      {something !== undefined && something.title === title && (
        <ReviewsSchema image={image} />
      )}
      <Seo data={seo} />
      <TopInfoBar data={generalData._generalData} />
      <div className='container px-0 mx-auto lg:px-6 xl:px-0 space-y-10'>
        <Header headerData={generalData._generalData} menuData={menuData} />
      </div>

      <Container>
        <div className='relative mx-auto mb-20 mt-44 md:mt-4 mw-blog-page'>
          <div className='relative z-10 mb-6 mr-6'>
            <Hero data={heroData} heightClassName='h-64 sm:h-96' />
          </div>
          <div className='absolute right-0 -bottom-6 top-6 left-6'>
            <Frame />
          </div>
        </div>

        <article className='mx-auto prose' style={{ maxWidth: '80ch' }}>
          <h1>{title}</h1>
          <div
            className='text-inner-html'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
        <div className='mx-auto my-12 mw-blog-page'>
          <Button
            type='button'
            className='flex items-center btn btn-primary space-x-4'
            onClick={() => navigate('/blog/')}
          >
            <img src={ImgBackArrow} alt='go back' className='w-8' />
            <span>Back to Blogs</span>
          </Button>
        </div>
      </Container>

      <Footer
        generalInfoData={generalData}
        servicesData={servicesData}
        menuData={menuData}
      />
    </>
  )
}
export default BlogPost

export const query = graphql`
  query ($id: String!) {
    wpPost(id: { eq: $id }) {
      nexvelschemapagesposts {
        videos {
          title
          url
          description
          thumbnailImage {
            localFile {
              publicURL
            }
          }
          uploadDate
        }
        questionsAndAnswers {
          question
          answer
        }
        maps {
          mapUrl
        }
        digitaldocuments {
          title
        }
        images {
          image {
            localFile {
              publicURL
            }
            date(formatString: "LL")
            description
            title
          }
        }
      }
      ...SeoPostFragment
      ...HeroPostFragment
      title
      content
      author {
        node {
          firstName
          lastName
        }
      }
      date(formatString: "LL")
      modified(formatString: "LL")
      categories {
        nodes {
          name
        }
      }
      tags {
        nodes {
          name
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
