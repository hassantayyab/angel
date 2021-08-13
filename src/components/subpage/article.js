import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import CallUsCard from '../utils/call-us-card'
import Separator from '../utils/separator'

const Article = ({ data, title, generalInfoData }) => {
  const { contentList, contentImage } = data

  const renderArticleContent = () => {
    if (!contentList || contentList?.length < 1) {
      return
    }

    return contentList.map(({ editor }, i) => {
      const data = []

      if (i === 1 && contentImage.image) {
        data.push(
          <div
            className='relative h-48 mt-10 overflow-hidden sm:h-72 mw-sub-page'
            key={`bannerImg${i}`}
          >
            <GatsbyImage
              image={getImage(contentImage.image?.localFile)}
              alt={contentImage?.altText}
              className='w-full h-full absolute-center'
            />
          </div>
        )
      }

      if (i === 2) {
        data.push(
          <div className='mt-10 mw-sub-page' key={i}>
            <CallUsCard data={generalInfoData} />
          </div>
        )
      }

      data.push([
        editor && (
          <article key={i} className='prose'>
            <div
              className='text-inner-html'
              dangerouslySetInnerHTML={{ __html: editor }}
            />
          </article>
        ),
      ])

      return data
    })
  }

  return (
    <section>
      <h2 className='w-5/6 uppercase'>{title}</h2>
      <div className='w-1/2 mt-8 mb-4 sm:w-1/5'>
        <Separator />
      </div>
      {renderArticleContent()}
    </section>
  )
}

export default Article
