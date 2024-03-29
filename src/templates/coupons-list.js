import { graphql, navigate } from 'gatsby'
import React from 'react'
import TopInfoBar from '../components/common/topInfoBar'
import { useHeaderMenuQuery } from '../hooks/useMenuQuery'
import { useGeneralInfoQuery } from '../hooks/generalInfoQuery'
import { useServicesQuery } from '../hooks/servicesQuery'
import Header from '../components/common/header'
import Container from '../components/utils/container'
import Footer from '../components/footer'
import ContainerSecondary from '../components/utils/containerSecondary'
import Hero from '../components/subpage/hero'
import Pagination from '../components/utils/pagination'
import Coupon from '../components/common/coupon'
import { useCoupons } from '../hooks/couponsQuery'

const CouponsList = ({ data, location }) => {
  const heroData = useCoupons()
  const coupons = data.allWpCoupon.nodes

  const servicesData = useServicesQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()

  const totalData = data.allWpCoupon.nodes.length
  const currentPage = +(location.pathname.split('/').slice(-1)[0] === ''
    ? '1'
    : location.pathname.split('/').slice(-1)[0])
  const pageSize = 9

  const handlePageChange = (v) => {
    navigate(v === 0 ? `/deals/` : `/deals/${v + 1}`)
  }

  return (
    <>
      <TopInfoBar data={generalData._generalData} />
      <div className='container px-0 mx-auto lg:px-6 xl:px-0 space-y-10'>
        <Header headerData={generalData._generalData} menuData={menuData} />
      </div>

      <div className='mt-1.5'>
        <ContainerSecondary>
          <Hero data={heroData._heroSection} />
        </ContainerSecondary>
      </div>

      <Container>
        <section className='justify-between my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10'>
          {coupons.slice(0, pageSize).map((coupon, i) => (
            <div className='flex justify-center' key={i}>
              <Coupon data={coupon} logo={generalData._generalData.logo} />
            </div>
          ))}
        </section>

        <Pagination
          currentPage={currentPage}
          totalData={totalData}
          perPageData={pageSize}
          pageChange={handlePageChange}
        />
      </Container>

      <Footer
        generalInfoData={generalData}
        servicesData={servicesData}
        menuData={menuData}
      />
    </>
  )
}

export const couponsListQuery = graphql`
  query couponsListQuery($skip: Int!, $limit: Int!) {
    allWpCoupon(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        title
        _couponPost {
          items {
            text
          }
        }
      }
    }
  }
`

export default CouponsList
