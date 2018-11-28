import React from 'react'
import { Button, Divider, Form, Container, Input, Checkbox, Grid, Header, Popup } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

const styles = {
  mainContainer: {
    marginTop: 30
  },
  commonServiceParametersContainer: {
    marginTop: 25,
    marginBottom: 15
  },
  errorText: {
    lineHeight: 2.0,
    color: 'red',
    float: 'right'
  }
}

const GridColumn = (props) => {
  const {service, param} = props
  return (
    <Grid.Column key={service + ':' + param}>
      <Field
        name={service.toLowerCase() + ':' + param.toLowerCase()}
        component={(props) => {
          const {input: {value, onChange}} = props
          return (
            <Checkbox toggle checked={!!(value && value === true)} label={param.toUpperCase()} onChange={(e, {checked}) => {
              onChange(checked)
            }}/>
          )
        }}
      />

    </Grid.Column>
  )
}

const CommonServiceParameters = (props) => {
  let {service} = props
  const params = ['all', 'get', 'post', 'put', 'patch', 'delete']
  return (
    <Container style={styles.commonServiceParametersContainer}>
      <Header size='medium'>{service}</Header>
      <p>Check all permissions for {service} service.</p>
      <Grid>
        <Grid.Row columns={6}>
          {params.map(param => {
            const component = <GridColumn param={param} service={service}/>
            let informationContent = ''
            service = service.toUpperCase()
            switch (param) {
              case 'all':
                informationContent = 'Checking this will override the selections on the right.'
                break
              case 'get':
                informationContent = `Allow users with this permission to get data from ${service} endpoint.`
                break
              case 'post':
                informationContent = `Allow users with this permission to create new data in ${service} endpoint.`
                break
              case 'put':
                informationContent = `Allow users with this permission to completely replace existing data in ${service} endpoint.`
                break
              case 'patch':
                informationContent = `Allow users with this permission to modify existing data in ${service} endpoint.`
                break
              case 'delete':
                informationContent = `Allow users with this permission to delete existing data in ${service} endpoint.`
                break
              default:
                return component
            }
            return <Popup key={param} trigger={component} content={informationContent}/>
          })}
        </Grid.Row>
      </Grid>
    </Container>
  )
}

const RoleForm = ({handleSubmit, pristine, submitting, submissionHandler}) => {
  const endpoints = ['Items', 'Inventory', 'Sales', 'Users', 'Roles', 'Customers']
  return (
    <Container style={styles.mainContainer}>
      <Form onSubmit={handleSubmit(submissionHandler)}>
      <Container>
        <Link to={'/items'}><Button color={'grey'} content={'Back to Roles'} icon={'arrow left'}
                                    labelPosition={'left'}/></Link>
        <Button color={'green'} icon={'checkmark'} floated={'right'} type={'submit'} labelPosition={'right'} content='Submit'
        disabled={pristine || submitting}/>
        <Divider/>
      </Container>

        <Field
          name={'title'}
          component={(props) => {
            const {input: {value, onChange}, meta: {error}} = props
            return (
              <Form.Field>
                <Header size={'large'} floated={'left'}>Role Title</Header>
                {error && <span style={styles.errorText}>{error}</span>}
                <Input error={!!error} placeholder='Enter role title here...' onChange={(e) => onChange(e.target.value)}/>
              </Form.Field>
            )
          }}
        />
        <Container>
          {endpoints.map(endpoint => <CommonServiceParameters service={endpoint} key={endpoint}/>)}
        </Container>
      </Form>
    </Container>
  )
}

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Title is required to create a new role...'
  }
  return errors
}

export default reduxForm({
  form: 'addRole',
  validate
})(RoleForm)
