import * as React from 'react'
import Header from '../components/common/header'
import TopInfoBar from '../components/common/topInfoBar'
import { useServicesQuery } from '../hooks/servicesQuery'
import { useGeneralInfoQuery } from '../hooks/generalInfoQuery'
import { useHeaderMenuQuery } from '../hooks/useMenuQuery'
import ContainerSecondary from '../components/utils/containerSecondary'
import Hero from '../components/home/hero'
import WhyChoose from '../components/common/whyChoose'
import ServiceAreas from '../components/common/serviceAreas'
import Contact from '../components/common/contact'
import Footer from '../components/footer'
import { graphql } from 'gatsby'
import ContactCard from '../components/common/contactCard'
import Container from '../components/utils/container'
import Welcome from '../components/home/welcome'
import Video from '../components/home/video'
import CardContact from '../components/home/contactCard.js'
import CouponAndDiscount from '../components/home/couponAndDiscount'
import Services from '../components/home/services'
import IndustryLeading from '../components/home/industryLeading'
import Blog from '../components/home/blog'
import Specialties from '../components/home/specialties'
import Seo from '../components/seo'
import { useReviewsSchemaQuery } from '../hooks/use-reviews-schema-query'
import ReviewsSchema from '../components/ReviewsSchema'
import GeneralSchema from '../components/GeneralSchema'
import PageSpecificSchema from '../components/PageSpecificSchema'

const IndexPage = ({ data }) => {
  const servicesData = useServicesQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()

  const heroData = {
    title: data.wpPage._heroSection.heroTitle,
    subtitle: data.wpPage._heroSection.heroSubtitle,
    bgImage: data.wpPage._heroSection.heroBgImage,
  }

  const financingData = {
    title: data.wpPage._financing.financingHeading,
    subtitle: data.wpPage._financing.financingSubheading,
    bgImage: data.wpPage._financing.financingBgImage,
  }

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
        uri='/'
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
        <Header
          headerData={generalData._generalData}
          menuData={menuData}
          contactFormRef='#scrollEl'
        />
      </div>

      <div className='mt-1.5'>
        <ContainerSecondary>
          <Hero
            data={heroData}
            isMain='true'
            contactNumber={generalData._generalData.contactNumbers[0].number}
            carImage={generalData._generalData.carImage}
            logo={generalData._generalData.logo}
          />
        </ContainerSecondary>
      </div>

      <div className='-mt-24'>
        <Container>
          <ContactCard
            isCarAtBottom='true'
            contactNumber={generalData._generalData.contactNumbers[0].number}
            carImage={generalData._generalData.carImage}
            logo={generalData._generalData.logo}
          />
        </Container>
      </div>

      <div className='mt-24 sm:mt-28'>
        <Container>
          <Welcome
            data={data.wpPage._welcomeSection}
            contactFormRef='#scrollEl'
          />
        </Container>
      </div>

      <div className='mt-16 sm:mt-24'>
        <Video
          data={data.wpPage._videoSection}
          contactNumber={generalData._generalData.contactNumbers[0].number}
          carImage={generalData._generalData.carImage}
          logo={generalData._generalData.logo}
        />
      </div>

      <div className='mt-40 sm:mt-64 md:mt-56 lg:mt-20'>
        <WhyChoose
          contactNumber={generalData._generalData.contactNumbers[0].number}
          carImage={generalData._generalData.carImage}
          logo={generalData._generalData.logo}
        />
      </div>

      <CardContact data={data.wpPage._cardContact} contactFormRef='#scrollEl' />

      <div>
        <Specialties
          data={data.wpPage._specialtiesSection}
          contactNumber={generalData._generalData.contactNumbers[0].number}
          carImage={generalData._generalData.carImage}
          logo={generalData._generalData.logo}
        />
      </div>

      <CouponAndDiscount
        data={data.wpPage._couponsSection}
        logo={generalData._generalData.logo}
      />

      <Services data={data.wpPage._serviceSection} />

      <div className='mt-20'>
        <ContainerSecondary>
          <Hero
            data={financingData}
            contactFormRef='#scrollEl'
            showBadge={false}
            buttonLabel='Learn More'
          />
        </ContainerSecondary>
      </div>

      <div className='-mt-20'>
        <Container>
          <ContactCard carImage={generalData._generalData.carImage} />
        </Container>
      </div>

      <div className='mt-20'>
        <Blog data={data.wpPage._blogSection} />
      </div>

      <div className='mt-20'>
        <ServiceAreas />
      </div>

      <div className='mt-20' id='scrollEl'>
        <Contact />
      </div>

      <div className='xl:-mt-20'>
        <IndustryLeading
          data={data.wpPage._industryLeading}
          carImage={generalData._generalData.carImage}
          contactFormRef='#scrollEl'
        />
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
    wpPage(slug: { eq: "home" }) {
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
      ...WelcomeFragment
      ...VideoFragment
      ...CardContactFragment
      ...CouponAndDiscountFragment
      ...ServiceFragment
      ...FinancingFragment
      ...InudstryLeadingFragment
      ...BlogFragment
      ...SpecialtiesFragment
      _heroSection {
        heroTitle
        heroSubtitle
        heroBgImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: BLURRED
                formats: [WEBP]
              )
            }
          }
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

export default IndexPage
