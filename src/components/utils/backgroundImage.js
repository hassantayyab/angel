import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

const BackgroundImage = ({ image, alt, loading = 'lazy', className }) => {
  return (
    <div className='absolute top-0 bottom-0 left-0 right-0'>
      {image && (
        <GatsbyImage
          image={image}
          alt={alt}
          loading={loading}
          style={{ height: '100%' }}
          className={className}
        />
      )}
    </div>
  )
}

export default BackgroundImage
