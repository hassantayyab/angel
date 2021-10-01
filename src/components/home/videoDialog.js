import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const VideoDialog = ({ isOpen, setIsOpen, videoUrl }) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as='div'
      className='fixed inset-0 z-50 w-screen h-screen overflow-y-auto'
      onClose={() => setIsOpen(false)}
    >
      <button
        className='fixed z-50 text-5xl text-white right-6 top-4'
        onClick={() => setIsOpen(false)}
      >
        &times;
      </button>

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
          <Dialog.Overlay className='fixed inset-0 h-full bg-black bg-opacity-95' />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className='inline-block h-screen align-middle' aria-hidden='true'>
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
          <div className='inline-block w-full h-full p-6 my-12 overflow-hidden text-center align-middle md:w-3/4 transition-all transform'>
            <div className='relative aspect-w-16 aspect-h-9'>
              <iframe
                title='video'
                className='absolute inset-0 w-full h-full'
                frameBorder='0'
                allowFullScreen
                width='100%'
                height='100%'
                src={videoUrl}
              ></iframe>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
)

export default VideoDialog
