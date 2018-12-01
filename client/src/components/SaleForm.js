import React from 'react'
import {
  Button,
  Container,
  Divider,
  Form,
  Segment,
  Input,
  Dropdown,
  Grid,
  Header,
  Table,
  Label,
  Icon,
  Popup
} from 'semantic-ui-react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { Link } from 'react-router-dom'
import terms from '../common/constants/terms'
import moment from 'moment'
import { DateInput } from 'semantic-ui-calendar-react'

const styles = {
  mainContainer: {
    marginTop: 30
  },
  saleForm: {
    marginTop: 3
  },
  fieldLabel: {
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 400
  },
  tmpFieldLabel: {
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 2.0
  }
}

const SaleForm = (props) => {
  const {submissionHandler, handleSubmit, date, term, customerSearchList, pristine, submitting, tmp, items, clearTmpFields, updateTmpFields, itemSearchList} = props
  return (
    <Container style={styles.mainContainer}>
      <Form onSubmit={submissionHandler ? handleSubmit(submissionHandler) : undefined}>
        <Container>
          <Link to={'/sales'}><Button color={'grey'} content={'Back to Sales'} icon={'arrow left'}
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
          <Header size={'large'}>NEW SALE</Header>
          <Container>
            <p>Add a new sales record for current and previous transactions to track profits and inventory movement.</p>
          </Container>
          <Grid style={styles.saleForm}>
            <Grid.Row>
              <Grid.Column width={8}>
                <Field
                  name={'customer'}
                  component={(props) => {
                    const {input: {value, onChange}, meta: {error}} = props
                    return (
                      <Form.Field>
                        <label style={styles.fieldLabel}>Role</label>
                        <Dropdown placeholder='Select Customer' fluid search selection
                                  value={value}
                                  options={customerSearchList ? customerSearchList : []} onChange={(e, data) => {
                          onChange(data.value)
                        }}
                        />
                      </Form.Field>
                    )
                  }}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <ReduxFormField fieldName={'officialReceipt'} label={'Official Receipt'}
                                placeholder={'Enter OR number here'}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={6}>
                <Field
                  name={'date'}
                  component={(props) => {
                    const {input: {value, onChange}, meta: {error}} = props
                    return (
                      <Form.Field>
                        <label style={styles.fieldLabel}>Date</label>
                        <DateInput
                          style={{color: 'green'}}
                          placeholder={'Enter sale date'}
                          iconPosition="left"
                          dateFormat={'MM/DD/YYYY'}
                          minDate={moment().format('MM/DD/YYYY')}
                          value={value}
                          onChange={(e, data) => onChange(data.value)}
                        />
                      </Form.Field>
                    )
                  }}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Field
                  name={'term'}
                  component={(props) => {
                    const {input: {value, onChange}, meta: {error}} = props
                    return (
                      <Form.Field>
                        <label style={styles.fieldLabel}>Term</label>
                        <Dropdown placeholder='Select Term' fluid search selection
                                  value={value}
                                  options={terms} onChange={(e, data) => {
                          onChange(data.value)
                        }}
                        />
                      </Form.Field>
                    )
                  }}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Form.Field>
                  <label style={styles.fieldLabel}>Due Date</label>
                  <DateInput
                    style={{color: 'red'}}
                    placeholder={'Enter sale date'}
                    iconPosition="left"
                    dateFormat={'MM/DD/YYYY'}
                    value={(date && term) ? moment(date).add(term, 'days').format('MM/DD/YYYY') : undefined}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Divider/>
            <Grid.Row>
              <Grid.Column width={16}>
                <FieldArray name='items' component={Items}
                            props={{tmp: tmp, items: items, clearTmpFields, updateTmpFields, itemSearchList}}
                            rerenderOnEveryChange={true}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </Container>
  )
}

