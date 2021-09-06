import { ImgCallCard } from '../../images'
import React, { useEffect, useState } from 'react'
import TopContactBar from './topContactBar'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import DesktopMenu from '../menu/desktop'
import MobileContactMenu from '../menu/mobileContactMenu'
import { motion } from 'framer-motion'
import { fadeIn, hoverScale, scale } from '../../animations'

const isBrowser = typeof window !== 'undefined'

const Header = ({ headerData, menuData, contactFormRef }) => {
  const [openContactMenu, setOpenContactMenu] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    if (openContactMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    if (isBrowser) {
      document.addEventListener('scroll', () => {
        window.scrollY > 10 ? setScroll(true) : setScroll(false)
      })
    }
  }, [openContactMenu, scroll])

  const handleClick = () => {
    setOpenContactMenu(!openContactMenu)
    setOpenMenu(false)
  }

  return (
    <div
      className={`fixed left-0 w-full z-50 transition-color duration-300 ${
        scroll ? 'bg-blue top-0 lg:shadow-lg' : 'top-14 sm:top-10 md:top-14'
      }`}
    >
      <header className='relative z-50 flex flex-col items-center justify-between pl-0 md:flex-row gap-x-4 gap-y-3 md:gap-y-5 xl:container md:pl-6 lg:pl-0 xl:mx-auto xl:px-6'>
        <div className='relative z-50 flex items-center justify-center order-2 w-full px-5 py-0 -mb-12 sm:px-0 md:justify-start md:w-2/5 lg:w-auto md:order-1 md:mb-0 gap-4 lg:py-0 md:py-4'>
          {openContactMenu && (
            <motion.button
              className={`fixed z-50 text-5xl md:text-6xl text-white left-6 md:right-6 md:left-auto md:top-28 ${
                scroll ? 'top-20' : 'top-32'
              }`}
              variants={fadeIn}
              initial='hidden'
              animate='visible'
              onClick={() => setOpenContactMenu(!openContactMenu)}
            >
              &times;
            </motion.button>
          )}
          <motion.span
            className='transition-all'
            variants={scale}
            whileHover={hoverScale}
          >
            <Link to='/'>
              <GatsbyImage
                image={getImage(headerData.logo?.localFile)}
                alt={headerData.logo?.altText}
                className='inline-block w-52 md:w-44 xl:w-52'
              />
            </Link>
          </motion.span>
          <div className='absolute top-0 right-0 p-1 mr-3 border rounded-full md:static border-yellow lg:hidden'>
            <button
              type='button'
              className='p-3 rounded-full bg-blue'
              onClick={handleClick}
            >
              <img width='auto' height='auto' src={ImgCallCard} alt='call us' />
            </button>
          </div>
        </div>
        <div className='order-1 w-full md:order-2 md:w-auto'>
          <TopContactBar
            data={headerData.contactNumbers}
            contactFormRef={contactFormRef}
            menuData={menuData}
            scroll={scroll}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            setOpenContactMenu={setOpenContactMenu}
          />
          <div className={`hidden md:block ${scroll && 'text-white'}`}>
            <DesktopMenu list={menuData} />
          </div>
        </div>
      </header>
      {openContactMenu && headerData.contactNumbers.length > 0 && (
        <MobileContactMenu data={headerData.contactNumbers} />
      )}
    </div>
  )
}

export default Header
