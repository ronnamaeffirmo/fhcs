import React from 'react'
import { Form, TextArea} from 'semantic-ui-react'

const textAreaField = ({ input, label, value, onInputChange, inputLabel, meta: { touched, error }, ...custom}) => (
    <Form.Field error={touched && error && true}>
      <label>{label}</label>
      <TextArea
        label={inputLabel} 
        {...input} 
        {...custom} 
        value={value}
        onChange={(params, data) => onInputChange(data.value)}
        autoHeight placeholder='Try adding remarks here ...' />
    </Form.Field>
)

export default textAreaField