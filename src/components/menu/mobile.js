import { fadeIn } from '../../animations'
import { Link } from 'gatsby'
import React from 'react'
import Container from '../utils/container'
import Accordian from './accordianMobile'
import { motion } from 'framer-motion'

const MobileMenu = ({ list = [] }) => (
  <motion.section
    className='absolute inset-x-0 top-0 bottom-0 z-0 w-full h-screen pt-40 text-white lg:hidden bg-blue'
    variants={fadeIn}
    initial='hidden'
    animate='visible'
  >
    <div className='h-full pb-24 mt-4 overflow-auto'>
      <Container>
        {list.length > 0 &&
          list.map((item) => (
            <Accordian
              key={item.id}
              isExpandable={item.childItems.nodes.length > 0}
            >
              <span className='py-2 mr-4 text-base uppercase font-graphik'>
                <Link to={item.path}>{item.label}</Link>
              </span>
              {item.childItems.nodes.length > 0 && (
                <div className='px-4 pb-2'>
                  {item.childItems.nodes.map((subItem) => (
                    <Accordian
                      key={subItem.id}
                      showBorder={false}
                      isExpandable={subItem.childItems.nodes.length > 0}
                    >
                      <Link
                        className='mr-4 text-base uppercase font-graphik'
                        to={subItem.path}
                      >
                        <span>{subItem.label}</span>
                      </Link>
                      <div className='px-2 pb-2'>
                        {subItem.childItems.nodes.map((itm) => (
                          <div
                            className='flex items-center px-6 py-2 text-sm text-white cursor-pointer text-opacity-80 font-graphik space-x-3 default-transition'
                            key={itm.id}
                          >
                            <span className='bg-white rounded-full bg-opacity-80 w-1.5 h-1.5'></span>
                            <Link to={itm.path}>{itm.label}</Link>
                          </div>
                        ))}
                      </div>
                    </Accordian>
                  ))}
                </div>
              )}
            </Accordian>
          ))}
        <div className='text-center'>
          <button className='px-2 mt-6 mb-3 sm:mr-3 w-72 btn btn-primary'>
            Schedule Service Now
          </button>
          <button className='px-2 w-72 btn btn-secondary'>
            Virtual Estimate
          </button>
        </div>
      </Container>
    </div>
  </motion.section>
)

export default MobileMenu
