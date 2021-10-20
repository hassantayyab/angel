import { fadeIn } from '../../animations'
import React, { useState } from 'react'
import Container from '../utils/container'
import Accordian from './accordianMobile'
import { motion } from 'framer-motion'
import Button from '../utils/button'
import FormDialog from '../dialog-form/formDialog'

const MobileMenu = ({ list = [], contactNumber, carImage, logo }) => {
  let [isFormModalOpen, setIsFormModalOpen] = useState(false)
  let [type, setType] = useState(null)

  const openFormDialog = (v) => {
    setType(v)
    setIsFormModalOpen(true)
  }

  return (
    <motion.section
      className='absolute inset-x-0 top-0 bottom-0 z-0 w-full h-screen pt-40 text-white lg:hidden bg-blue'
      variants={fadeIn}
      initial='hidden'
      animate='visible'
    >
      <div className='h-full pb-24 mt-4 overflow-auto'>
        <Container>
          <Accordian data={list} />
          <div className='text-center'>
            <Button
              className='px-2 mt-6 mb-3 sm:mr-3 w-72 btn btn-primary'
              onClick={() => openFormDialog('service')}
            >
              Same Day Services
            </Button>
            <Button
              className='px-2 w-72 btn btn-secondary'
              onClick={() => openFormDialog('estimate')}
            >
              Virtual Estimate
            </Button>
          </div>
        </Container>
      </div>

      {/* VideoDialog */}
      <FormDialog
        contactNumber={contactNumber}
        type={type}
        isOpen={isFormModalOpen}
        setIsOpen={setIsFormModalOpen}
        logo={logo}
        carImage={carImage}
      />
    </motion.section>
  )
}

export default MobileMenu
