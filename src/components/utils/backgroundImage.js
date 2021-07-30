import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

const BackgroundImage = ({ image, alt, loading = 'lazy', className }) => {
  return (
    <div className='absolute inset-0 w-full h-full'>
      {image && (
        <GatsbyImage
          image={image}
          alt={alt || 'bg'}
          loading={loading}
          style={{ height: '100%' }}
          className={className}
        />
      )}
    </div>
  )
}

export default BackgroundImage
