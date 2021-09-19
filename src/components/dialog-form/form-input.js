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
  <div className={`relative w-full ${className}`}>
    <Field
      type={type}
      name={name}
      placeholder={label}
      className={`inline-block w-full text-black placeholder-white bg-transparent border-2 outline-none text-sm ${
        component === 'select' ? 'py-4' : 'py-3.5'
      }`}
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
