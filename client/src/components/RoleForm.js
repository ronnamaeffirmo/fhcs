import React from 'react'
import {
  Button,
  Divider,
  Form,
  Container,
  Input,
  Checkbox,
  Grid,
  Header,
  Card,
  Segment,
} from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import PermissionInformation from './PermissionInformation'

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
  gridCol: {
    marginTop: 8
  },
  searchButton: {
    width: '21%',
    float: 'right',
    backgroundColor: 'green',
    color: 'white'
  }
}

const GridColumn = (props) => {
  const {service, param, dataView} = props
  return (
    <Grid.Column key={service + ':' + param} style={styles.gridCol}>
      <Field
        name={service.toLowerCase() + ':' + param.toLowerCase()}
        component={(props) => {
          const {input: {value, onChange}} = props
          return (
            <div>
              <Checkbox fitted={true} disabled={dataView} toggle checked={!!(value && value === true)}
                        label={param.toUpperCase()}
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
  const params = ['all', 'create', 'read', 'update', 'delete']
  return (
    <Card fluid style={{paddingRight: 13, paddingLeft: 13, paddingBottom: 4}}>
      <Container style={styles.commonServiceParametersContainer}>
        <Header size='medium'>{service}</Header>
        <p>Check all permissions for {service} service.</p>
        <Grid textAlign={'left'} columns={3} container={true}>
          <Grid.Row>
            {params.map(param => {
              return <GridColumn key={service + ':' + param} {...props} param={param}/>
            })}
          </Grid.Row>
        </Grid>
      </Container>
    </Card>

  )
}

const RoleForm = (props) => {
  const {handleSubmit, pristine, submitting, submissionHandler, dataView} = props
  const endpoints = ['Items', 'Inventories', 'Sales', 'Users', 'Roles', 'Customers']
  return (
    <Container style={styles.mainContainer}>
      <Form onSubmit={submissionHandler ? handleSubmit(submissionHandler) : undefined}>
        <Container>
          <Link to={'/roles'}><Button color={'grey'} content={'Back to Roles'} icon={'arrow left'}
                                      labelPosition={'left'}/></Link>
          {!dataView &&
          <Button color={'green'} icon={'checkmark'} floated={'right'} type={'submit'} labelPosition={'right'}
                  content='Submit'
                  disabled={pristine || submitting}/>}
          {dataView &&
          <Link to={`/roles/update/${props.match.params.id}`}><Button color={'red'} icon={'edit'} floated={'right'}
                                                                      labelPosition={'right'}
                                                                      content='Edit Role'
          /></Link>}
          <Divider/>
        </Container>


        <PermissionInformation />
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
            {endpoints.map(endpoint => <CommonServiceParameters {...props} service={endpoint} key={endpoint}/>)}
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
  validate,
  enableReinitialize: true
})(RoleForm)
