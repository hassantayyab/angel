import * as Yup from 'yup'

// Encode for Netlify
function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

// Schema for validation
const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
export const Schema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  state: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  services: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(phoneRegExp, 'Invalid').required('Required'),
  message: Yup.string().required('Required'),
})

export const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  mobile: Yup.string().matches(phoneRegExp, 'Invalid').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
})

export const AddressInfoSchema = Yup.object().shape({
  street: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  suite: Yup.string().required('Required'),
  city: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  state: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  zipCode: Yup.string().max(7, 'Too Long!').required('Required!'),
})

export function submitForm(values) {
  console.log('values', values)

  return new Promise((resolve, reject) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...values,
      }),
    })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  })
}

export function submitServiceForm(event, values) {
  return new Promise((resolve, reject) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'same day services',
        ...values,
      }),
    })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  })
}

export function submitEstimateForm(event, values) {
  return new Promise((resolve, reject) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'virtual estimates',
        ...values,
      }),
    })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  })
}
