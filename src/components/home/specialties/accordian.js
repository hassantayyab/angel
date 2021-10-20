import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useEffect, useRef, useState } from 'react'

const Accordian = ({ data, btnText = '+' }) => {
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
          {data.map((specialty, i) => (
            <div key={i} className='flex flex-col'>
              <div className='border-b-2 border-gray-300 border-opacity-20'>
                <button
                  className={`flex items-center justify-start w-full outline-none bg-transparent ${
                    active[i] && 'bg-yellow'
                  }`}
                  onClick={() => toggleAccordion(i)}
                >
                  <div className='flex items-center justify-between flex-1 px-5 py-4'>
                    <div
                      className={`flex items-center space-x-4 ${
                        active[i] ? 'text-black' : 'text-white'
                      }`}
                    >
                      <GatsbyImage
                        image={getImage(specialty.image?.localFile)}
                        alt={specialty.image?.altText}
                        className={`w-8 filter ${
                          active[i] ? 'brightness-0' : 'brightness-0 invert'
                        }`}
                      />
                      <div
                        className={`font-graphikMedium ${
                          active[i] ? 'text-black' : 'text-white'
                        }`}
                      >
                        {specialty.title}
                      </div>
                    </div>
                    <span
                      className={`text-2xl ${
                        active[i] ? '-mt-6 w-3.5 text-black' : 'text-white'
                      }`}
                      style={{ lineHeight: 0 }}
                    >
                      {active[i] ? '_' : btnText}
                    </span>
                  </div>

                  {/* Content */}
                </button>
                <div
                  id='content'
                  ref={(el) => (contentRefs.current[i] = el)}
                  style={{ maxHeight: `${height[i]}` }}
                >
                  <div className='px-4 pb-4 bg-yellow'>
                    <div className='p-6 text-center bg-yellow-darker'>
                      <div className='mx-auto'>
                        <GatsbyImage
                          image={getImage(specialty.image?.localFile)}
                          alt={specialty.image?.altText}
                          className='inline-block w-16 mb-4 filter brightness-0'
                        />
                      </div>

                      <h4 className='font-graphikMedium'>{specialty.title}</h4>
                      <p className='text-sm text-black'>
                        {specialty.description}
                      </p>
                    </div>
                  </div>
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

//
//
//
//  <Disclosure>
//     {({ open }) => (
//       <>
//         <Disclosure.Button
//           className={`flex items-center justify-start w-full outline-none bg-transparent ${
//             open && 'bg-yellow'
//           }`}
//         >
//           <div
//             className='flex items-center flex-1 px-5 py-4'
//             onClick={setOpenItem}
//           >
//             <div className='flex-1'>{children[0]}</div>
//             {btnIcon ? (
//               <img
//                 width='auto'
//                 height='auto'
//                 src={btnIcon}
//                 alt='expansion arrow'
//                 className={`w-2.5 ml-4 inline-block transform ${
//                   open ? '' : '-rotate-90'
//                 }`}
//               />
//             ) : (
//               <span
//                 className={`text-2xl ${
//                   open ? '-mt-6 w-3.5 text-black' : 'text-white'
//                 }`}
//                 style={{ lineHeight: 0 }}
//               >
//                 {open ? '_' : btnText}
//               </span>
//             )}
//           </div>
//         </Disclosure.Button>
//         <Transition
//           enter='transition duration-100 ease-out'
//           enterFrom='transform scale-95 opacity-0'
//           enterTo='transform scale-100 opacity-100'
//           leave='transition duration-75 ease-out'
//           leaveFrom='transform scale-100 opacity-100'
//           leaveTo='transform scale-95 opacity-0'
//         >
//           <Disclosure.Panel>{children[1]}</Disclosure.Panel>
//         </Transition>
//       </>
//     )}
//   </Disclosure>
