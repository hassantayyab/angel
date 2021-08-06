import { ImgCallCard } from '../../images'
import React from 'react'
import TopContactBar from './topContactBar'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import DesktopMenu from '../menu/desktop'

const Header = ({ headerData, menuData, contactFormRef }) => (
  <header className='relative z-50 flex flex-col items-center justify-between pl-0 sm:mt-1 md:flex-row gap-x-4 gap-y-5 xl:container md:pl-6 lg:pl-0 xl:mx-auto xl:px-6'>
    <div className='relative z-50 flex items-center justify-center order-2 w-full px-5 -mb-12 sm:px-0 md:justify-start md:w-2/5 lg:w-auto md:order-1 md:mb-0 gap-4'>
      <Link to='/'>
        <GatsbyImage
          image={getImage(headerData.logo?.localFile)}
          alt={headerData.logo?.altText}
          className='inline-block w-52 md:w-44 xl:w-52'
        />
      </Link>
      <div className='absolute top-0 right-0 p-1 mr-3 border rounded-full md:static border-yellow lg:hidden'>
        <div className='p-3 rounded-full bg-blue'>
          <img src={ImgCallCard} alt='call us' />
        </div>
      </div>
    </div>
    <div className='order-1 w-full md:order-2 md:w-auto'>
      <TopContactBar
        data={headerData.contactNumbers}
        contactFormRef={contactFormRef}
        menuData={menuData}
      />
      <div className='hidden md:block'>
        <DesktopMenu list={menuData} />
      </div>
    </div>
  </header>
)

export default Header
