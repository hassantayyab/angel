import { ImgBackground, ImgForm, ImgSubmit } from '../../images'
import React, { useState } from 'react'
import Layout from '../utils/layout'
import Frame from '../utils/frame'
import FormInput from './form-input'
import { Form, Formik } from 'formik'
import { Schema, submitForm } from '../utils/form-utils'
import { navigate } from 'gatsby'
import Separator from '../utils/separator'
import { useContactQuery } from '../../hooks/contactQuery'
import BackgroundImage from '../utils/backgroundImage'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Contact = () => {
  const data = useContactQuery()
  const [submit, setSubmit] = useState({
    sent: false,
    error: false,
    message: '',
  })

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    try {
      await submitForm(values, setSubmitting, resetForm)
      navigate('/your-form-was-submitted/')
      resetForm()
    } catch (error) {
      setSubmit({
        sent: true,
        error: true,
        message: 'Something went wrong! Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='relative py-20 xl:mb-20'>
      <BackgroundImage
        image={getImage(data.formBgImage?.localFile)}
        alt={data.formBgImage?.altText}
        loading='lazy'
        className='absolute inset-0 object-cover w-full h-full'
      />
      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(90deg, rgba(0,74,143,1) 0%, rgba(0,74,143,0.9) 0%)',
        }}
      ></div>
      <Layout>
        <section className='relative md:grid grid-cols-2 gap-12'>
          <div className='relative mb-0 xl:-mb-40 mw-sub-page'>
            <div className='relative z-10 object-cover w-full h-64 pl-6 mr-6 -ml-6 -top-6 md:top-8 md:w-auto md:pr-0 md:h-auto'>
              <GatsbyImage
                image={getImage(data.formImage?.localFile)}
                alt={data.formImage?.altText}
              />
            </div>
            <div className='absolute top-0 bottom-0 right-0 z-0 h-contact-frame w-92'>
              <Frame />
            </div>
          </div>

          <div className='flex flex-col justify-center mt-12 md:mt-0'>
            {/* Header */}
            <div className='mb-4 text-center text-white uppercase md:text-left'>
              <h5 className='mb-1 tracking-wider font-graphikMedium'>
                Contact
              </h5>
              <h2>{data.formHeading}</h2>
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
                city: '',
                state: '',
                services: '',
                message: '',
              }}
              validationSchema={Schema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                handleSubmit(values, setSubmitting, resetForm)
              }}
            >
              {({ isSubmitting }) => (
                <Form
                  method='post'
                  name='contact'
                  data-netlify='true'
                  data-netlify-honeypot='bot-field'
                >
                  <div className='flex flex-col items-end justify-between mb-6 gap-8 sm:flex-row'>
                    <FormInput name='fullName' label='Full Name' />
                    <FormInput type='email' name='email' label='Email' />
                  </div>

                  <div className='flex flex-col items-end justify-between my-8 gap-8 sm:flex-row'>
                    <FormInput name='phone' label='Phone' />
                    <FormInput name='city' label='City' component='select'>
                      <option disabled value=''>
                        City
                      </option>
                      <option value='islamabad'>Islamabad</option>
                      <option value='lahore'>Lahore</option>
                      <option value='karachi'>Karachi</option>
                    </FormInput>
                  </div>

                  <div className='flex flex-col items-end justify-between mb-8 gap-8 sm:flex-row'>
                    <FormInput name='state' label='State' />
                    <FormInput
                      name='services'
                      label='Services'
                      component='select'
                    >
                      <option disabled value=''>
                        Services
                      </option>
                      <option value='heating'>Heating</option>
                      <option value='installation'>Installation</option>
                    </FormInput>
                  </div>

                  <div className='relative'>
                    <FormInput
                      name='message'
                      label='Describe Your Case'
                      className='textarea'
                      component='textarea'
                      rows='2'
                    />

                    <button
                      className='absolute right-0 p-2 rounded-full -bottom-4 sm:-bottom-6 bg-yellow hover:bg-yellow-dark default-transition'
                      disabled={isSubmitting}
                    >
                      <img
                        src={ImgSubmit}
                        alt='submit form'
                        className='w-8 sm:w-12'
                      />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </Layout>
    </div>
  )
}

export default Contact
