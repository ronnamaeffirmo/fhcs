import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Button, Container, Divider, Form, Segment, Input, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import userFields from '../common/constants/userFields'
import { toTitleCase } from '../common/helpers'

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
  const {submissionHandler, handleSubmit, pristine, submitting, roles} = props
  return (
    <Container style={styles.mainContainer}>
      <Form onSubmit={submissionHandler ? handleSubmit(submissionHandler) : undefined}>

        <Container>
          <Link to={'/users'}><Button color={'grey'} content={'Back to Users'} icon={'arrow left'}
                                      labelPosition={'left'}/></Link>
          <Button color={'green'} icon={'check'} floated={'right'}
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
              <ReduxFormField {...props} key={field.name} fieldName={field.name} label={field.label}
                              placeholder={field.placeholder}
                              hidden={field.hidden}/>
            ))}
            <Field
              name={'role'}
              component={(props) => {
                const {input: {value, onChange}, meta: {error}} = props
                return (
                  <Form.Field>
                    <label>Role</label>
                    <Dropdown placeholder='Select Role' fluid search selection
                              value={value}
                              options={parseRolesToDropdownOptions(roles)} onChange={(e, data) => {
                      onChange(data.value)
                    }}
                    />
                  </Form.Field>
                )
              }}
            />
          </Container>
        </Segment>
      </Form>
    </Container>
  )
}

const ReduxFormField = (props) => {
  const {fieldName, label, placeholder, hidden} = props
  return (
    <Field
      name={fieldName}
      component={(props) => {
        const {input: {value, onChange}, meta: {error}} = props
        return (
          <Form.Field>
            <label>{label}</label>
            <Input error={!!error} type={hidden ? 'password' : 'text'} placeholder={placeholder} component='input'
                   onChange={(e) => onChange(e.target.value)} value={value}/>
          </Form.Field>
        )
      }}
    />
  )
}

export default reduxForm({
  form: 'userForm'
})(UserForm)
