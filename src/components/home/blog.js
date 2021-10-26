import { useBlogsList } from '../../hooks/blogsListQuery'
import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import Container from '../utils/container'
import Separator from '../utils/separator'
import BlogCard from './blogCard'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import { defaultTransition, slideDown, slideUp, View } from '../../animations'
import { useAnimation } from 'framer-motion'
import Subtitle from '../utils/subititle'
import Title from '../utils/title'
import Corousal from '../utils/corousal'

const Blog = ({ data }) => {
  const blogs = useBlogsList().slice(0, 3)

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
    <section className='relative pb-40 md:pb-80' ref={ref}>
      <div className='absolute bottom-0 left-0 w-full overflow-hidden h-3/4'>
        <div className='absolute bottom-0 w-full'>
          <GatsbyImage
            image={getImage(data.blogBgImage?.localFile)}
            alt={data.blogBgImage?.altText}
            className='object-fill w-full h-full -z-10'
          />
          <div
            className='absolute top-0 left-0 z-0 w-full h-1/2'
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,1) 40%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0) 100%)',
            }}
          ></div>
        </div>
      </div>

      <Container>
        <div className='text-center text-black uppercase'>
          <Subtitle
            className='mb-2 tracking-wider font-graphikMedium'
            animate={animateSubtitle}
          >
            {data.blogSubheading}
          </Subtitle>
          <Title animate={animateTitle}>{data.blogHeading}</Title>

          {/* Separator */}
          <div className='w-40 mx-auto mt-8 mb-4'>
            <Separator />
          </div>
        </div>
        <div className='relative'>
          <Corousal data={blogs} id='blog' />
          <div className='relative z-10 flex justify-start px-1 pb-6 mt-12 overflow-x-hidden overflow-y-hidden sm:overflow-x-auto lg:justify-center'>
            <div className='flex space-x-5 lg:space-x-8'>
              {blogs.length > 0 &&
                blogs.map((blog, i) => (
                  <div key={i} id={`blog-${i}`}>
                    <BlogCard data={blog} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment BlogFragment on WpPage {
    _blogSection {
      blogSubheading
      blogHeading
      blogBgImage {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(
              quality: 100
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [WEBP]
            )
          }
        }
      }
    }
  }
`

export default Blog
