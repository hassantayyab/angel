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
import Confirmation from './confirmation'

const timeSlots = [
  '9:00am-1:00pm',
  '1:00pm-5:00pm',
  '5:00pm-8:00pm',
  'First Available',
]
const initialState = {
  issue: '',
  details: {
    issue: 'No Cooling',
    message: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
    },
    addressInfo: {
      street: '',
      suite: '',
      city: '',
      state: '',
      zipCode: '',
    },
  },
  schedule: {
    date: new Date(),
    timeSlot: timeSlots[0],
  },
}

const FormDialog = ({ isOpen, setIsOpen, logo, carImage }) => {
  const [mainStep, setMainStep] = useState(1)
  const [subStep, setSubStep] = useState(1)
  const [value, setValue] = useState({ ...initialState })

  const formTitles = [
    'How Can We Help?',
    'Tell Us More',
    'Want To Describe It?',
    'How Can We Reach You?',
    'Where Do You Need Us?',
    'Returning Customer?',
    'Request An Arrival Time',
    "You're All Set!",
  ]

  const checkIfDisabled = useCallback(() => {
    // console.log('value', value)
    if (subStep === 1 && value.issue === '') {
      return true
    }

    if (subStep === 2 && value.details?.issue === '') {
      return true
    }

    if (subStep === 3 && value.details?.message === '') {
      return true
    }

    return false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, subStep])

  const changeNextSteps = () => {
    if (subStep === 8) {
      setIsOpen(false)
    } else {
      if (subStep !== 2 && subStep !== 3 && subStep !== 4) {
        setMainStep(mainStep + 1)
      }

      setSubStep(subStep + 1)
    }
  }

  const changePrevSteps = () => {
    if (subStep !== 3 && subStep !== 4 && subStep !== 5) {
      setMainStep(mainStep - 1)
    }

    setSubStep(subStep - 1)
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

  return (
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
            <div className='inline-block w-full h-full text-center align-middle bg-white shadow-2xl sm:w-5/6 md:w-5/6 lg:w-3/4 xl:w-1/2 transition-all transform rounded-2xl'>
              {logo && (
                <div className='z-20 w-44 absolute-x-center -top-16'>
                  <GatsbyImage
                    image={getImage(logo?.localFile)}
                    alt={logo?.altText}
                  />
                </div>
              )}
              <Dialog.Title className='p-6 text-xl text-center text-white sm:text-3xl bg-blue rounded-t-2xl'>
                {formTitles[mainStep - 1]}
                <div className='mt-3 text-sm font-graphik'>
                  <FormStepper
                    steps={[
                      'issue',
                      'details',
                      'customer',
                      'schedule',
                      'confirm',
                    ]}
                    stepNumber={mainStep}
                  />
                </div>
                {subStep > 1 && (
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
                  subStep === 7 ? 'pb-10' : 'py-10'
                }`}
              >
                {/* Car image */}
                <div className='z-0 w-80 absolute-center'>
                  <GatsbyImage
                    image={getImage(carImage?.localFile)}
                    alt={carImage?.altText}
                  />
                </div>

                <div
                  className={`relative z-10 overflow-auto ${
                    subStep > 1 && 'bg-white bg-opacity-90'
                  } ${subStep !== 7 && 'px-6 sm:px-20 md:px-32 lg:px-44'} ${
                    subStep === 4 || subStep === 5 || subStep === 7
                      ? 'h-96'
                      : 'h-72'
                  }`}
                >
                  {/* Step 1 */}
                  {subStep === 1 && (
                    <IssueForm
                      value={value.issue}
                      setValue={(v) => setValue({ ...value, issue: v })}
                    />
                  )}

                  {/* Step 2 */}
                  {(subStep === 2 ||
                    subStep === 3 ||
                    subStep === 4 ||
                    subStep === 5) && (
                    <Detailsform
                      step={subStep}
                      value={value.details}
                      setValue={(v) => setValue({ ...value, details: v })}
                      nextStep={changeNextSteps}
                    />
                  )}

                  {/* Step 3 */}
                  {subStep === 6 && <CustomerForm />}

                  {/* Step 4 */}
                  {subStep === 7 && (
                    <ScheduleForm
                      timeSlots={timeSlots}
                      value={value.schedule}
                      setValue={(v) => setValue({ ...value, schedule: v })}
                    />
                  )}

                  {/* Step 5 */}
                  {subStep === 8 && <Confirmation />}
                </div>

                {subStep !== 4 && subStep !== 5 && (
                  <div className='inline-block mx-auto mt-6 text-center'>
                    <StepperFormButton
                      step={mainStep}
                      isDisabled={checkIfDisabled()}
                      nextStep={changeNextSteps}
                    >
                      {mainStep > 4 ? 'Close' : 'Continue'}
                    </StepperFormButton>
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default FormDialog
