import React from 'react'
import { Field, ErrorMessage } from 'formik'

const FormInput = ({
  name,
  type = 'text',
  className = '',
  label = name,
  children,
  component,
  ...rest
}) => (
  <div className={`relative w-full mb-6 ${className}`}>
    <Field
      type={type}
      name={name}
      placeholder={label}
      className={`inline-block w-full text-black placeholder-black placeholder-opacity-50 bg-transparent border-b outline-none text-sm py-2`}
      style={{ borderColor: '#336695' }}
      aria-labelledby={`${name}-label`}
      component={component}
      {...rest}
    >
      {children}
    </Field>
    <div className='error'>
      <ErrorMessage name={name} />
    </div>
  </div>
)

export default FormInput
