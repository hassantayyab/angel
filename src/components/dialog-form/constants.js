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
  'Schedule Service',
  'Emergency Repair',
  'Schedule Maintenance',
]

export const serviceOptions = {
  [services[0]]: {
    'Heating and Cooling': [
      'No Cooling',
      'No Heat',
      'Water Leak',
      'Other Heating or Cooling Issue',
    ],
    'Ventilation and DuctWork': [
      'Broken Ventilation',
      'Ductwork repair',
      'Other Ventilation and DuctWork Issue',
    ],
  },
  [services[1]]: {
    'Emergency Repair': ['No Cooling', 'No Heat', 'Uncontrollable Leak'],
  },
  [services[2]]: {
    'Schedule Maintenance': [
      'Annual Maintenance Plan',
      'One Time Tune-Up',
      'Due Dillidence',
    ],
  },
  [services[3]]: {
    'In-Home Estimates': [
      'New Heating or Cooling System',
      'Duct work and ventilation',
    ],
  },
}

export const estimateOptions = [
  'zoom',
  'facebook',
  'Other - we will contact you to discuss options',
]

export const initialState = {
  request: '',
  details: {
    issue: '',
    message: 'test',
    personalInfo: {
      firstName: 'test',
      lastName: 'test',
      mobile: '123456',
      email: 'test@gmail.com',
    },
    addressInfo: {
      street: 'test',
      suite: 'test',
      city: 'test',
      state: 'test',
      zipCode: 'test',
    },
  },
  isNewCustomer: true,
  schedule: {
    date: new Date(),
    timeSlot: timeSlots[0],
  },
}
