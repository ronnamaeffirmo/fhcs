
import React from 'react'
import { Field } from 'redux-form'
import { Form, Container, Button, Modal, Message } from 'semantic-ui-react'

import SalesDropDown from './SalesDropDown'
import SalesCalendarField from './SalesCalendarField'
import TextAreaField from './TextAreaField'
import SalesInputField from './SalesInputField'
import SalesSimpleDropDown from './SalesSimpleDropDown'
import SalesSearchField from './SalesSearchField'
import SalesTableCell from './SalesTableCell'

const netOptions = [
  {
    name: "Net30",
    value: "30",
    text: "Net 30"
  },
  {
    name: "Net60",
    value: "60",
    text: "Net 60"
  },
  {
    name: "Net90",
    value: "90",
    text: "Net 90"
  },
]

class AddSalesRecordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      errors: {}
    }
  }

  openModal() {
    this.setState({ open: true })
  }

  closeModal() {
    this.setState({ open: false })
    this.props.clearData()
  }

  async componentDidMount () {
    await this.props.getCustomers()
    await this.props.getItems()
  }

  handleSubmit() {
    let errors = {}
    const {customer, invoiceNumber, dateFrom, terms, remarks, quantity, itemLists} = this.props
    if (customer === '' || customer === undefined) errors.customer = `Customer is required`
    if (invoiceNumber === '' || invoiceNumber === undefined) errors.invoiceNumber = `Invoice Number is required`
    if (dateFrom === '' || dateFrom === undefined) errors.dateFrom = `Date From is required`
    if (terms === '' || terms === undefined) errors.terms = `Terms is required`
    if (remarks === '' || remarks === undefined) errors.remarks = `Remarks is required`
    if (quantity === '' || quantity === undefined) errors.quantity = `Quantity is required`
    if (itemLists.length === 0) errors.itemLists = `Item is empty`
    this.setState({ errors })
    // console.log(this.state.errors)
    const isValid = Object.keys(errors).length === 0
    if (isValid) {
    const {customer, invoiceNumber, dateFrom, discount, terms, dateTo, grandTotal, remarks, quantity, itemLists} = this.props
    const data = {customer, invoiceNumber, dateFrom, dateTo, grandTotal, terms, remarks, quantity, itemLists, discount}
      // console.log(data)
      this.props.createSalesRecord(data)
      this.props.clearData()
      this.setState({
        open: false
      })
    }
  }

  render () {
    const searchOptions = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "name",
        "description",
        "price"
      ]
    }

    let {
      customers, items, onCustomerDropdownChange,
      customer, invoiceNumber,
      onInvoiceNumberChange, dateFrom,
      onCalendarDateChange,
      terms, onNetTermsChange,
      dateTo, onRemarksChange,
      pristine, submitting,
      remarks, onItemSearch,
      searchValue, itemSearchResult,
      onSelectSearchResult, selectedResult,
      price, onPriceChange,
      onDiscountChange, discount,
      onQuantityChange, quantity,
      buttoAddItem, itemLists,
      grandTotal, removeFromList,
    } = this.props

    return (
      <Modal
        open = {this.state.open}
        onClose={() => this.closeModal()}
        closeOnDimmerClick = {false}
        trigger={
          <Button onClick={() => this.openModal()} 
            style={styles.searchButton}>ADD SALES
          </Button> } 
        centered={false}>
      <Modal.Header>Add Sales</Modal.Header>
       <Modal.Content>
        <Form style={styles.wrapper}>
          <Container style={styles.customer}>
            <Field
              name='customer'
              label='Customer: '
              placeholder='Select Customer'
              onDropdownChange={onCustomerDropdownChange}
              value={customer === undefined ? '' : customer}
              options={customers === undefined ? [] : customers}
              component={SalesSimpleDropDown}
            />
          </Container>
          <Container style={styles.invoiceNum}>
            <Field
              type='number'
              name='invoiceNumber'
              label='Invoice Number: '
              placeholder='Invoice Number'
              onInputChange={onInvoiceNumberChange}
              value = {invoiceNumber === undefined  ? '' : invoiceNumber}
              disabled={false}
              component={SalesInputField}
            />
          </Container>
          <Container style={styles.startDate}>
            <Field
              inputLabel='Date From: '
              name='dateFrom'
              onCalendarDateChange={onCalendarDateChange}
              date = {dateFrom === undefined ? '' : dateFrom}
              terms={terms}
              component={SalesCalendarField}
            />
          </Container>
          <Container style={styles.endDate}>
            <Field
              inputLabel='Date To: '
              name='dateTo'
              // onChange={() => console.log('change!')}
              otherValue={dateTo === undefined  ? '' : dateTo}
              disabled={true}
              component={SalesInputField}
            />
          </Container>
          <Container style={styles.terms}>
            <Field
              name='term'
              label='Terms: '
              onDropdownChange={onNetTermsChange}
              dateFrom={dateFrom}
              value={terms}              
              options={netOptions}
              component={SalesDropDown}
            />
          </Container>
          <Container style={styles.remarks}>
            <Field
              name='remarks'
              label='Remarks: '
              value={remarks}
              onInputChange={onRemarksChange}
              component={TextAreaField}
            />
          </Container>
          <Container style={styles.list}>
            <Field
              name='itemLists'
              value={itemLists}
              grandTotal={grandTotal}
              itemLists={itemLists}
              component={SalesTableCell}
              removeFromList={removeFromList}
            />
          </Container>
          <Container style={styles.fuzzySearch}>
            <Field
              type='text'
              name='search'
              label='Search Item Code/Name '
              placeholder='Search Item Code/Name'
              list = {items}
              onInputChange={onItemSearch}
              searchOptions={searchOptions}
              searchValue={searchValue}
              itemSearchResult={itemSearchResult}
              onSelectSearchResults={onSelectSearchResult}
              component={SalesSearchField}
            />
          </Container>
          <div style={styles.price}>
            <Field
              error
              type='number'
              name='price'
              label='Price'
              placeholder='Price'
              disabled={false}
              otherValue={price === undefined ? '' : price}
              onInputChange={onPriceChange}
              value={price === undefined ? '' : price}
              component={SalesInputField}
            />
          </div>
          <div style={styles.quantity}>
            <Field
              error
              type='number'
              name='quantity'
              label='Quantity'
              placeholder='Quantity'
              onInputChange={onQuantityChange}
              value = {quantity}
              disabled={false}
              component={SalesInputField}
            />
          </div>
          <div style={styles.discount}>
            <Field
              type='number'
              name='discount'
              label='Discount'
              placeholder='Discount'
              onInputChange={onDiscountChange}
              value = {discount}
              disabled={false}
              component={SalesInputField}
            />
          </div>
          <Button
            disabled={selectedResult === undefined || quantity === undefined}
            onClick={
              () => 
                buttoAddItem(selectedResult, price, quantity, discount)
            } 
            style={styles.addItem}>
            Button Add Item
          </Button>
        </Form>
        <Form.Field>
          <span>
            <Message
              error
              eader='There was some errors with your submission'
              list={[
                this.state.errors.customer,
                this.state.errors.invoiceNum,
                this.state.errors.dateFrom,
                this.state.errors.remarks,
                this.state.errors.terms,
                this.state.errors.quantity,
                this.state.errors.itemLists,
              ]}
          /></span>
        </Form.Field>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.closeModal()} negative>
            Cancel
          </Button>
          <Button onClick={() => this.handleSubmit()} style={styles.submit} disabled={pristine || submitting} type='submit'>
            Submit New Sales Record
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const styles = {
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
    padding: '10px'
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
  endDate: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '3 / 1 / span 1 / span 4',
  },
  terms: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '2 / 5 / span 1 / span 2',
  },
  remarks: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '4 / 1 / span 1 / span 6',
    minHeight: '100px'
  },
  list: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '5 / 1 / span 1 / span 6',
    minHeight: '150px',
    maxHeight: 'auto',
  },
  fuzzySearch: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '6 / 1 / span 1 / span 3'
  },
  price: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '6 / 4 / span 1 / span 1'
  },
  discount: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '6 / 6 / span 1 / span 1'
  },
  quantity: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '6 / 5 / span 1 / span 1'
  },
  addItem: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '7 / 4 / span 1 / span 2'
  },
  submit: {
    backgroundColor: '#444',
		color: '#fff',
		borderRadius: '5px',
    padding: '10px',
    gridArea: '7 / 3 / span 1 / span 2'
  }
}

export default AddSalesRecordForm
