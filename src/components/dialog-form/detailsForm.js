import { ImgArrowForm } from '../../images'
import { Form, Formik } from 'formik'
import React from 'react'
import { AddressInfoSchema, PersonalInfoSchema } from '../utils/form-utils'
import Accordian from './accordian'
import Chip from './chip'
import FormInput from './form-input'
import { motion } from 'framer-motion'
import { hoverScale, scale } from '../../animations'
import { estimateOptions, services, serviceOptions } from './constants'

const Detailsform = ({ type, step, issue, value, setValue, nextStep }) => {
  const options = type === 'service' ? serviceOptions : estimateOptions

  const handlePersonalInfoSubmit = (values) => {
    setValue({ ...value, personalInfo: values })
    nextStep()
  }

  const handleAddressInfoSubmit = (values) => {
    setValue({ ...value, addressInfo: values })
    nextStep()
  }

  const issueSelection = () => (
    <>
      <h3 className='mb-6 text-black text-opacity-70 font-graphikMedium'>
        Select Your {services.indexOf(issue) > 1 ? 'Service' : 'Issue'}
      </h3>
      {Object.keys(options[issue]).map((title, i) => (
        <Accordian key={i} defaultOpen={i === 0}>
          <h5 className='text-blue font-graphik'>{title}</h5>

          {/* Hidden Content */}
          <div className='flex flex-wrap pb-3'>
            {options[issue][title].map((option, i) => (
              <Chip
                className='mb-3 mr-3'
                key={i}
                selected={option === value?.issue}
                value={value}
                setValue={() => setValue({ ...value, issue: option })}
              >
                {option}
              </Chip>
            ))}
          </div>
        </Accordian>
      ))}
    </>
  )

  const platformSelection = () => (
    <>
      <h3 className='mb-6 text-left text-black text-opacity-70 font-graphikMedium'>
        Which meeting platform do you prefer?
      </h3>
      <div className='flex flex-wrap pb-4 border-b border-black border-opacity-60'>
        {estimateOptions.map((option, i) => (
          <Chip
            className='mb-3 mr-3'
            key={i}
            selected={option === value?.issue}
            value={value}
            setValue={() => setValue({ ...value, issue: option })}
          >
            {option}
          </Chip>
        ))}
      </div>
      <p className='pt-6 text-sm text-left text-black text-opacity-60'>
        We will be contacting you to confirm a meeting time and platform. We
        will then join you at the requested time on the platform of your choice.
      </p>
    </>
  )

  const message = () => (
    <>
      <h3 className='mb-4 text-left text-black-light font-graphikMedium'>
        Tell Us more about your request
      </h3>
      <textarea
        className='w-full p-3 bg-transparent border border-blue'
        rows='8'
        placeholder='Provide details about your request here'
        value={value.message}
        onChange={(e) => setValue({ ...value, message: e.target.value })}
      ></textarea>
    </>
  )

  const personalInfo = () => (
    <>
      <Formik
        initialValues={value.personalInfo}
        validationSchema={PersonalInfoSchema}
        onSubmit={(values, { setSubmitting }) => {
          handlePersonalInfoSubmit(values, setSubmitting)
        }}
      >
        {(f) => (
          <Form
            method='post'
            name='contact'
            data-netlify='true'
            data-netlify-honeypot='bot-field'
          >
            <div>{JSON.stringify(f.null, 2)}</div>
            <FormInput name='firstName' label='FIRST NAME' />
            <FormInput name='lastName' label='LAST NAME' />
            <FormInput name='mobile' label='MOBILE NUMBER' />
            <FormInput type='email' name='email' label='EMAIL' />
            <small className='flex text-left text-black text-opacity-50'>
              We’ll send you a text message and email to confirm your
              appointment and to provide you with other updates, if need be.
            </small>

            <motion.button
              type='submit'
              className='flex items-center mx-auto mt-6 default-transition'
              variants={scale}
              whileHover={f.isValid && f.dirty && hoverScale}
              disabled={!(f.isValid && f.dirty)}
            >
              <div
                className={`flex flex-col items-center justify-center px-0 mr-3 border border-black rounded-full w-14 h-14 ${
                  !(f.isValid && f.dirty) && 'border-opacity-40'
                }`}
              >
                <img
                  src={ImgArrowForm}
                  className={`w-7 filter ${
                    !(f.isValid && f.dirty) && 'contrast-0'
                  }`}
                  alt='arrow'
                />
              </div>
              <div
                className={`text-sm text-black uppercase font-graphikMedium ${
                  !(f.isValid && f.dirty) && 'text-opacity-40'
                }`}
              >
                Continue
              </div>
            </motion.button>
          </Form>
        )}
      </Formik>
    </>
  )

  const addressInfo = () => (
    <>
      <Formik
        initialValues={value.addressInfo}
        validationSchema={AddressInfoSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleAddressInfoSubmit(values, setSubmitting)
        }}
      >
        {({ dirty, isValid }) => (
          <Form
            className='flex flex-col h-full'
            method='post'
            name='contact'
            data-netlify='true'
            data-netlify-honeypot='bot-field'
          >
            <FormInput name='street' label='STREET ADDRESS' />
            <FormInput name='suite' label='UNIT/APARTMENT/SUITE' />
            <div className='flex'>
              <div className='w-3/4 mr-6'>
                <FormInput name='city' label='CITY' />
              </div>
              <div>
                <FormInput name='state' label='STATE' />
              </div>
            </div>
            <FormInput name='zipCode' label='ZIPCODE' />
            <motion.button
              type='submit'
              className='flex items-center mx-auto mt-6 default-transition'
              variants={scale}
              whileHover={isValid && dirty && hoverScale}
              disabled={!(isValid && dirty)}
            >
              <div
                className={`flex flex-col items-center justify-center px-0 mr-3 border border-black rounded-full w-14 h-14 ${
                  !(isValid && dirty) && 'border-opacity-40'
                }`}
              >
                <img
                  src={ImgArrowForm}
                  className={`w-7 filter ${
                    !(isValid && dirty) && 'contrast-0'
                  }`}
                  alt='arrow'
                />
              </div>
              <div
                className={`text-sm text-black uppercase font-graphikMedium ${
                  !(isValid && dirty) && 'text-opacity-40'
                }`}
              >
                Continue
              </div>
            </motion.button>
          </Form>
        )}
      </Formik>
    </>
  )

  return (
    <div className='h-full pb-4'>
      {step === 2 && type === 'service' && issueSelection()}
      {step === 2 && type === 'estimate' && platformSelection()}
      {step === 3 && message()}
      {step === 4 && personalInfo()}
      {step === 5 && addressInfo()}
    </div>
  )
}

export default Detailsform
