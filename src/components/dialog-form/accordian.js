import { ImgDownArrow } from '../../images'
import { Disclosure, Transition } from '@headlessui/react'
import React from 'react'

// This accordian accepts two children templates.
// First as the toggle button text
// Second as the hidden content
const Accordian = ({ children, defaultOpen = false }) => (
  <Disclosure defaultOpen={defaultOpen}>
    {({ open }) => (
      <div className='border-b border-black border-opacity-60'>
        <Disclosure.Button className='flex items-center justify-between w-full py-3 bg-transparent outline-none'>
          {children[0]}
          <img
            width='auto'
            height='auto'
            src={ImgDownArrow}
            alt='expansion arrow'
            className={`w-3 inline-flex`}
          />
        </Disclosure.Button>
        <Transition
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Disclosure.Panel className='bg-transparent'>
            {children[1]}
          </Disclosure.Panel>
        </Transition>
      </div>
    )}
  </Disclosure>
)

export default Accordian
