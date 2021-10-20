import { Link } from 'gatsby'
import React, { useEffect, useRef, useState } from 'react'

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
    contentRefs.current = contentRefs.current.slice(0, data.length)
    setActive(new Array(data.length).fill(''))
    setHeight(new Array(data.length).fill('0px'))
    setIcon(new Array(data.length).fill('+'))
    return function cleanup() {}
  }, [data.length])

  return (
    <section id='accordian'>
      {data.map((item, i) => (
        <div key={i} className='flex flex-col'>
          <div className='border-b border-white border-opacity-10 pb-0.5'>
            <button
              className={`outline-none bg-blue opener flex items-center justify-between w-full px-6 py-4`}
              onClick={() => toggleAccordion(i)}
            >
              <Link
                className='mr-6 text-sm text-left uppercase font-graphikMedium'
                to={item.path}
              >
                {item.label}
              </Link>

              {/* Toggle Icon */}
              {item.childItems.nodes.length > 0 && (
                <span
                  className={`text-lg text-white w-2.5 text-center ${
                    active[i] && '-mt-4'
                  }`}
                  style={{ lineHeight: 0 }}
                >
                  {active[i] ? '_' : btnText}
                </span>
              )}
            </button>
            <div
              id='content'
              ref={(el) => (contentRefs.current[i] = el)}
              style={{ maxHeight: `${height[i]}` }}
            >
              {item.childItems.nodes.length > 0 && (
                <ul className=''>
                  {item.childItems.nodes.map((item) => (
                    <li
                      className='flex items-center px-6 py-2 text-sm text-white cursor-pointer text-opacity-80 font-graphik space-x-3 default-transition'
                      key={item.id}
                    >
                      <span className='bg-white rounded-full bg-opacity-80 w-1.5 h-1.5'></span>
                      <Link to={item.path}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Accordian
