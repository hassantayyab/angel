import React from 'react'
import DatePicker from 'react-datepicker'
import Chip from './chip'

const ScheduleForm = ({ contactNumber, timeSlots, value, setValue }) => {
  return (
    <div id='scheduleForm'>
      <div className='flex flex-col justify-between'>
        <div className='pb-4 bg-blue w-100'>
          <DatePicker
            selected={value.date}
            onChange={(date) => setValue({ ...value, date })}
            inline
          />
        </div>
        <div className='py-3'>
          <h6 className='mb-2 text-black uppercase text-opacity-80 font-graphikMedium'>
            Select A Time Slot
          </h6>
          {timeSlots.slice(0, -1).length > 0 &&
            timeSlots.slice(0, -1).map((time, i) => (
              <Chip
                key={i}
                selected={value.timeSlot === time}
                className='mx-4 my-2'
                value={value}
                setValue={() => setValue({ ...value, timeSlot: time })}
              >
                {time}
              </Chip>
            ))}
          <div className='mt-4'>
            <Chip
              className='px-7'
              value={value}
              selected={value.timeSlot === timeSlots.slice(-1)[0]}
              setValue={() =>
                setValue({ ...value, timeSlot: timeSlots.slice(-1)[0] })
              }
            >
              {timeSlots.slice(-1)[0]}
            </Chip>
          </div>
        </div>
        <div className='px-6 sm:px-20 md:px-32 lg:px-44'>
          <small className='text-black text-opacity-50'>
            If you’d like to schedule an appointment for a time not listed in
            our online calendar, please select First Available or call our
            office at
            <br />{' '}
            <span className='text-black font-graphikMedium text-opacity-80'>
              {contactNumber}
            </span>
          </small>
        </div>
      </div>
    </div>
  )
}

export default ScheduleForm
