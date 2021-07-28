import { useCouponsQuery } from '../../hooks/couponsQuery'
import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../utils/layout'
import Separator from '../utils/separator'
import Coupon from '../common/coupon'
import { ImageCouponBg } from '../../images'

const CouponAndDiscount = ({ data, logo }) => {
  const coupons = useCouponsQuery()

  return (
    <section className='relative mb-72 height-26'>
      <div className='absolute inset-0 w-full h-full -z-10'>
        <img
          src={ImageCouponBg}
          alt='coupon section background'
          className='object-cover w-full h-full'
        />
      </div>
      <Layout>
        <div className='relative flex flex-col justify-center pt-12 md:pt-40 md:flex-row gap-12'>
          <div className='text-center text-black uppercase md:w-2/5 md:text-left'>
            <h5 className='mb-2 tracking-wider font-graphikMedium'>
              Limited Time
            </h5>
            <h2>{data.couponsHeading}</h2>
            {/* Separator */}
            <div className='mx-auto mt-8 w-36 md:ml-0'>
              <Separator />
            </div>
          </div>
          <div className='flex-1'>
            <div className='flex pb-6 overflow-x-scroll overflow-y-hidden gap-6'>
              {coupons.length > 0 &&
                coupons.map((coupon, i) => (
                  <Coupon key={i} data={coupon} logo={logo} />
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </section>
  )
}

export const query = graphql`
  fragment CouponAndDiscountFragment on WpPage {
    _couponsSection {
      couponsHeading
    }
  }
`

export default CouponAndDiscount
