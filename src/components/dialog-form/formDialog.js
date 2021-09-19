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

const FormDialog = ({ isOpen, setIsOpen, logo, carImage }) => {
  const [mainStep, setMainStep] = useState(1)
  const [step, setStep] = useState(1)
  const [value, setValue] = useState({
    issue: '',
    details: {
      issue: 'No Cooling',
      message: '',
    },
  })

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
    console.log('value', value)
    if (step === 1 && value.issue === '') {
      return true
    }

    if (step === 2 && value.details?.issue === '') {
      return true
    }

    if (step === 3 && value.details?.message === '') {
      return true
    }

    return false
  }, [value, step])

  useEffect(() => {
    if (value) {
      checkIfDisabled()
    }
  }, [value, checkIfDisabled])

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
                {formTitles[step - 1]}
                <div className='mt-3 text-sm font-graphik'>
                  <FormStepper
                    steps={[
                      'issue',
                      'details',
                      'customer',
                      'schedule',
                      'confirm',
                    ]}
                    stepNumber={step}
                  />
                </div>
                {step > 1 && (
                  <button
                    className='fixed z-50 flex flex-col items-center justify-center w-8 h-8 text-2xl bg-white rounded-full text-blue-dark font-graphik left-4 top-4 hover:bg-yellow default-transition'
                    onClick={() => setStep(step - 1)}
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
              <div className='relative flex flex-col justify-between py-10'>
                {/* Car image */}
                <div className='z-0 w-80 absolute-center'>
                  <GatsbyImage
                    image={getImage(carImage?.localFile)}
                    alt={carImage?.altText}
                  />
                </div>

                <div
                  className={`relative z-10 px-8 overflow-auto sm:px-20 md:px-32 lg:px-44 h-72  ${
                    step > 1 && 'bg-white bg-opacity-90'
                  }`}
                >
                  {/* Step 1 */}
                  {step === 1 && (
                    <IssueForm
                      value={value.issue}
                      setValue={(v) => setValue({ ...value, issue: v })}
                    />
                  )}

                  {/* Step 2 */}
                  {(step === 2 || step === 3) && (
                    <Detailsform
                      step={step}
                      value={value.details}
                      setValue={(v) => setValue({ ...value, details: v })}
                    />
                  )}

                  {/* Step 3 */}
                  {step === 4 && <CustomerForm />}

                  {/* Step 4 */}
                  {step === 5 && <ScheduleForm />}

                  {/* Step 5 */}
                  {step === 6 && <Confirmation />}
                </div>

                <div className='inline-block mx-auto mt-6 text-center'>
                  <StepperFormButton
                    step={step}
                    isDisabled={checkIfDisabled()}
                    nextStep={
                      step === 5
                        ? () => setIsOpen(false)
                        : () => setStep(step + 1)
                    }
                  >
                    {step > 4 ? 'Close' : 'Continue'}
                  </StepperFormButton>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default FormDialog
