import { Link } from 'gatsby'
import React from 'react'
import { Popover } from '@headlessui/react'

const Panel = ({ list = [] }) => {
  return (
    <Popover.Panel>
      <img src='' alt='' />
      {list.map((item) => (
        // Can be nested further using Disclosure (headless UI).
        <span className='pl-10' key={item.id}>
          - {item.label}
        </span>
      ))}
    </Popover.Panel>
  )
}

const DesktopMenu = ({ list = [] }) => {
  function getChildren(index) {
    return list[index].childItems.nodes
  }

  return (
    <nav className='hidden my-5 lg:block'>
      <div className='flex content-center justify-between py-2 font-graphikBold'>
        {list.map((item, index) => (
          <Popover key={item.id}>
            <Popover.Button>
              <Link
                to={item.path}
                className='py-2 uppercase hover:text-yellow default-transition'
                activeClassName='active-link'
              >
                {item.label}
              </Link>
            </Popover.Button>
            {getChildren(index).length !== 0 && (
              <Panel list={getChildren(index)} />
            )}
          </Popover>
        ))}
      </div>
    </nav>
  )
}

export default DesktopMenu
