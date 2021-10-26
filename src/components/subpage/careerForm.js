import { ImgSubmit } from '../../images'
import React, { useEffect, useState } from 'react'
import Container from '../utils/container'
import Frame from '../utils/frame'
import { Form, Formik } from 'formik'
import { CareenSchema, submitCareerForm } from '../utils/form-utils'
import Separator from '../utils/separator'
import { useContactQuery } from '../../hooks/contactQuery'
import BackgroundImage from '../utils/backgroundImage'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import { defaultTransition, slideDown, slideUp, View } from '../../animations'
import { useAnimation } from 'framer-motion'
import Subtitle from '../utils/subititle'
import Title from '../utils/title'
import Button from '../utils/button'
import FormInput from '../common/form-input'

const CareerForm = () => {
  const data = useContactQuery()
  const [fileSizeError, setFileSizeError] = useState(false)
  const [file, setFile] = useState(false)
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false)
  const [submit, setSubmit] = useState({
    sent: false,
    error: false,
    message: 'Hello!',
  })

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const valuesWithFile = { ...values, file }

    try {
      await submitCareerForm(valuesWithFile)
      setFile(null)
      setSubmit({
        sent: true,
        error: false,
        message: 'Submitted Successfully!',
      })
      setTimeout(() => {
        setSubmitButtonClicked(false)
        setFile(false)
        setSubmit({
          sent: false,
          error: false,
          message: '',
        })
      }, 5000)
      resetForm()
    } catch (error) {
      setFile(null)
      setSubmit({
        sent: true,
        error: true,
        message: 'Something went wrong! Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const [ref, inView] = useInView(View)
  const animateTitle = useAnimation()
  const animateSubtitle = useAnimation()
  useEffect(() => {
    if (inView) {
      animateTitle.start({
        ...slideDown.visible,
        ...defaultTransition,
      })

      animateSubtitle.start({
        ...slideUp.visible,
        ...defaultTransition,
      })
    }
  }, [inView, animateTitle, animateSubtitle])

  const handleFiles = (event) => {
    const newFile = Array.from(event.target.files)[0]

    if (newFile.size > 10240000) {
      setFileSizeError(true)
      return
    }
    setFileSizeError(false)
    setFile(newFile)
    setSubmitButtonClicked(false)
  }

  return (
    <section className='relative py-12 xl:mb-20' id='contactForm' ref={ref}>
      <BackgroundImage
        image={getImage(data.formBgImage?.localFile)}
        alt={data.formBgImage?.altText}
      />
      <div className='absolute inset-0'></div>
      <Container>
        <section className='relative md:grid grid-cols-2 gap-12'>
          <div className='relative mb-0 lg:-mb-20 mw-sub-page'>
            <div className='relative z-10 object-cover w-full h-64 pl-6 mr-6 -ml-6 overflow-hidden -top-6 md:top-8 md:w-auto md:pr-0 md:h-auto'>
              <GatsbyImage
                image={getImage(data.formImage?.localFile)}
                alt={data.formImage?.altText}
              />
            </div>
            <div className='absolute top-0 bottom-0 right-0 z-0 h-contact-frame w-92'>
              <Frame />
            </div>
          </div>

          <div className='flex flex-col justify-center mt-12 md:mt-2'>
            {/* Header */}
            <div className='mb-4 text-center text-white uppercase md:text-left'>
              <Subtitle
                className='mb-1 tracking-wider font-graphikMedium'
                animate={animateSubtitle}
              >
                Contact
              </Subtitle>
              <Title animate={animateTitle}>Apply Now</Title>
            </div>

            {/* Separator */}
            <div className='w-1/2 mx-auto mt-4 mb-8 sm:w-1/3 md:w-1/4 md:mx-0'>
              <Separator color='white' />
            </div>

            {/* Form */}
            <Formik
              initialValues={{
                fullName: '',
                email: '',
                phone: '',
                position: '',
              }}
              validationSchema={CareenSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                handleSubmit(values, setSubmitting, resetForm)
              }}
            >
              {({ isSubmitting }) => (
                <Form
                  method='post'
                  name='career'
                  data-netlify='true'
                  data-netlify-honeypot='bot-field'
                >
                  <div className='flex flex-col items-end justify-between mb-6 sm:space-x-8 sm:space-y-0 space-y-8 sm:flex-row'>
                    <FormInput name='fullName' label='Full Name' />
                    <FormInput type='email' name='email' label='Email' />
                  </div>

                  <div className='flex flex-col items-end justify-between my-8 sm:space-x-8 sm:space-y-0 space-y-8 sm:flex-row'>
                    <FormInput name='phone' label='Phone' />
                    <FormInput
                      name='position'
                      label='Interested position'
                      component='select'
                    >
                      <option value='' disabled>
                        Interested position
                      </option>
                      <option value='hvac technician'>HVAC Technician</option>
                      <option value='hvac installer'>HVAC Installer</option>
                      <option value='sales'>Sales</option>
                    </FormInput>
                  </div>

                  <div className='relative'>
                    {/* File upload */}
                    <div className='w-1/3'>
                      <input
                        id='career-file'
                        name='file'
                        className='text-white bg-transparent cursor-pointer'
                        type='file'
                        accept='.pdf,.txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        multiple
                        onChange={(e) => handleFiles(e)}
                        onClick={(e) => (e.target.value = null)}
                      />
                    </div>
                    <small className='mt-4 text-left text-white text-opacity-70'>
                      You can upload a file of maximum 10 MB.
                    </small>
                    {fileSizeError && (
                      <div
                        className={`mt-2 text-sm text-left text-orange-dark h-4`}
                      >
                        File size is greater than 10 MB.
                      </div>
                    )}

                    {submitButtonClicked && file === false && (
                      <div
                        className={`mt-2 text-sm text-left text-orange-dark h-4`}
                      >
                        File is required.
                      </div>
                    )}

                    <Button
                      className='absolute right-0 p-2 rounded-full -bottom-4 sm:-bottom-6 bg-yellow hover:bg-yellow-dark default-transition'
                      disabled={isSubmitting}
                      onClick={() => setSubmitButtonClicked(true)}
                    >
                      <img
                        width='auto'
                        height='auto'
                        src={ImgSubmit}
                        alt='submit form'
                        className='w-8 sm:w-12'
                      />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            <small
              className={`h-4 mt-2 text-sm text-green-500 font-graphikMedium ${
                !submit.sent && 'opacity-0'
              }`}
            >
              {submit.message}
            </small>
          </div>
        </section>
      </Container>
    </section>
  )
}

export default CareerForm
