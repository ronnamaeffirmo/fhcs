import React from 'react'
import { Form } from 'semantic-ui-react'
import {
    DatesRangeInput
} from 'semantic-ui-calendar-react';

const CalendarField = ({ label, input, inputLabel, meta: { touched, error }, ...custom  }) => (
  <Form.Field error={touched && error && true}>
    <DatesRangeInput
      style={{minWidth: '250px', maxWidth: '400px', margin: '0 auto', color: 'green'}}
      label={inputLabel}
      name="datesRange"
      placeholder="From - To"
      value={input.value}
      iconPosition="left"
      onChange={(param, data) => input.onChange(data.value)} />
  </Form.Field>
)

export default CalendarField
