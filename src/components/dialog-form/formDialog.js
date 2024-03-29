import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import StepperFormButton from './stepperFormButton'
import FormStepper from './formStepper'
import { ImgArrow } from '../../images'
import IssueForm from './issueForm'
import Detailsform from './detailsForm'
import CustomerForm from './customerForm'
import ScheduleForm from './scheduleForm'
import Summary from './summary'
import { initialState, timeSlots } from './constants'
import { submitServiceForm, submitEstimateForm } from '../utils/form-utils'
import NetlifyHiddenForm from './netlifyHiddenForm'

function formatValues(obj, res = {}) {
  for (let key in obj) {
    if (typeof obj[key] == 'object' && key !== 'images' && key !== 'date') {
      formatValues(obj[key], res)
    } else if (key === 'images') {
      res['img1'] = obj[key][0]
      res['img2'] = obj[key][1]
      res['img3'] = obj[key][2]
      res['img4'] = obj[key][3]
    } else if (key === 'date') {
      res[key] = obj[key].toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } else {
      res[key] = obj[key]
    }
  }
  return res
}

const FormDialog = ({
  contactNumber,
  type,
  isOpen,
  setIsOpen,
  logo,
  carImage,
}) => {
  const [mainStep, setMainStep] = useState(1)
  const [subStep, setSubStep] = useState(1)
  const [value, setValue] = useState({ ...initialState })
  const [submit, setSubmit] = useState({
    sent: false,
    error: false,
    message: '',
  })

  const formTitles = [
    type === 'service' ? 'How Can We Help?' : 'Virtual Estimates',
    'Tell Us More',
    "What's It Look Like?",
    'Want To Describe It?',
    'How Can We Reach You?',
    'Where Do You Need Us?',
    'Returning Customer?',
    'Request An Arrival Time',
    "You're All Set!",
  ]

  const checkIfDisabled = useCallback(() => {
    if (subStep === 1 && value.request === '') {
      return true
    }

    if (subStep === 2 && value.details?.issue === '') {
      return true
    }

    if (subStep === 4 && value.details?.message === '') {
      return true
    }

    return false
  }, [subStep, value])

  const handleNextStep = () => {
    if (subStep === 9) {
      setIsOpen(false)
    } else {
      if (subStep !== 2 && subStep !== 3 && subStep !== 4 && subStep !== 5) {
        setMainStep(mainStep + 1)
      }

      if (subStep === 8) {
        setSubmit({
          sent: false,
          error: true,
          message: 'sending',
        })

        handleSubmit()
      } else {
        setSubStep(subStep + 1)
      }
    }
  }

  const handleSubmit = async () => {
    try {
      if (type === 'service') {
        await submitServiceForm(formatValues(value))
      } else {
        await submitEstimateForm(formatValues(value))
      }
      setSubmit({
        sent: true,
        error: false,
        message: '',
      })
      setSubStep(subStep + 1)
      setMainStep(mainStep + 1)
    } catch (error) {
      setSubmit({
        sent: true,
        error: true,
        message: 'Something went wrong! Please try again.',
      })
    }
  }

  const changePrevSteps = () => {
    if (subStep !== 3 && subStep !== 4 && subStep !== 5 && subStep !== 6) {
      setMainStep(mainStep - 1)
    }

    setSubStep(subStep - 1)
  }

  const getButtonName = () => {
    if (mainStep > 4) {
      return 'Close'
    } else if (mainStep === 4) {
      return 'Request Now'
    } else {
      return 'Continue'
    }
  }

  useEffect(() => {
    if (value) {
      checkIfDisabled()
    }
  }, [value, checkIfDisabled])

  useEffect(() => {
    if (isOpen) {
      setSubStep(1)
      setMainStep(1)
      setValue({ ...initialState })
    }
  }, [isOpen])

  useEffect(() => {
    if (value.schedule.timeSlot && mainStep === 4) {
      handleNextStep()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.schedule.timeSlot, mainStep])

  return (
    <>
      <NetlifyHiddenForm value={value} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-50 w-screen h-screen overflow-y-auto'
          onClose={() => setIsOpen(false)}
        >
          <div className='min-h-screen text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 h-full bg-white bg-opacity-95' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div
                className={`inline-block w-full h-full text-center align-middle bg-white shadow-2xl sm:w-5/6 md:w-5/6 lg:w-3/4 xl:w-1/2 transition-all transform rounded-2xl ${
                  (subStep === 3 ||
                    subStep === 4 ||
                    subStep === 5 ||
                    subStep === 6 ||
                    subStep === 8 ||
                    subStep === 9) &&
                  'mt-16 mb-24'
                }`}
              >
                {logo && (
                  <div className='z-20 w-44 absolute-x-center -top-16'>
                    <GatsbyImage
                      image={getImage(logo?.localFile)}
                      alt={logo?.altText}
                    />
                  </div>
                )}
                <Dialog.Title className='p-6 text-xl text-center text-white sm:text-3xl bg-blue rounded-t-2xl'>
                  {formTitles[subStep - 1]}
                  <div className='mt-3 text-sm font-graphik'>
                    <FormStepper
                      steps={[
                        'issue',
                        'details',
                        'customer',
                        'schedule',
                        'submitted',
                      ]}
                      stepNumber={mainStep}
                    />
                  </div>
                  {mainStep > 1 && mainStep < 5 && (
                    <button
                      className='fixed z-50 flex flex-col items-center justify-center w-8 h-8 text-2xl bg-white rounded-full text-blue-dark font-graphik left-4 top-4 hover:bg-yellow default-transition'
                      onClick={changePrevSteps}
                    >
                      <img
                        src={ImgArrow}
                        className='w-4 filter brightness-0 transform rotate-180'
                        alt='arrow'
                      />
                    </button>
                  )}
                  <button
                    className='fixed z-50 flex flex-col items-center justify-center w-8 h-8 text-2xl bg-white rounded-full text-blue-dark font-graphik right-4 top-4 hover:bg-yellow default-transition'
                    onClick={() => setIsOpen(false)}
                  >
                    <div>&times;</div>
                  </button>
                </Dialog.Title>
                <div
                  className={`relative flex flex-col justify-between ${
                    subStep === 8 || subStep === 9 ? 'pb-10' : 'py-10'
                  }`}
                >
                  {/* Car image */}
                  {mainStep < 5 && (
                    <div className='z-0 w-80 absolute-center'>
                      <GatsbyImage
                        image={getImage(carImage?.localFile)}
                        alt={carImage?.altText}
                      />
                    </div>
                  )}

                  <div
                    className={`relative z-10 overflow-auto ${
                      subStep > 1 && 'bg-white bg-opacity-90'
                    } ${
                      subStep !== 3 &&
                      subStep !== 8 &&
                      subStep !== 9 &&
                      'px-6 sm:px-20 md:px-32 lg:px-40'
                    } ${
                      subStep === 3 ||
                      subStep === 4 ||
                      subStep === 5 ||
                      subStep === 6 ||
                      subStep === 8 ||
                      subStep === 9
                        ? 'h-full'
                        : 'h-72'
                    }`}
                  >
                    {/* Main Step 1 */}
                    {mainStep === 1 && (
                      <IssueForm
                        type={type}
                        value={value.request}
                        setValue={(v) => {
                          setValue({ ...value, request: v })
                          handleNextStep()
                        }}
                      />
                    )}

                    {/* Main Step 2 */}
                    {mainStep === 2 && (
                      <Detailsform
                        type={type}
                        step={subStep}
                        issue={value.request}
                        value={value.details}
                        setValue={(v) => setValue({ ...value, details: v })}
                        nextStep={handleNextStep}
                      />
                    )}

                    {/* Main Step 3 */}
                    {mainStep === 3 && (
                      <CustomerForm
                        value={value.isNewCustomer}
                        setValue={(v) => {
                          setValue({ ...value, isNewCustomer: v })
                          handleNextStep()
                        }}
                      />
                    )}

                    {/* Main Step 4 */}
                    {mainStep === 4 && (
                      <ScheduleForm
                        contactNumber={contactNumber}
                        timeSlots={timeSlots}
                        value={value.schedule}
                        setValue={(v) => setValue({ ...value, schedule: v })}
                        nextStep={handleNextStep}
                      />
                    )}

                    {/* Main Step 5 */}
                    {mainStep === 5 && (
                      <Summary carImage={carImage} value={value} />
                    )}
                  </div>

                  {subStep !== 5 && subStep !== 6 && (
                    <div className='inline-block mx-auto mt-6 text-center'>
                      <StepperFormButton
                        step={mainStep}
                        isDisabled={
                          checkIfDisabled() || submit.message === 'sending'
                        }
                        nextStep={handleNextStep}
                      >
                        {getButtonName()}
                      </StepperFormButton>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default FormDialog
