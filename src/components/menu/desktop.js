import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import Container from '../utils/container'
import Frame from '../utils/frame'
import Accordian from './accordian'
import Button from '../utils/button'
import { useMenuDropdownImageQuery } from '../../hooks/useMenuDropdownImageQuery'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import FormDialog from '../dialog-form/formDialog'

const DesktopMenu = ({ list = [], contactNumber, carImage, logo }) => {
  const [expanded, setExpanded] = useState(false)
  const menuImage = useMenuDropdownImageQuery()
  let [isFormModalOpen, setIsFormModalOpen] = useState(false)
  let [type, setType] = useState(null)

  const openFormDialog = (v) => {
    setType(v)
    setIsFormModalOpen(true)
  }

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
          <div className='flex items-center justify-between py-2 font-graphikBold'>
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
                      <div className='flex space-x-8'>
                        <div className='relative w-1/3 col-span-1 h-80'>
                          <GatsbyImage
                            image={getImage(menuImage?.localFile)}
                            alt={menuImage?.altText}
                            className='relative z-10 w-95 h-95'
                          />
                          <div className='absolute bottom-0 right-0 z-0 w-95 h-95'>
                            <Frame />
                          </div>
                        </div>
                        <div>
                          <Accordian data={getChildren(expanded)} />
                        </div>
                        <div className='flex flex-col justify-end pb-12 pl-12 border-l border-white border-opacity-10 transform scale-90'>
                          <Button
                            className='px-2 mb-3 w-72 btn btn-primary transition-all'
                            onClick={() => openFormDialog('service')}
                          >
                            Same Day Services
                          </Button>
                          <Button
                            className='px-2 w-72 btn btn-secondary transition-all'
                            onClick={() => openFormDialog('estimate')}
                          >
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

      {/* VideoDialog */}
      <FormDialog
        contactNumber={contactNumber}
        type={type}
        isOpen={isFormModalOpen}
        setIsOpen={setIsFormModalOpen}
        logo={logo}
        carImage={carImage}
      />
    </nav>
  )
}

export default DesktopMenu