const Items = (props) => {
  const {fields, meta: {error, submitFailed}, items, tmp: {item, quantity, price, discount}, clearTmpFields, updateTmpFields, itemSearchList} = props
  console.log(props)
  return (
    <div>

      <div>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell textAlign={'right'}>Price</Table.HeaderCell>
              <Table.HeaderCell textAlign={'center'}>Quantity</Table.HeaderCell>
              <Table.HeaderCell textAlign={'right'}>Subtotal</Table.HeaderCell>
              <Table.HeaderCell textAlign={'right'}>Discount</Table.HeaderCell>
              <Table.HeaderCell textAlign={'right'}>Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items && items.map((item, index) => {
              return (

                <Popup
                  trigger={
                    <Table.Row key={item.item + '-' + 'item.total'}>
                      <Table.Cell>{item.item}</Table.Cell>
                      <Table.Cell textAlign={'right'}>₱{item.price}</Table.Cell>
                      <Table.Cell textAlign={'center'}>{item.quantity}</Table.Cell>
                      <Table.Cell textAlign={'right'}>₱{item.subtotal}</Table.Cell>
                      <Table.Cell textAlign={'right'}>₱{item.discount}</Table.Cell>
                      <Table.Cell textAlign={'right'}>₱{item.total}</Table.Cell>
                    </Table.Row>}
                  content={<Button color='red' content='Remove Item' onClick={() => fields.remove(index)}/>}
                  on='hover'
                  hoverable
                  hideOnScroll
                />

              )
            })}
            {!items &&
            <Table.Row>
              <Table.Cell>----</Table.Cell>
              <Table.Cell textAlign={'right'}>₱0.00</Table.Cell>
              <Table.Cell textAlign={'center'}>0</Table.Cell>
              <Table.Cell textAlign={'right'}>₱0.00</Table.Cell>
              <Table.Cell textAlign={'right'}>₱0.00</Table.Cell>
              <Table.Cell textAlign={'right'}>₱0.00</Table.Cell>
            </Table.Row>}
          </Table.Body>
        </Table>
        <Divider/>
        <Header size={'medium'}>Add Item To Sale</Header>
        <p>Find items in the database and add it to this sales record.</p>
        <Container style={{marginTop: 10}}/>
      </div>
      <Grid>

        <Grid.Row>

          <Grid.Column width={6}>
            <label style={styles.tmpFieldLabel}>Item</label>
            <Field
              name={'tmpItem'}
              component={(props) => {
                const {input: {value, onChange}, meta: {error}} = props
                return (
                  <Form.Field>
                    <Dropdown placeholder='Find Item' search selection
                              value={value}
                              scrolling
                              options={itemSearchList ? itemSearchList : []}
                              onChange={(e, data) => {
                                onChange(data.value)
                                let match = false
                                data.options.forEach(option => {
                                  if (option.key === data.value) {
                                    updateTmpFields(parseFloat(option.price).toFixed(2), 1, 0.0)
                                    match = true
                                  }
                                })
                              }}
                    />
                  </Form.Field>
                )
              }}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <label style={styles.tmpFieldLabel}>Price</label>
            <Field
              name={'tmpPrice'}
              component='input'
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <label style={styles.tmpFieldLabel}>Quantity</label>
            <Field
              name={'tmpQuantity'}
              component='input'
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <label style={styles.tmpFieldLabel}>Discount</label>
            <Field
              name={'tmpDiscount'}
              component='input'
            />
          </Grid.Column>

          <Grid.Column width={16} style={{marginTop: 8}}>
            <Button fluid color={'green'}
                    onClick={() => {
                      fields.push({item, quantity, price, discount})
                      clearTmpFields()
                    }}
                    content={'ADD ITEM TO SALES RECORD'}
                    disabled={!item}
                    icon={'plus'}/>
            <Divider/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

// TODO duplicate UserForm.js -- Marlon
const ReduxFormField = (props) => {
  const {fieldName, label, placeholder, hidden} = props
  return (
    <Field
      name={fieldName}
      component={(props) => {
        const {input: {value, onChange}, meta: {error}} = props
        return (
          <Form.Field>
            <label style={styles.fieldLabel}>{label}</label>
            <Input error={!!error} type={hidden ? 'password' : 'text'} placeholder={placeholder} component='input'
                   onChange={(e) => onChange(e.target.value)} value={value}/>
          </Form.Field>
        )
      }}
    />
  )
}

export default reduxForm({
  form: 'saleForm',
  enableReinitialize: true
})(SaleForm)

