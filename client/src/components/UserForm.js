import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Button, Container, Divider, Form, Segment, Input, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import userFields from '../common/constants/userFields'
import { toTitleCase } from '../common/helpers'
import InputField from './InputField'

const styles = {
  mainContainer: {
    marginTop: 30
  }
}

const parseRolesToDropdownOptions = (roles) => {
  return roles.map(role => {
    const {_id: id, title} = role
    return {
      key: id,
      value: id,
      text: toTitleCase(title)
    }
  })
}

const UserForm = (props) => {
  const { submissionHandler, handleSubmit, pristine, submitting, roles } = props
  return (
    <Container style={styles.mainContainer}>
      <Form onSubmit={submissionHandler ? handleSubmit(submissionHandler) : undefined}>
        <Container>
          <Link to={'/users'}>
            <Button color={'grey'} content={'Back to Users'} icon={'arrow left'} labelPosition={'left'} />
          </Link>
          <Button 
            color={'green'} 
            icon={'check'} 
            floated={'right'}
            labelPosition={'right'}
            content='Save'
            disabled={pristine || submitting}
            loading={submitting}
          />
          <Divider/>
        </Container>
        <Segment>
          <Container>
            {userFields.map(field => (
              <Field
                {...field}
                key={field.name}
                component={InputField}
              />
            ))}
            <Field
              name={'role'}
              component={({input: {value, onChange}, meta: {error}}) => (
                <Form.Field>
                  <label>Role</label>
                  <Dropdown 
                    fluid search selection
                    placeholder='Select Role' 
                    loading={!roles}
                    value={value}
                    options={parseRolesToDropdownOptions(roles)} onChange={(e, data) => {onChange(data.value)}}
                  />
                </Form.Field>
              )}
            />
          </Container>
        </Segment>
      </Form>
    </Container>
  )
}

// NOTE: there is a generic InputField, -R
// const ReduxFormField = ({fieldName, label, placeholder, hidden}) => (
//   <Field
//     name={fieldName}
//     component={({input: {value, onChange}, meta: {error}}) => (
//       <Form.Field>
//         <label>{label}</label>
//         <Input 
//           error={!!error} 
//           type={hidden ? 'password' : 'text'} 
//           placeholder={placeholder} 
//           component='input'
//           onChange={(e) => onChange(e.target.value)} value={value}
//         />
//       </Form.Field>
//     )}
//   />
// )

export default reduxForm({
  form: 'userForm',
  enableReinitialize: true
})(UserForm)
