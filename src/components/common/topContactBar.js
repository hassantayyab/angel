import { ImgCall, ImgMenu } from '../../images'
import React, { useEffect } from 'react'
import MobileMenu from '../menu/mobile'
import { motion } from 'framer-motion'
import { fadeIn } from '../../animations'
import scrollTo from 'gatsby-plugin-smoothscroll'

const TopContactBar = ({
  data,
  contactFormRef,
  menuData,
  scroll,
  openMenu,
  setOpenMenu,
  setOpenContactMenu,
}) => {
  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [openMenu])

  const handleClick = () => {
    setOpenMenu(!openMenu)
    setOpenContactMenu(false)
  }

  return (
    <>
      {openMenu && (
        <motion.button
          className={`fixed z-50 text-5xl md:text-6xl text-white left-6 md:right-6 md:left-auto md:top-36 ${
            scroll ? 'top-20' : 'top-32'
          }`}
          variants={fadeIn}
          initial='hidden'
          animate='visible'
          onClick={() => setOpenMenu(!openMenu)}
        >
          &times;
        </motion.button>
      )}
      <div className='relative z-50 flex justify-center md:justify-between'>
        <div className='items-center hidden px-6 py-3 text-base font-medium text-white xl:px-12 xl:py-4 lg:flex btn font-graphikMedium bg-blue transform -skew-x-12'>
          {data.length > 0 &&
            data.map(({ number }, i) => (
              <div key={i}>
                <a
                  href={`tel:${number}`}
                  className={`flex content-center border-gray-400 hover:text-yellow default-transition transform skew-x-12 ${
                    i < data.length - 1 && 'border-r pr-3 xl:pr-5'
                  } ${i > 0 && 'pl-3 xl:pl-5'}`}
                >
                  <img
                    width='auto'
                    height='auto'
                    src={ImgCall}
                    alt='call'
                    className='w-6 mr-3'
                  />
                  <span>{number}</span>
                </a>
              </div>
            ))}
        </div>
        <button
          className='hidden px-8 py-3 mr-2 border-l-8 btn bg-yellow border-yellow-dark transform -skew-x-12 lg:block'
          onClick={() => scrollTo(contactFormRef, 'end')}
        >
          <div className='transform skew-x-12'>Schedule Service Now</div>
        </button>

        <div className='w-full overflow-hidden lg:hidden'>
          <div className='flex -mx-2.5 transform -skew-x-12'>
            <button
              className='flex items-center py-3 pl-6 pr-12 text-white btn bg-blue gap-4 hover:bg-blue-light'
              onClick={handleClick}
            >
              <img
                width='auto'
                height='auto'
                src={ImgMenu}
                alt='menu'
                className='w-6 transform skew-x-12'
              />
              <div className='transform skew-x-12'>Menu</div>
            </button>
            <button
              className='w-full border-l-8 btn btn-primary border-yellow-dark'
              onClick={() => scrollTo(contactFormRef, 'end')}
            >
              <div className='transform skew-x-12'>Schedule Service Now</div>
            </button>
          </div>
        </div>
      </div>
      {openMenu && <MobileMenu list={menuData} />}
    </>
  )
}

export default TopContactBar
