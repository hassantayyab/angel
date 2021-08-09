import { useCouponsQuery } from '../../hooks/couponsQuery'
import { graphql } from 'gatsby'
import React from 'react'
import Container from '../utils/container'
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
      <Container>
        <div className='relative flex flex-col justify-center pt-12 lg:pt-40 lg:flex-row gap-12'>
          <div className='text-center text-black uppercase lg:w-2/5 lg:text-left'>
            <h5 className='mb-2 tracking-wider font-graphikMedium'>
              Limited Time
            </h5>
            <h2>{data.couponsHeading}</h2>
            {/* Separator */}
            <div className='mx-auto mt-8 w-36 lg:ml-0'>
              <Separator />
            </div>
          </div>
          <div className='flex-1'>
            <div className='flex pb-6 overflow-x-scroll overflow-y-hidden'>
              <div className='flex justify-center lg:justify-start gap-6'>
                {coupons.length > 0 &&
                  coupons.map((coupon, i) => (
                    <Coupon key={i} data={coupon} logo={logo} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
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
