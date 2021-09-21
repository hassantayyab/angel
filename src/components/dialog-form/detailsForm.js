import { ImgArrowForm } from '../../images'
import { Form, Formik } from 'formik'
import React from 'react'
import { AddressInfoSchema, PersonalInfoSchema } from '../utils/form-utils'
import Accordian from './accordian'
import Chip from './chip'
import FormInput from './form-input'
import { motion } from 'framer-motion'
import { hoverScale, scale } from '../../animations'

const Detailsform = ({ step, value, setValue, nextStep }) => {
  const options = {
    'Heating and Cooling': [
      'No Cooling',
      'No Heat',
      'Water Leak',
      'Other Heating or Cooling Issue',
    ],
    'Ventilation and DuctWork': [
      'Broken Ventilation',
      'Ductwork repair',
      'Other Ventilation and DuctWork Issue',
    ],
  }

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
      <h3 className='mb-4 text-black text-opacity-70 font-graphikMedium'>
        Select Your Issue
      </h3>
      {Object.keys(options).map((title, i) => (
        <Accordian key={i} defaultOpen={i === 0}>
          <h5 className='text-blue font-graphik'>{title}</h5>

          {/* Hidden Content */}
          <div className='flex flex-wrap pb-3'>
            {options[title].map((option, i) => (
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

  const message = () => (
    <>
      <h3 className='mb-4 text-left text-black text-opacity-70 font-graphikMedium'>
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
        {({ dirty, isValid }) => (
          <Form
            method='post'
            name='contact'
            data-netlify='true'
            data-netlify-honeypot='bot-field'
          >
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
      {step === 2 && issueSelection()}
      {step === 3 && message()}
      {step === 4 && personalInfo()}
      {step === 5 && addressInfo()}
    </div>
  )
}

export default Detailsform
