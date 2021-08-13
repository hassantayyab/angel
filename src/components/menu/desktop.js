import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import Container from '../utils/container'
import { ImgDropdown } from '../../images'
import Frame from '../utils/frame'
import Accordian from './accordian'
import Button from '../utils/button'

const DesktopMenu = ({ list = [] }) => {
  const [expanded, setExpanded] = useState(false)

  function getChildren(index) {
    return list[index].childItems.nodes
  }

  function initSetExpand(index) {
    if (getChildren(index).length <= 0) {
      setExpanded(false)
      return
    }

    setExpanded(index)
  }

  useEffect(() => {
    window.onscroll = () => {
      setExpanded(false)
    }
  }, [])

  return (
    <nav onMouseLeave={() => setExpanded(false)}>
      <Container>
        <div className='relative z-30 hidden py-5 lg:block'>
          <div className='flex content-center justify-between py-2 font-graphikBold'>
            {list.map((item, index) => (
              <Popover key={item.id} className='relative'>
                <Popover.Button onMouseEnter={() => initSetExpand(index)}>
                  <Link
                    to={item.path}
                    className='py-2 uppercase hover:text-yellow default-transition'
                    activeClassName='active-link'
                  >
                    {item.label}
                  </Link>
                </Popover.Button>
                {expanded !== false && getChildren(expanded).length > 0 && (
                  <Popover.Panel
                    className='fixed left-0 w-screen py-20 mt-6 text-white bg-blue'
                    onMouseLeave={() => setExpanded(false)}
                    static
                  >
                    <Container>
                      <div className='flex gap-x-8'>
                        <div className='relative col-span-1 h-80'>
                          <img
                            src={ImgDropdown}
                            alt='map'
                            className='relative z-10 object-cover w-full h-full pb-3 pr-3'
                          />
                          <div className='absolute bottom-0 right-0 z-0 w-92 h-92'>
                            <Frame />
                          </div>
                        </div>
                        <div>
                          {getChildren(expanded).map((item) => (
                            <Accordian key={item.id}>
                              <Link
                                className='mr-6 text-sm uppercase font-graphikMedium'
                                to={item.path}
                              >
                                {item.label}
                              </Link>
                              <ul className='pb-2'>
                                {item.childItems.nodes.length > 0 &&
                                  item.childItems.nodes.map((item) => (
                                    <li
                                      className='flex items-center px-6 py-2 text-sm text-white cursor-pointer text-opacity-80 font-graphik gap-3 default-transition'
                                      key={item.id}
                                    >
                                      <span className='bg-white rounded-full bg-opacity-80 w-1.5 h-1.5'></span>
                                      <Link to={item.path}>{item.label}</Link>
                                    </li>
                                  ))}
                              </ul>
                            </Accordian>
                          ))}
                        </div>
                        <div className='flex flex-col justify-end pb-12 pl-12 border-l border-white border-opacity-10 transform scale-90'>
                          <Button className='px-2 mb-3 w-72 btn btn-primary transition-all'>
                            Schedule Service Now
                          </Button>
                          <Button className='px-2 w-72 btn btn-secondary transition-all'>
                            Virtual Estimate
                          </Button>
                        </div>
                      </div>
                    </Container>
                  </Popover.Panel>
                )}
              </Popover>
            ))}
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default DesktopMenu
