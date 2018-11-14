import React from 'react'
import { Form } from 'semantic-ui-react'
import moment from 'moment'
import { DateInput } from 'semantic-ui-calendar-react'

const SalesCalendarField = ({ date, terms, onCalendarDateChange, input, inputLabel, meta: { touched, error }, ...custom }) => (
  <Form.Field error={touched && error && true}>
    <DateInput
      style={{minWidth: '250px', maxWidth: '400px', margin: '0 auto', color: 'green'}}
      label={inputLabel}
      placeholder={inputLabel}
      iconPosition="left"
      dateFormat={'MM/DD/YYYY'}
      minDate={moment().format('MM/DD/YYYY')}
      value={date}
      onChange={(param, data) => onCalendarDateChange(data.value, terms)}
      {...custom}
    />
  </Form.Field>
)

export default SalesCalendarField
