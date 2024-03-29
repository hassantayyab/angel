import * as Yup from 'yup'

// Encode for Netlify
function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

// Encode for netlify file upload form
function encodeForm(data) {
  const formData = new FormData()

  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }

  return formData
}

// Schema for validation
const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
export const Schema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  state: Yup.string().required('Required'),
  services: Yup.string().required('Required'),
  city: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(phoneRegExp, 'Invalid').required('Required'),
  message: Yup.string().required('Required'),
})

export const CareenSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  position: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(phoneRegExp, 'Invalid').required('Required'),
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
  suite: Yup.string(),
  city: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().max(7, 'Too Long!').required('Required!'),
})

export function submitForm(values) {
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

export function submitServiceForm(values) {
  return new Promise((resolve, reject) => {
    fetch('/', {
      method: 'POST',
      body: encodeForm({
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

export function submitEstimateForm(values) {
  return new Promise((resolve, reject) => {
    fetch('/', {
      method: 'POST',
      body: encodeForm({
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

export function submitCareerForm(values) {
  return new Promise((resolve, reject) => {
    fetch('/', {
      method: 'POST',
      body: encodeForm({
        'form-name': 'career',
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
