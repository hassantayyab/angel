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

const ContactPage = ({ data }) => {
  const servicesData = useServicesQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()

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
      ...SeoPageFragment
      ...HeroPageFragment
    }
  }
`

export default ContactPage
