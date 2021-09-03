import { useCouponsListQuery } from '../../hooks/couponsListQuery'
import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import Container from '../utils/container'
import Separator from '../utils/separator'
import Coupon from '../common/coupon'
import { ImageCouponBg } from '../../images'
import { useInView } from 'react-intersection-observer'
import { defaultTransition, slideDown, slideUp, View } from '../../animations'
import { useAnimation } from 'framer-motion'
import Subtitle from '../utils/subititle'
import Title from '../utils/title'

const CouponAndDiscount = ({ data, logo }) => {
  const coupons = useCouponsListQuery()

  const [ref, inView] = useInView(View)
  const animateTitle = useAnimation()
  const animateSubtitle = useAnimation()
  useEffect(() => {
    if (inView) {
      animateTitle.start({
        ...slideDown.visible,
        ...defaultTransition,
      })

      animateSubtitle.start({
        ...slideUp.visible,
        ...defaultTransition,
      })
    }
  }, [inView, animateTitle, animateSubtitle])

  return (
    <section className='relative mb-72 height-26' ref={ref}>
      <div className='absolute inset-0 w-full h-full -z-10'>
        <img
          width='auto'
          height='auto'
          src={ImageCouponBg}
          alt='coupon section background'
          className='object-cover w-full h-full'
        />
      </div>
      <Container>
        <div className='relative flex flex-col justify-center pt-12 lg:pt-40 lg:flex-row gap-12'>
          <div className='text-center text-black uppercase lg:w-2/5 lg:text-left'>
            <Subtitle
              className='mb-2 tracking-wider font-graphikMedium'
              animate={animateSubtitle}
            >
              Limited Time
            </Subtitle>
            <Title animate={animateTitle}>{data.couponsHeading}</Title>
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
