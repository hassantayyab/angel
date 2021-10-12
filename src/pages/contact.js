import Contact from '../components/common/contact'
import * as React from 'react'
import Container from '../components/utils/container'
import Footer from '../components/footer'
import { useGeneralInfoQuery } from '../hooks/generalInfoQuery'
import { useHeaderMenuQuery } from '../hooks/useMenuQuery'
import { useServicesQuery } from '../hooks/servicesQuery'
import TopInfoBar from '../components/common/topInfoBar'
import Header from '../components/common/header'
import ContainerSecondary from '../components/utils/containerSecondary'
import Hero from '../components/subpage/hero'
import { graphql } from 'gatsby'
import ContactCard from '../components/common/contactCard'
import CallUsCard from '../components/utils/call-us-card'
import Seo from '../components/seo'
import { useReviewsSchemaQuery } from '../hooks/use-reviews-schema-query'
import ReviewsSchema from '../components/ReviewsSchema'
import GeneralSchema from '../components/GeneralSchema'
import PageSpecificSchema from '../components/PageSpecificSchema'

const ContactPage = ({ data }) => {
  const servicesData = useServicesQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()

  const image =
    data.wpPage.seo !== null && data.wpPage.seo.opengraphImage !== null
      ? data.site.siteMetadata.siteUrl +
        data.wpPage.seo.opengraphImage.localFile.publicURL
      : '/blank.jpg'
  const title = data.wpPage.title
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
        uri={data.wpPage.uri}
        title={data.wpPage.title}
        articleBody={null}
        categories={null}
        tags={null}
        videos={
          data.wpPage.nexvelschemapagesposts !== null
            ? data.wpPage.nexvelschemapagesposts.videos
            : null
        }
        questionsAndAnswers={
          data.wpPage.nexvelschemapagesposts !== null
            ? data.wpPage.nexvelschemapagesposts.questionsAndAnswers
            : null
        }
        maps={
          data.wpPage.nexvelschemapagesposts !== null
            ? data.wpPage.nexvelschemapagesposts.maps
            : null
        }
        digitalDocuments={
          data.wpPage.nexvelschemapagesposts !== null
            ? data.wpPage.nexvelschemapagesposts.digitaldocuments
            : null
        }
        images={
          data.wpPage.nexvelschemapagesposts !== null
            ? data.wpPage.nexvelschemapagesposts.images
            : null
        }
        hasSchema={
          data.wpPage.nexvelschemapagesposts !== null &&
          (data.wpPage.nexvelschemapagesposts.videos ||
            data.wpPage.nexvelschemapagesposts.questionsAndAnswers ||
            data.wpPage.nexvelschemapagesposts.maps ||
            data.wpPage.nexvelschemapagesposts.digitaldocuments ||
            data.wpPage.nexvelschemapagesposts.images) !== null
            ? true
            : false
        }
      />
      {something !== undefined && something.title === title && (
        <ReviewsSchema image={image} />
      )}
      <Seo data={data.wpPage.seo} />
      <TopInfoBar data={generalData._generalData} />
      <div className='container px-0 mx-auto lg:px-6 xl:px-0 space-y-10'>
        <Header headerData={generalData._generalData} menuData={menuData} />
      </div>
      <div className='mt-1.5'>
        <ContainerSecondary>
          <Hero data={data.wpPage._heroSection} />
        </ContainerSecondary>
      </div>
      <div className='mb-24 -mt-24'>
        <Container>
          <ContactCard carImage={generalData._generalData.carImage} />
        </Container>
      </div>
      <div className='md:my-24'>
        <Contact />
      </div>
      <div className='mx-auto mt-20 text-center lg:mt-40 mw-sub-page'>
        <Container>
          <CallUsCard data={generalData} />
        </Container>
      </div>
      <Footer
        generalInfoData={generalData}
        servicesData={servicesData}
        menuData={menuData}
      />
    </>
  )
}

export const query = graphql`
  {
    wpPage(slug: { eq: "contact" }) {
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
      ...SeoPageFragment
      ...HeroPageFragment
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export default ContactPage
