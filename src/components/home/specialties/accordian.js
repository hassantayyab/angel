import { Disclosure, Transition } from '@headlessui/react'
import React from 'react'

// This accordian accepts two children templates.
// First as the toggle button text
// Second as the hidden content
const Accordian = ({
  isOpen,
  children,
  btnIcon,
  btnText = '+',
  setOpenItem,
}) => (
  <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button
          className={`flex items-center justify-start w-full outline-none bg-transparent ${
            open && 'bg-yellow'
          }`}
        >
          <div
            className='flex items-center flex-1 px-5 py-4'
            onClick={setOpenItem}
          >
            <div className='flex-1'>{children[0]}</div>
            {btnIcon ? (
              <img
                width='auto'
                height='auto'
                src={btnIcon}
                alt='expansion arrow'
                className={`w-2.5 ml-4 inline-block transform ${
                  open ? '' : '-rotate-90'
                }`}
              />
            ) : (
              <span
                className={`text-2xl ${
                  open ? '-mt-6 w-3.5 text-black' : 'text-white'
                }`}
                style={{ lineHeight: 0 }}
              >
                {open ? '_' : btnText}
              </span>
            )}
          </div>
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
      </>
    )}
  </Disclosure>
)

export default Accordian
