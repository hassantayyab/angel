import React, { useEffect, useRef, useState } from 'react'
import { ImgAddress } from '../../images'

const Accordian = ({ data, btnIcon, btnText = '+' }) => {
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
    if (data?.length) {
      contentRefs.current = contentRefs.current.slice(0, data.length)
      setActive(['active', ...new Array(data.length - 1).fill('')])
      setHeight([
        `${contentRefs.current[0].scrollHeight}px`,
        ...new Array(data.length - 1).fill('0px'),
      ])
      setIcon(['_', ...new Array(data.length - 1).fill('+')])
      return function cleanup() {}
    }
  }, [data?.length])

  return (
    <>
      {data?.length > 0 && (
        <section id='accordian'>
          {data.map(({ title, places }, i) => (
            <div key={i} className='flex flex-col mb-2'>
              <div>
                <button
                  className={`outline-none bg-blue opener flex items-center justify-between w-full px-6 py-4`}
                  onClick={() => toggleAccordion(i)}
                >
                  <span className='text-white'>{title}</span>

                  <span
                    className={`text-4xl text-white ${
                      active[i] && '-mt-8 w-5'
                    }`}
                    style={{ lineHeight: 0 }}
                  >
                    {active[i] ? '_' : btnText}
                  </span>
                </button>
                <div
                  id='content'
                  ref={(el) => (contentRefs.current[i] = el)}
                  style={{ maxHeight: `${height[i]}` }}
                >
                  <ul className='py-2'>
                    {places.length > 0 &&
                      places.map(({ name }, j) => (
                        <li
                          className='flex justify-center px-4 py-3 cursor-pointer space-x-3 default-transition'
                          key={j}
                        >
                          <img
                            width='auto'
                            height='auto'
                            src={ImgAddress}
                            alt='address icon'
                          />
                          <span className='text-gray font-graphikMedium'>
                            {name}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  )
}

export default Accordian
