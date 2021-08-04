import React from 'react'
import { graphql, navigate } from 'gatsby'
import TopInfoBar from '../components/common/topInfoBar'
import Header from '../components/common/header'
import { useGeneralInfoQuery } from '../hooks/generalInfoQuery'
import { useHeaderMenuQuery } from '../hooks/useMenuQuery'
import Hero from '../components/subpage/hero'
import Footer from '../components/footer'
import { useServicesQuery } from '../hooks/servicesQuery'
import Layout from '../components/utils/layout'
import Frame from '../components/utils/frame'
import { ImgBackArrow } from '../images'

const BlogPost = ({ data }) => {
  const { title, content } = data.wpPost

  const servicesData = useServicesQuery()
  const generalData = useGeneralInfoQuery()
  const menuData = useHeaderMenuQuery()

  return (
    <>
      <TopInfoBar data={generalData._generalData} />
      <div className='container px-0 mx-auto sm:px-6 xl:px-0 space-y-10'>
        <Header headerData={generalData._generalData} menuData={menuData} />
      </div>

      <Layout>
        <div className='relative mx-auto mt-4 mb-20 mw-blog-page'>
          <div className='relative z-10 mb-6 mr-6'>
            <Hero
              data={data.wpPost._heroSection}
              heightClassName='h-64 sm:h-96'
            />
          </div>
          <div className='absolute right-0 -bottom-6 top-6 left-6'>
            <Frame />
          </div>
        </div>

        <article className='mx-auto prose' style={{ maxWidth: '80ch' }}>
          <h1>{title}</h1>
          <div
            className='text-inner-html'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
        <div className='mx-auto my-12 mw-blog-page'>
          <button
            type='button'
            className='flex items-center btn btn-primary gap-4'
            onClick={() => navigate('/blogs/')}
          >
            <img src={ImgBackArrow} alt='go back' className='w-8' />
            <span>Back to Blogs</span>
          </button>
        </div>
      </Layout>

      <Footer
        generalInfoData={generalData}
        servicesData={servicesData}
        menuData={menuData}
      />
    </>
  )
}
export default BlogPost

export const query = graphql`
  query ($id: String!) {
    wpPost(id: { eq: $id }) {
      ...HeroPostFragment
      # ...SEOPostFragment
      title
      content
    }
  }
`
