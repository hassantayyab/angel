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

  return (
    <>
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
          <Hero data={heroData} isMain='true' contactFormRef='#scrollEl' />
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
  }
`

export default IndexPage
