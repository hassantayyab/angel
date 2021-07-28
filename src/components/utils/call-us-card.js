import { ImgCallCard, ImgPerk } from '../../images'
import React from 'react'

const CallUsCard = ({ data }) => (
  <a
    href='tel:610.379.3993'
    className='relative block sm:grid grid-cols-5 hover:shadow-xl default-transition mw-sub-page'
  >
    <div className='z-10 p-1 mb-20 rounded-full bg-white-light sm:inline-block call-card-icon sm:mb-0'>
      <div className='relative z-20 p-2 rounded-full sm:p-4 bg-blue'>
        <img src={ImgCallCard} alt='call icon' className='inline-block w-6' />
      </div>
    </div>
    <div className='flex flex-col justify-center px-10 py-6 text-center text-white col-span-2 bg-orange polygon-right sm:text-left'>
      <h2 className='italic uppercase'>
        <span>
          {data._cardCall.cardCallHeading.split(' ').slice(0, 2).join(' ')}
        </span>
        <br />
        <span> {data._cardCall.cardCallHeading.split(' ').slice(-1)[0]}</span>
      </h2>
    </div>

    <div className='relative px-10 py-6 overflow-hidden text-center text-black col-span-3 bg-yellow polygon-left call-card-left-section-margin'>
      <img
        src={ImgPerk}
        alt='call us bg'
        className='absolute inset-0 object-contain w-full'
      />
      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(90deg, rgba(254,199,36,0.9) 0%, rgba(254,199,36,0.9) 0%)',
        }}
      ></div>
      <div className='relative z-10'>
        <h6 className='w-full mx-auto mb-1 sm:w-3/4'>
          {data._cardCall.cardCallSubheading}
        </h6>
        <h2>{data._generalData.contactNumbers.slice(-1)[0].number}</h2>
      </div>
    </div>
  </a>
)

export default CallUsCard
