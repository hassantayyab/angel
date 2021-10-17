import { ImgDownArrow } from '../../images'
import React, { useEffect, useRef, useState } from 'react'
import Chip from './chip'

const Accordian = ({ data, issue, options, setValue, value }) => {
  const [active, setActive] = useState([])
  const [height, setHeight] = useState([])
  const [icon, setIcon] = useState([])
  const contentRefs = useRef([])

  const toggleAccordion = (i) => {
    setActive(
      active.map((el, idx) => {
        if (idx === i) {
          return el === 'active' ? '' : 'active'
        } else {
          return ''
        }
      })
    )

    setHeight(
      height.map((el, idx) =>
        idx === i
          ? active[idx] === 'active'
            ? '0px'
            : `${contentRefs.current[i].scrollHeight}px`
          : '0px'
      )
    )

    setIcon(
      icon.map((el, idx) =>
        idx === i ? (active[idx] === 'active' ? '+' : '_') : '+'
      )
    )
  }

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, data.length)
    setActive(['active', ...new Array(data.length - 1).fill('')])
    setHeight([
      `${contentRefs.current[0].scrollHeight}px`,
      ...new Array(data.length - 1).fill('0px'),
    ])
    setIcon(['_', ...new Array(data.length).fill('+')])
    return function cleanup() {}
  }, [data.length])

  return (
    <section id='accordian'>
      {data.map((title, i) => (
        <div key={i} className='flex flex-col mb-2'>
          <div className='border-b border-black border-opacity-60'>
            <button
              className='flex items-center justify-between w-full py-3 bg-transparent outline-none'
              onClick={() => toggleAccordion(i)}
            >
              <h5 className='text-blue font-graphik'>{title}</h5>

              <img
                width='auto'
                height='auto'
                src={ImgDownArrow}
                alt='expansion arrow'
                className={`w-2.5 ml-4 inline-flex transform ${
                  active[i] ? '' : '-rotate-90'
                }`}
              />
            </button>
            {/* Hidden Content */}
            <div
              id='content'
              className='flex flex-wrap'
              ref={(el) => (contentRefs.current[i] = el)}
              style={{ maxHeight: `${height[i]}` }}
            >
              {options[issue][title].map((option, i) => (
                <Chip
                  className='mb-3 mr-3'
                  key={i}
                  selected={option === value?.issue}
                  value={value}
                  setValue={() => setValue(option)}
                >
                  {option}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Accordian
