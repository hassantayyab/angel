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
import React, { useRef } from 'react'
import Container from '../components/utils/container'
import CallUsCard from '../components/utils/call-us-card'
import ServiceAccordianCard from '../components/subpage/serviceCard'
import ServiceAreasAccordianSection from '../components/common/serviceAreasAccordianSection'
import { useServiceAreasQuery } from '../hooks/serviceAreasQuery'
import Hero from '../components/subpage/hero'

const ServiceAreas = ({ data }) => {
  const serviceAreas = useServiceAreasQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()
  const coupon = useCouponsListQuery()[0]

  const contactFormRef = useRef(null)

  const servicesData = useServicesQuery()
  const serviceCategories = Object.keys(servicesData)
  const services = menuData
    .filter((m) => m.label === 'Services')[0]
    .childItems.nodes.sort()

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
            {services &&
              services.map((service, i) => (
                <div key={i}>
                  <ServiceAccordianCard
                    data={service}
                    servicesData={servicesData[serviceCategories.sort()[i]]}
                  />
                </div>
              ))}

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
        <WhyChoose contactFormRef={contactFormRef} />
      </div>

      <div ref={contactFormRef}>
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
      ...SeoPageFragment
      ...HeroPageFragment
    }
  }
`

export default ServiceAreas
