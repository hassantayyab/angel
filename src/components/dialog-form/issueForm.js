import React from 'react'
import { estimates, services } from './constants'
import SelectionInput from './selectionInput'

const IssueForm = ({ type, value, setValue }) => (
  <SelectionInput
    label={
      type === 'service' ? 'Select Your Issue' : 'Select a Virtual Estimate'
    }
    options={type === 'service' ? services : estimates}
    value={value}
    setValue={setValue}
  />
)

export default IssueForm
