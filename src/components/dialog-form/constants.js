export const today = new Date()

export const timeSlots = [
  '9:00am-1:00pm',
  '1:00pm-5:00pm',
  '5:00pm-8:00pm',
  'First Available',
]

export const services = [
  'Schedule Service',
  'Emergency Repair',
  'Schedule Maintenance',
  'Get a Free Quote',
]

export const estimates = [
  'New Heating System',
  'New Cooling System',
  'New Heating & Cooling System',
]

export const serviceOptions = {
  [services[0]]: {
    'Heating and Cooling': [
      'No Cooling',
      'No Heat',
      'Water Leak',
      'Other Heating or Cooling Issue',
    ],
    'Ventilation and Ductwork': [
      'Broken Ventilation',
      'Ductwork repair',
      'Other Ventilation and Ductwork Issue',
    ],
  },
  [services[1]]: {
    'Emergency Repair': ['No Cooling', 'No Heat', 'Uncontrollable Leak'],
  },
  [services[2]]: {
    'Schedule Maintenance': ['Annual Maintenance Plan', 'One Time Tune-Up'],
  },
  [services[3]]: {
    'In-Home Estimates': [
      'New Heating or Cooling System',
      'Duct work and ventilation',
    ],
  },
}

export const estimateOptions = [
  'Zoom',
  'Facetime',
  'Other - we will contact you to discuss options',
]

export const initialState = {
  request: '',
  details: {
    issue: '',
    images: ['', '', '', ''],
    message: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
    },
    addressInfo: {
      street: '',
      suite: '',
      city: '',
      state: '',
      zipCode: '',
    },
  },
  isNewCustomer: null,
  schedule: {
    date: new Date(),
    timeSlot: '',
  },
}
