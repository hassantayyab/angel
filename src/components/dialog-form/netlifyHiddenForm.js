import React from 'react'

const NetlifyHiddenForm = ({ value }) => {
  return (
    <>
      {/* Input Fields */}
      <div className='hidden'>
        <form
          method='post'
          name='same day services'
          data-netlify='true'
          data-netlify-honeypot='bot-field'
          id='service'
        >
          <input defaultValue={value.request} name='request' />
          <input defaultValue={value.details.issue} name='issue' />
          <input
            type='file'
            defaultValue={value.details.images[0]}
            name='img1'
          />
          <input
            type='file'
            defaultValue={value.details.images[1]}
            name='img2'
          />
          <input
            type='file'
            defaultValue={value.details.images[2]}
            name='img3'
          />
          <input
            type='file'
            defaultValue={value.details.images[3]}
            name='img4'
          />
          <input defaultValue={value.details.message} name='message' />
          <input defaultValue={value.details.personalInfo.email} name='email' />
          <input
            defaultValue={value.details.personalInfo.firstName}
            name='firstName'
          />
          <input
            defaultValue={value.details.personalInfo.lastName}
            name='lastName'
          />
          <input
            defaultValue={value.details.personalInfo.mobile}
            name='mobile'
          />
          <input defaultValue={value.details.addressInfo.city} name='city' />
          <input defaultValue={value.details.addressInfo.state} name='state' />
          <input
            defaultValue={value.details.addressInfo.street}
            name='street'
          />
          <input defaultValue={value.details.addressInfo.suite} name='suite' />
          <input
            defaultValue={value.details.addressInfo.zipCode}
            name='zipCode'
          />
          <input defaultValue={value.isNewCustomer} name='isNewCustomer' />
          <input defaultValue={value.schedule.date} name='date' />
          <input defaultValue={value.schedule.timeSlot} name='timeSlot' />
        </form>
      </div>

      {/* Input Fields */}
      <div className='hidden'>
        <form
          method='post'
          name='virtual estimates'
          data-netlify='true'
          data-netlify-honeypot='bot-field'
          id='estimate'
        >
          <input defaultValue={value.request} name='request' />
          <input defaultValue={value.details.issue} name='issue' />
          <input
            type='file'
            defaultValue={value.details.images[0]}
            name='img1'
          />
          <input
            type='file'
            defaultValue={value.details.images[1]}
            name='img2'
          />
          <input
            type='file'
            defaultValue={value.details.images[2]}
            name='img3'
          />
          <input
            type='file'
            defaultValue={value.details.images[3]}
            name='img4'
          />
          <input defaultValue={value.details.message} name='message' />
          <input defaultValue={value.details.personalInfo.email} name='email' />
          <input
            defaultValue={value.details.personalInfo.firstName}
            name='firstName'
          />
          <input
            defaultValue={value.details.personalInfo.lastName}
            name='lastName'
          />
          <input
            defaultValue={value.details.personalInfo.mobile}
            name='mobile'
          />
          <input defaultValue={value.details.addressInfo.city} name='city' />
          <input defaultValue={value.details.addressInfo.state} name='state' />
          <input
            defaultValue={value.details.addressInfo.street}
            name='street'
          />
          <input defaultValue={value.details.addressInfo.suite} name='suite' />
          <input
            defaultValue={value.details.addressInfo.zipCode}
            name='zipCode'
          />
          <input defaultValue={value.isNewCustomer} name='isNewCustomer' />
          <input defaultValue={value.schedule.date} name='date' />
          <input defaultValue={value.schedule.timeSlot} name='timeSlot' />
        </form>
      </div>
    </>
  )
}

export default NetlifyHiddenForm
