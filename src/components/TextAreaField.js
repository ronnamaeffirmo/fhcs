import React from 'react'
import { Form, TextArea} from 'semantic-ui-react'

const textAreaField = ({ input, label, inputLabel, meta: { touched, error }, ...custom}) => (
    <Form.Field error={touched && error && true}>
      <label>{label}</label>
      <TextArea label={inputLabel} {...input} {...custom} autoHeight placeholder='Try adding multiple lines' />
    </Form.Field>
)

export default textAreaField