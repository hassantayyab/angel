import Contact from '../components/common/contact'
import ContactCard from '../components/common/contactCard'
import Coupon from '../components/common/coupon'
import Header from '../components/common/header'
import TopInfoBar from '../components/common/topInfoBar'
import WhyChoose from '../components/common/whyChoose'
import Footer from '../components/footer'
import Seo from '../components/seo'
import PerkCard from '../components/subpage/perkCard'
import ContainerSecondary from '../components/utils/containerSecondary'
import { useCouponsListQuery } from '../hooks/couponsListQuery'
import { useGeneralInfoQuery } from '../hooks/generalInfoQuery'
import { useServicesQuery } from '../hooks/servicesQuery'
import { useHeaderMenuQuery } from '../hooks/useMenuQuery'
import { graphql } from 'gatsby'
import React from 'react'
import Container from '../components/utils/container'
import CallUsCard from '../components/utils/call-us-card'
import ServiceAccordianCard from '../components/subpage/serviceAccordianCard'
import ServiceAreasAccordianSection from '../components/common/serviceAreasAccordianSection'
import { useServiceAreasQuery } from '../hooks/serviceAreasQuery'
import Hero from '../components/subpage/hero'
import { useServiceCategoriesQuery } from '../hooks/serviceCategoriesQuery'
import { useReviewsSchemaQuery } from '../hooks/use-reviews-schema-query'
import ReviewsSchema from '../components/ReviewsSchema'
import GeneralSchema from '../components/GeneralSchema'
import PageSpecificSchema from '../components/PageSpecificSchema'

const ServiceAreas = ({ data }) => {
  const serviceAreas = useServiceAreasQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()
  const coupon = useCouponsListQuery()[0]

  const servicesData = useServicesQuery()
  const serviceCategories = useServiceCategoriesQuery()

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

      <Container>
        <div className='items-start mt-20 mb-16 xl:pl-16 grid grid-cols-1 lg:grid-cols-3 gap-y-16 lg:gap-16'>
          <aside className='justify-between grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12'>
            {serviceCategories &&
              serviceCategories.map((category, i) => {
                return (
                  <div key={i}>
                    <ServiceAccordianCard
                      category={category}
                      servicesData={servicesData[category.slug]}
                    />
                  </div>
                )
              })}

            <PerkCard data={generalData._guaranteeCard} />
            <Coupon data={coupon} logo={generalData._generalData.logo} />
          </aside>
          <main className='col-span-1 md:col-span-2'>
            <ServiceAreasAccordianSection data={serviceAreas} />
            <CallUsCard data={generalData} />
          </main>
        </div>

        <div className='mt-20 lg:mt-28'>
          <ContactCard carImage={generalData._generalData.carImage} />
        </div>
      </Container>

      <div className='mt-6'>
        <WhyChoose
          contactNumber={generalData._generalData.contactNumbers[0].number}
          carImage={generalData._generalData.carImage}
          logo={generalData._generalData.logo}
        />
      </div>

      <div id='scrollEl'>
        <Contact />
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
    wpPage(slug: { eq: "service-areas" }) {
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

export default ServiceAreas
