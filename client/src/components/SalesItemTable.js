import React from 'react'
import { Table, Modal, Button, Popup, Form } from 'semantic-ui-react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { Input } from 'semantic-ui-react'

const SalesItemTable = ({items, _id, actions: {returnItem}}) => (
  <Modal trigger={<Button size={'medium'} icon={'eye'} style={{width: 150, float: 'right', textAlign: 'center', marginBottom: 5}} labelPosition={'left'} color={'teal'} content={'View Items'}/>}>
    <Modal.Header> Items </Modal.Header>
    <Modal.Content>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>Item Price</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>Quantity</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>Return Quantity</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>Sub Total</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>Discount</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>Total</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {console.log(items)}
          {items.map((item) => {
            const {quantity, returnQuantity, price, discount, item: {name}} = item
            const subtotal = parseFloat(item.price) * parseFloat(item.quantity)
            const total = subtotal - discount
            let rtnquantity = 0
            return (
              <Table.Row key={item._id}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱{price}</Table.Cell>
                <Table.Cell textAlign={'center'}>{quantity}</Table.Cell>
                <Table.Cell textAlign={'right'}>{returnQuantity}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱{subtotal}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱{discount}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱{total}</Table.Cell>
                <Table.Cell textAlign={'right'}>
                        <Input
                          width={'20px'}
                          type={'number'}
                          size={'small'}
                          action={{ color: 'red',
                            icon: 'share square outline', 
                            onClick:() => returnItem(_id, item._id, rtnquantity, quantity), 
                            labelPosition: 'left', 
                            content: 'Return' 
                          }}
                          actionPosition='left'
                          onChange={(e, data) => 
                            // console.log(data.value)
                            rtnquantity = data.value < 0 ? 0 : data.value.replace(/^0+/, '')
                          }
                        />
                  
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Modal.Content>
  </Modal>
)

// export default SalesItemTable

export default reduxForm({
  form: 'returnSaleForm',
})(SalesItemTable)

