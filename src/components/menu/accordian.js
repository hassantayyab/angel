import { Disclosure, Transition } from '@headlessui/react'
import React from 'react'

const Accordian = ({ children, btnIcon, btnText = '+' }) => (
  <Disclosure>
    {({ open }) => (
      <div className='border-b border-white border-opacity-10'>
        <Disclosure.Button className='flex items-center justify-between w-full px-6 py-4 text-left outline-none bg-blue'>
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
              className={`text-lg text-white w-2.5 text-center ${
                open && '-mt-4'
              }`}
              style={{ lineHeight: 0 }}
            >
              {open && btnText ? '_' : btnText}
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
          <Disclosure.Panel>{children[1]}</Disclosure.Panel>
        </Transition>
      </div>
    )}
  </Disclosure>
)

export default Accordian
