import React from 'react'
import { Field } from 'redux-form'
import { Form, Container, Button, Modal } from 'semantic-ui-react'

import InputField from './InputField'
import DropdownField from './DropdownField'
import CalendarField from './CalendarField'
import TextAreaField from './TextAreaField'

const dummyCustomers = [
  {
    name: "John Doe",
    value: "John Doe",
    text: "John Doe"
  },
  {
    name: "Mike Jackson",
    value: "Mike Jackson",
    text: "Mike Jackson"
  },
  {
    name: "Dan Estronov Estronov Estronov Estronov",
    value: "Dan Estronov Estronov Estronov Estronov",
    text: "Dan Estronov Estronov Estronov Estronov"
  }
]

const netValue = [
  {
    name: "Net30",
    value: "Net30",
    text: "Net30"
  },
  {
    name: "Net60",
    value: "Net60",
    text: "Net60"
  },
  {
    name: "Net90",
    value: "Net90",
    text: "Net90"
  }
]

const AddSalesRecordForm = () => (
  <Modal
    closeOnDimmerClick = {false}
    trigger={<Button style={styles.searchButton}>ADD SALES</Button> }
    centered={false}>
    <Modal.Content>
      <Form style={styles.wrapper}>
        <Container style={styles.customer}>
          <Field
            type='selection'
            name='Customer'
            label='Customer: '
            placeholder='Select Customer' 
            component={DropdownField}
            options={dummyCustomers}
          />
        </Container>
        <Container style={styles.invoiceNum}>
          <Field
            type='text'
            name='invoiceNumber'
            label='Invoice Number: '
            placeholder='Invoice Number'
            component={InputField}
          />
        </Container>
        <Container style={styles.startDate}>
          <Field
            inputLabel='Date: '
            name='rangeDate'
            component={CalendarField}
          />
        </Container>
        <Container style={styles.terms}>
          <Field
            name='terms'
            label='Terms: '
            component={DropdownField}
            options={netValue}
          />
        </Container>
        <Container style={styles.remarks}>Remarks
          <Field
            name='text'
            label='Remarks: '
            component={TextAreaField}
          />
        </Container>
        <Container style={styles.list}>
          List/Table
        </Container>
        <Container style={styles.fuzzySearch}>
          <Field
            type='text'
            name='search'
            label='Search Item Code/Name '
            placeholder='Search Item Code/Name'
            component={InputField}
          />
        </Container>
        <div style={styles.price}>
          <Field
            type='number'
            name='price'
            label='Price'
            placeholder='Price'
            component={InputField}
          />
        </div>
        <div style={styles.quantity}>
          <Field
            type='number'
            name='quantity'
            label='Quantity'
            placeholder='Quantity'
            component={InputField}
          />
        </div>
        <div style={styles.discount}>
          <Field
            type='number'
            name='discount'
            label='Discount'
            placeholder='Discount'
            component={InputField}
          />
        </div>
        <Button style={styles.addItem}>Button Add Item</Button>
      </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button style={styles.submit}>Submit New Sales Record</Button>
      </Modal.Actions>
  </Modal>
)

const styles = {
  mainContainer: {
    width: '768px !important',
    padding: '10px',
    marginTop: '10px',
    border: '2px solid red'
  },
  searchButton: {
    width: '21%',
    float: 'right',
    backgroundColor: 'green',
    color: 'white'
  },
  searchField: {
    width: '77%'
  },
  wrapper: {
    marginTop: '30px',
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  },
  customer: {
    backgroundColor: '#444',
    color: '#fff',
    padding: '10px',
    gridArea: '1 / 1 / span 1 / span 4'
  },
  invoiceNum: {
    backgroundColor: '#444',
		color: '#fff',
    padding: '10px',
    gridArea: '1 / 5 / span 1 / span 2'
  },
  startDate: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '2 / 1 / span 1 / span 4',
  },
  terms: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '2 / 5 / span 1 / span 2'
  },
  remarks: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '3 / 1 / span 1 / span 6',
    minHeight: '100px'
  },
  list: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '4 / 1 / span 1 / span 6',
    minHeight: '150px',
    maxHeight: 'auto',
  },
  fuzzySearch: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '5 / 1 / span 1 / span 3'
  },
  price: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '5 / 4 / span 1 / span 1'
  },
  discount: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '5 / 5 / span 1 / span 1'
  },
  quantity: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '5 / 6 / span 1 / span 1'
  },
  addItem: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '6 / 4 / span 1 / span 2'
  },
  submit: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '6 / 3 / span 1 / span 2'
  }
}

export default AddSalesRecordForm
