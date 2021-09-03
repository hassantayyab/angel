import { ImgBadgeCount } from '../../images'
import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

const Badge = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      query1: allBirdeyedata(
        filter: { id: { ne: "dummy" }, sourceType: { ne: "Direct Feedback" } }
      ) {
        nodes {
          rating
        }
      }
      query2: allBirdeyedata(
        filter: { id: { ne: "dummy" }, rating: { ne: 0 } }
      ) {
        nodes {
          rating
        }
      }
      file(name: { eq: "whitelabel-icon" }) {
        childImageSharp {
          fixed(height: 43, width: 43) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
    }
  `)

  function length(obj) {
    return Object.keys(obj).length
  }
  const totalRatings = length(data.query1.nodes)
  const fiveFourThreeRatings = length(data.query2.nodes)

  let total = 0
  const ratingsTotal = data.query1.nodes
  let i
  for (i = 0; i < ratingsTotal.length; i++) {
    total += ratingsTotal[i].rating
  }

  let averageRating = total / fiveFourThreeRatings
  averageRating = averageRating.toFixed(1)

  let rectWidth = averageRating * 20 + '%'

  return (
    <Link
      className='relative inline-block pt-3 pb-8 text-center'
      to='/reviews/'
    >
      <div className='relative z-20 flex flex-col justify-center w-32 h-32 p-3 text-black rounded-full bg-yellow'>
        <div className='flex items-center justify-center mb-2 gap-2'>
          <img src={ImgBadgeCount} alt='total reviews count' className='w-8' />
          <h4 className='font-graphikBold'>{totalRatings}</h4>
        </div>
        <small
          className='text-center text-black uppercase font-graphikMedium'
          style={{ fontSize: '0.6rem' }}
        >
          Customer Reviews
        </small>

        <div className='w-16 mx-auto mt-1'>
          <svg viewBox='0 0 1000 200'>
            <defs>
              <polygon
                id='star-circular'
                points='100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66 '
              />

              <clipPath id='stars-circular'>
                <use xlinkHref='#star-circular' />
                <use xlinkHref='#star-circular' x='20%' />
                <use xlinkHref='#star-circular' x='40%' />
                <use xlinkHref='#star-circular' x='60%' />
                <use xlinkHref='#star-circular' x='80%' />
              </clipPath>
            </defs>

            <rect
              style={{ fill: '#D7A100', height: '100%', width: '100%' }}
              clipPath='url(#stars-circular)'
            ></rect>

            <rect
              width={rectWidth}
              style={{ fill: '#F71800', height: '100%' }}
              clipPath='url(#stars-circular)'
            ></rect>
          </svg>
        </div>

        <div className='text-sm text-center mt-1.5 font-graphikMedium'>
          {averageRating}
        </div>
      </div>
      <div className='absolute inset-0 mx-auto shadow ribbon bg-blue-light' />
    </Link>
  )
}

export default Badge
