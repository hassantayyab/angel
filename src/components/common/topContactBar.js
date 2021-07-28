import { ImgCall, ImgMenu } from '../../images'
import React from 'react'

const TopContactBar = ({ data }) => (
  <div className='flex justify-center md:justify-between'>
    <div className='items-center hidden px-6 py-3 text-base font-medium text-white xl:px-12 xl:py-4 lg:flex btn font-graphikMedium bg-blue transform -skew-x-12'>
      {data.length > 0 &&
        data.map(({ number }, i) => (
          <div key={i}>
            <a
              href={`tel:${number}`}
              className={`flex content-center border-gray-400 hover:text-yellow default-transition transform skew-x-12 ${
                i < data.length - 1 && 'border-r pr-3 xl:pr-5'
              } ${i > 0 && 'pl-3 xl:pl-5'}`}
            >
              <img src={ImgCall} alt='call' className='w-6 mr-3' />
              <span>{number}</span>
            </a>
          </div>
        ))}
    </div>
    <button className='hidden px-8 py-3 mr-2 border-l-8 btn bg-yellow border-yellow-dark transform -skew-x-12 lg:block'>
      <div className='transform skew-x-12'>Schedule Service Now</div>
    </button>

    <div className='w-full overflow-hidden lg:hidden'>
      <div className='flex -mx-2.5 transform -skew-x-12'>
        <button className='flex items-center py-3 pl-6 pr-12 text-white btn bg-blue gap-4 hover:bg-blue-light'>
          <img src={ImgMenu} alt='menu' className='w-6 transform skew-x-12' />
          <div className='transform skew-x-12'>Menu</div>
        </button>
        <button className='w-full border-l-8 btn btn-primary border-yellow-dark '>
          <div className='transform skew-x-12'>Schedule Service Now</div>
        </button>
      </div>
    </div>
  </div>
)

export default TopContactBar
