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
import { useReviews } from '../hooks/reviewsQuery'
import Review from '../components/common/review'

const ReviewsList = ({ data, location }) => {
  const heroData = useReviews()
  const reviews = data.allWpCustomerReview.nodes

  const servicesData = useServicesQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()

  const totalData = data.allWpCustomerReview.nodes.length
  const currentPage = +(location.pathname.split('/').slice(-1)[0] === ''
    ? '1'
    : location.pathname.split('/').slice(-1)[0])
  const pageSize = 9

  const handlePageChange = (v) => {
    navigate(v === 0 ? `/reviews/` : `/reviews/${v + 1}`)
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
        <section className='mt-20'>
          <iframe
            name='bfiframe'
            src='https://localreviews.buzz/widget/render.php?bid=161893005182434&amp;wid=3&amp;ver=4&amp;update=0'
            id='bfpublish'
            width='100%'
            height='600'
            scrolling='auto'
            frameborder='0'
            title='Customer reviews'
          ></iframe>
          <span class='bf-spn'>
            {' '}
            powered by{' '}
            <a
              class='bf-pwr'
              href='http://www.localreviews.buzz'
              target='_blank'
              rel='noopener noreferrer'
            >
              LocalReviews.Buzz
            </a>
          </span>
        </section>
        <section className='justify-between my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10'>
          {reviews.slice(0, pageSize).map((review, i) => (
            <div className='flex justify-center' key={i}>
              <Review data={review} />
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

export const reviewsListQuery = graphql`
  query reviewsListQuery($skip: Int!, $limit: Int!) {
    allWpCustomerReview(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        title
        _reviewPost {
          rating
          text
        }
      }
    }
  }
`

export default ReviewsList
