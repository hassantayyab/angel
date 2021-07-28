import { Disclosure, Transition } from '@headlessui/react'
import React from 'react'

// This accordian accepts two children templates.
// First as the toggle button text
// Second as the hidden content
const Accordian = ({ children, btnIcon, btnText = '+' }) => (
  <Disclosure defaultOpen='true'>
    {({ open }) => (
      <>
        <Disclosure.Button className='flex items-center justify-between w-full px-6 py-4 outline-none bg-blue'>
          {children[0]}
          {btnIcon ? (
            <img
              src={btnIcon}
              alt='expansion arrow'
              className={`w-2.5 ml-4 inline-flex transform ${
                open ? '' : '-rotate-90'
              }`}
            />
          ) : (
            <span
              className={`text-4xl text-white ${open && '-mt-8 w-5'}`}
              style={{ lineHeight: 0 }}
            >
              {open ? '_' : btnText}
            </span>
          )}
        </Disclosure.Button>
        <Transition
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Disclosure.Panel className='text-gray-500 border-2 border-gray-200'>
            {children[1]}
          </Disclosure.Panel>
        </Transition>
      </>
    )}
  </Disclosure>
)

export default Accordian
