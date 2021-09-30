import { Transition } from '@headlessui/react'
import React, { useEffect, useRef, useState } from 'react'
import Triangle from './triangle'

function useOutsideAlerter(ref, setOpen) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, setOpen])
}

const SelectionInput = ({ label, options, value, setValue }) => {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState(value)
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setOpen)

  const onSelection = (i) => {
    setSelection(options[i])
    setOpen(false)
    setValue(options[i])
  }

  return (
    <div ref={wrapperRef}>
      <button
        type='button'
        className='flex items-center justify-between w-full py-1 pl-8 pr-1 border border-blue'
        onClick={() => setOpen(!open)}
      >
        <div className='text-sm text-black text-opacity-75 font-graphikMedium'>
          {selection !== '' ? selection : label}
        </div>
        <div className='py-3 px-2.5 bg-orange'>
          <Triangle />
        </div>
      </button>

      {/* Dropdown */}
      {options.length > 0 && (
        <Transition
          show={open}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='border-l border-r border-blue'>
            <ul className='flex flex-col text-left'>
              {options.map((option, i) => (
                <li
                  className='w-full px-8 py-3 text-sm text-black bg-white border-b cursor-pointer text-opacity-75 font-graphikMedium border-blue default-transition hover:bg-blue hover:text-white'
                  key={i}
                  onClick={() => onSelection(i)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </Transition>
      )}
    </div>
  )
}

export default SelectionInput
