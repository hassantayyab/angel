import { ImgArrowForm } from '../../images'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { AddressInfoSchema, PersonalInfoSchema } from '../utils/form-utils'
import Accordian from './accordian'
import Chip from './chip'
import FormInput from './form-input'
import { motion } from 'framer-motion'
import { hoverScale, scale } from '../../animations'
import { estimateOptions, services, serviceOptions } from './constants'
import { states } from '../common/us-states'

const Detailsform = ({ type, step, issue, value, setValue, nextStep }) => {
  const [fileSizeError, setFileSizeError] = useState(false)

  const options = type === 'service' ? serviceOptions : estimateOptions

  const handlePersonalInfoSubmit = (values) => {
    setValue({ ...value, personalInfo: values })
    nextStep()
  }

  const handleAddressInfoSubmit = (values) => {
    setValue({
      ...value,
      addressInfo: values,
    })
    nextStep()
  }

  const handleFiles = (event) => {
    const newFiles = Array.from(event.target.files).slice(0, 4)

    if (newFiles.find((f) => f.size > 10240000)) {
      setFileSizeError(true)
      return
    }
    setFileSizeError(false)

    if (value.images[0] === '') {
      setValue({
        ...value,
        images: [...newFiles, ...value.images.slice(newFiles.length, 4)],
      })
    } else {
      const filesWithContent = value.images.filter((f) => f)

      if (filesWithContent.length >= 4) {
        return
      }

      const totalFilesWithContent = [
        ...filesWithContent,
        ...newFiles.slice(0, 4 - filesWithContent.length),
      ]

      setValue({
        ...value,
        images: [
          ...totalFilesWithContent,
          ...value.images.slice(totalFilesWithContent.length, 4),
        ],
      })
    }
  }

  const removeFile = (index) => {
    setValue({
      ...value,
      images: [...value.images.map((f, i) => (i === index ? '' : f))],
    })
  }

  // Component Functions
  const issueSelection = () => (
    <>
      <h3 className='mb-6 text-black text-opacity-70 font-graphikMedium'>
        Select Your {services.indexOf(issue) > 1 ? 'Service' : 'Issue'}
      </h3>
      <Accordian
        data={Object.keys(options[issue])}
        issue={issue}
        options={options}
        value={value}
        setValue={(opt) => {
          setValue({ ...value, issue: opt })
          nextStep()
        }}
      />
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
            setValue={() => {
              setValue({ ...value, issue: option })
              nextStep()
            }}
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

  const uploadImages = () => (
    <div className='mx-6 lg:mx-40 sm:mx-20'>
      <h3 className='mb-6 text-left text-black text-opacity-70 font-graphikMedium'>
        Click below to upload photos{' '}
        <span className='text-xl italic font-graphik text-opacity-40'>
          (optional)
        </span>
      </h3>
      <div className='h-96 sm:h-72'>
        <div className='relative h-full py-4 mt-4 border border-dashed rounded border-blue-dark'>
          <input
            className='absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer'
            type='file'
            accept='image/*'
            multiple
            onChange={(e) => handleFiles(e)}
            onClick={(e) => (e.target.value = null)}
          />
          <div className='absolute inset-0 w-full h-full px-6'>
            <div className='items-center justify-center h-full py-4 grid grid-rows-2 grid-cols-2 gap-4'>
              {value.images.map((file, i) => {
                let elem = []
                if (file) {
                  elem = (
                    <img
                      className='object-cover w-full'
                      src={URL.createObjectURL(file)}
                      alt='file'
                    />
                  )
                } else {
                  elem = (
                    <span className='flex flex-col justify-center text-5xl'>
                      +
                    </span>
                  )
                }

                return (
                  <div
                    key={i}
                    className={`relative flex items-stretch h-full w-full sm:h-30 sm:w-30 justify-center border rounded text-blue border-blue-dark ${
                      file ? 'p-0' : 'p-8'
                    } ${i === 0 || i === 2 ? 'ml-auto' : 'mr-auto'}`}
                  >
                    {file && (
                      <button
                        className='absolute z-20 flex flex-col items-center justify-center w-6 h-6 text-xl bg-white border rounded-full text-orange-dark font-graphik shadow-sm border-orange-dark -right-2 -top-2 hover:bg-yellow default-transition'
                        onClick={() => removeFile(i)}
                      >
                        <div>&times;</div>
                      </button>
                    )}
                    {elem}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`mt-2 text-sm text-left text-orange-dark h-4 ${
          !fileSizeError && 'opacity-0'
        }`}
      >
        One or more file size is greater than 10 MB.
      </div>
      <small className='mt-3 text-left text-black text-opacity-50'>
        <div>
          You can upload each file of maximum
          <span className='font-graphikMedium text-black-light ml-0.5'>
            10 MB
          </span>
          .
        </div>
        <div>
          You can also choose to{' '}
          <span className='font-graphikMedium text-black-light ml-0.5'>
            skip
          </span>{' '}
          this step.
        </div>
      </small>
    </div>
  )

  const message = () => (
    <>
      <h3 className='mb-4 text-left text-black-light font-graphikMedium'>
        Tell us more about your request
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
        validateOnMount={true}
        validationSchema={PersonalInfoSchema}
        onSubmit={(values, { setSubmitting }) => {
          handlePersonalInfoSubmit(values, setSubmitting)
        }}
      >
        {({ isValid }) => (
          <Form
            method='post'
            name={
              type === 'service' ? 'same day services' : 'virtual estimates'
            }
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
              whileHover={isValid && hoverScale}
              disabled={!isValid}
            >
              <div
                className={`flex flex-col items-center justify-center px-0 mr-3 border border-black rounded-full w-14 h-14 ${
                  !isValid && 'border-opacity-40'
                }`}
              >
                <img
                  src={ImgArrowForm}
                  className={`w-7 filter ${!isValid && 'contrast-0'}`}
                  alt='arrow'
                />
              </div>
              <div
                className={`text-sm text-black uppercase font-graphikMedium ${
                  !isValid && 'text-opacity-40'
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
        validateOnMount={true}
        validationSchema={AddressInfoSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleAddressInfoSubmit(values, setSubmitting)
        }}
      >
        {({ isValid }) => (
          <Form
            className='flex flex-col h-full'
            method='post'
            name={
              type === 'service' ? 'same day services' : 'virtual estimates'
            }
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
                <FormInput name='state' label='STATE' component='select'>
                  <option disabled value=''>
                    STATE
                  </option>
                  {states.length > 0 &&
                    states.map((s, i) => (
                      <option value={s.abbreviation} key={i}>
                        {s.name}
                      </option>
                    ))}
                </FormInput>
              </div>
            </div>
            <FormInput name='zipCode' label='ZIPCODE' />
            <motion.button
              type='submit'
              className='flex items-center mx-auto mt-6 default-transition'
              variants={scale}
              whileHover={isValid && hoverScale}
              disabled={!isValid}
            >
              <div
                className={`flex flex-col items-center justify-center px-0 mr-3 border border-black rounded-full w-14 h-14 ${
                  !isValid && 'border-opacity-40'
                }`}
              >
                <img
                  src={ImgArrowForm}
                  className={`w-7 filter ${!isValid && 'contrast-0'}`}
                  alt='arrow'
                />
              </div>
              <div
                className={`text-sm text-black uppercase font-graphikMedium ${
                  !isValid && 'text-opacity-40'
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
      {step === 3 && uploadImages()}
      {step === 4 && message()}
      {step === 5 && personalInfo()}
      {step === 6 && addressInfo()}
    </div>
  )
}

export default Detailsform
