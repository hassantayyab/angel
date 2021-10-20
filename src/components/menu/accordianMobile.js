import { Link } from 'gatsby'
import React, { useEffect, useRef, useState } from 'react'

const Accordian = ({ data, btnText = '+', isLastChild = false }) => {
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
      setActive(new Array(data.length).fill(''))
      setHeight(new Array(data.length).fill('0px'))
      setIcon(new Array(data.length).fill('+'))
    }
  }, [data?.length])

  return (
    <section id='accordian'>
      {data?.map((item, i) => (
        <div key={i} className='flex flex-col'>
          <div
            className={`${
              !isLastChild
                ? 'border-b border-white border-opacity-10 pb-0.5'
                : 'pl-4'
            } `}
          >
            <button
              className={`outline-none bg-blue opener flex items-center justify-between w-full  ${
                !isLastChild ? 'px-2 py-4' : 'px-4 py-3'
              }`}
              onClick={() => toggleAccordion(i)}
            >
              <Link
                className='mr-4 text-base text-left uppercase font-graphik'
                to={item.path}
              >
                <span>{item.label}</span>
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
              {!isLastChild ? (
                <Accordian data={item.childItems.nodes} isLastChild={true} />
              ) : (
                <div className='px-2 pb-2'>
                  {item.childItems.nodes.map((itm) => (
                    <div
                      className='flex items-center px-6 py-2 text-sm text-white cursor-pointer text-opacity-80 font-graphik space-x-3 default-transition'
                      key={itm.id}
                    >
                      <span className='bg-white rounded-full bg-opacity-80 w-1.5 h-1.5'></span>
                      <Link to={itm.path}>{itm.label}</Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Accordian
