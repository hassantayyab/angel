import Contact from '../components/common/contact'
import * as React from 'react'
import Layout from '../components/utils/layout'
import Footer from '../components/footer'
import { useGeneralInfoQuery } from '../hooks/generalInfoQuery'
import { useCouponsQuery } from '../hooks/couponsQuery'
import { useHeaderMenuQuery } from '../hooks/useMenuQuery'
import { useServicesQuery } from '../hooks/servicesQuery'
import TopInfoBar from '../components/common/topInfoBar'
import Header from '../components/common/header'
import LayoutSecondary from '../components/utils/layout-secondary'
import Hero from '../components/subpage/hero'
import { graphql } from 'gatsby'
import ContactCard from '../components/common/contact-card'
import CallUsCard from '../components/utils/call-us-card'

const ContactPage = ({ data }) => {
  const servicesData = useServicesQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()
  const coupon = useCouponsQuery()[0]

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

      <div className='mb-24 -mt-24'>
        <Layout>
          <ContactCard carImage={generalData._generalData.carImage} />
        </Layout>
      </div>
      <div className='md:my-24'>
        <Contact />
      </div>
      <div className='mx-auto mt-20 text-center lg:mt-40 mw-sub-page'>
        <Layout>
          <CallUsCard data={generalData} />
        </Layout>
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
      # ...SEOPageFragment
      ...HeroPageFragment
    }
  }
`

export default ContactPage
