import React from 'react'
import { Button, Divider, Form, Container, Input, Checkbox, Grid, Header, Tab, Segment, Label, Icon } from 'semantic-ui-react'
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
  },
  informationPanes: {
    marginTop: 20,
    marginBottom: 25
  },
  gridCol: {
    marginTop: 8
  }
}

const informationPanes = [
  {menuItem: 'ALL', render: () => <Tab.Pane>Checking this will override the other selections.</Tab.Pane>},
  {
    menuItem: 'GET',
    render: () => <Tab.Pane>Allow users with this permission to view data from the service endpoint.</Tab.Pane>
  },
  {
    menuItem: 'POST',
    render: () => <Tab.Pane>Allow users with this permission to create new data in the service endpoint.</Tab.Pane>
  },
  {
    menuItem: 'PUT',
    render: () => <Tab.Pane>Allow users with this permission to completely replace existing data in the service
      endpoint.</Tab.Pane>
  },
  {
    menuItem: 'PATCH',
    render: () => <Tab.Pane>Allow users with this permission to modify existing data in the service endpoint</Tab.Pane>
  },
  {
    menuItem: 'DELETE',
    render: () => <Tab.Pane>Allow users with this permission to delete existing data in the service endpoint.</Tab.Pane>
  },
]

const GridColumn = (props) => {
  const {service, param} = props
  return (
    <Grid.Column key={service + ':' + param} style={styles.gridCol}>
      <Field
        name={service.toLowerCase() + ':' + param.toLowerCase()}
        component={(props) => {
          const {input: {value, onChange}} = props
          return (
            <div>
              <Checkbox fitted={true} toggle checked={!!(value && value === true)} label={param.toUpperCase()}
                        onChange={(e, {checked}) => {
                          onChange(checked)
                        }}/>
            </div>
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
      <Grid textAlign={'left'} columns={3} container={true}>
        <Grid.Row>
          {params.map(param => {
            return <GridColumn key={service + ':' + param} param={param} service={service}/>
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
          <Button color={'green'} icon={'checkmark'} floated={'right'} type={'submit'} labelPosition={'right'}
                  content='Submit'
                  disabled={pristine || submitting}/>
          <Divider/>
        </Container>


        <Container>
          <Header size={'medium'}>Permission Information</Header>
          <p>Please take a look at the descriptions for each permission.</p>
          <Tab menu={{secondary: true, pointing: true}} panes={informationPanes} style={styles.informationPanes}/>
        </Container>
        <Segment>
          <Container>
            <Field
              name={'title'}
              component={(props) => {
                const {input: {value, onChange}, meta: {error}} = props
                return (
                  <Form.Field>
                    <Header size={'large'} floated={'left'}>Role Title</Header>
                    {error && <span style={styles.errorText}>{error}</span>}
                    <Input error={!!error} placeholder='Enter role title here...' value={value}
                           onChange={(e) => onChange(e.target.value)}/>
                  </Form.Field>
                )
              }}
            />
            {endpoints.map(endpoint => <CommonServiceParameters service={endpoint} key={endpoint}/>)}
          </Container>
        </Segment>
      </Form>
    </Container>
  )
}

// TODO: MOVE TO VALIDATORS FILE
const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Role Title is required!'
  }
  return errors
}

export default reduxForm({
  form: 'roleForm',
  validate
})(RoleForm)
