import React from 'react'
import SelectionInput from './selectionInput'
import StepperFormButton from './stepperFormButton'

const IssueForm = ({ value, setValue }) => (
  <SelectionInput
    options={[
      'Schedule Service',
      'Emergency Repair',
      'Schedule Maintenance',
      'Get a Free Quote',
    ]}
    value={value}
    setValue={setValue}
  />
)

export default IssueForm
