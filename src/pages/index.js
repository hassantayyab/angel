import * as React from 'react'
import Header from '../components/common/header'
import TopInfoBar from '../components/common/topInfoBar'
import { useServicesQuery } from '../hooks/servicesQuery'
import { useGeneralInfoQuery } from '../hooks/generalInfoQuery'
import { useHeaderMenuQuery } from '../hooks/useMenuQuery'
import LayoutSecondary from '../components/utils/layout-secondary'
import Hero from '../components/home/hero'
import WhyChoose from '../components/common/why-choose'
import ServiceAreas from '../components/common/service-areas'
import Contact from '../components/common/contact'
import Footer from '../components/footer'
import { graphql } from 'gatsby'
import ContactCard from '../components/common/contact-card'
import Layout from '../components/utils/layout'

const IndexPage = ({ data }) => {
  const servicesData = useServicesQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()

  return (
    <>
      <TopInfoBar data={generalData._generalData} />
      <div className='container px-0 mx-auto sm:px-6 xl:px-0 space-y-10'>
        <Header headerData={generalData._generalData} menuData={menuData} />
      </div>

      <div className='mt-1.5'>
        <LayoutSecondary>
          <Hero data={data.wpPage._heroSection} />
        </LayoutSecondary>
      </div>

      <div className='-mt-24'>
        <Layout>
          <ContactCard carImage={generalData._generalData.carImage} />
        </Layout>
      </div>

      <div className='mt-12'>
        <WhyChoose />
      </div>

      <div className='my-12'>
        <ServiceAreas />
      </div>

      <div className='mt-6'>
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
    wpPage(slug: { eq: "home" }) {
      # ...SEOPageFragment
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
