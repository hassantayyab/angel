import React, { useRef } from 'react'
import { graphql } from 'gatsby'

import Container from '../components/utils/container'
import Header from '../components/common/header'
import Hero from '../components/subpage/hero'
import ServiceCard from '../components/subpage/serviceCard'
import Article from '../components/subpage/article'
import PerkCard from '../components/subpage/perkCard'
import Coupon from '../components/common/coupon'
import WhyChoose from '../components/common/whyChoose'
import TopInfoBar from '../components/common/topInfoBar'
import Contact from '../components/common/contact'
import Footer from '../components/footer'
import ServiceAreas from '../components/common/serviceAreas'
import ContactCard from '../components/common/contactCard'
import ContainerSecondary from '../components/utils/containerSecondary'
import { useServicesQuery } from '../hooks/servicesQuery'
import { useGeneralInfoQuery } from '../hooks/generalInfoQuery'
import { useHeaderMenuQuery } from '../hooks/useMenuQuery'
import { useCouponsQuery } from '../hooks/couponsQuery'
import Seo from '../components/seo'

const SubPage = ({ data }) => {
  const servicesData = useServicesQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()
  const coupon = useCouponsQuery()[0]

  const contactFormRef = useRef(null)

  return (
    <>
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
            {servicesData &&
              Object.keys(servicesData).map((service, i) => (
                <div key={i}>
                  <ServiceCard data={servicesData[service]} heading={service} />
                </div>
              ))}

            <PerkCard data={generalData._guaranteeCard} />
            <Coupon data={coupon} logo={generalData._generalData.logo} />
          </aside>
          <main className='col-span-1 md:col-span-2'>
            <Article
              data={data.wpPage._subpageContent}
              generalInfoData={generalData}
              title={data.wpPage.title}
            />
          </main>
        </div>

        <div className='mt-20 lg:mt-28'>
          <ContactCard carImage={generalData._generalData.carImage} />
        </div>
      </Container>

      <div className='mt-6'>
        <WhyChoose contactFormRef={contactFormRef} />
      </div>

      <div className='my-12'>
        <ServiceAreas />
      </div>

      <div className='mt-6' ref={contactFormRef}>
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
export default SubPage

export const query = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      ...SeoPageFragment
      ...HeroPageFragment
      title
      _subpageContent {
        contentList {
          editor
        }
        contentImage {
          altText
          image {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(
                  quality: 100
                  layout: FULL_WIDTH
                  placeholder: BLURRED
                  formats: [WEBP]
                )
              }
            }
          }
        }
      }
    }
  }
`
