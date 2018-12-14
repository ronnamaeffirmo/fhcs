import React from 'react'
import { Table, Modal, Button, Icon } from 'semantic-ui-react'

const SalesItemTable = ({items, _id, actions: {returnItem}}) => (
  <Modal trigger={<Button size={'medium'} icon={'eye'}
                          style={{width: 150, float: 'right', textAlign: 'center', marginBottom: 5}}
                          labelPosition={'left'} color={'teal'} content={'View Items'}/>}>
    <Modal.Header>Items</Modal.Header>
    <Modal.Content>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>Item Price</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>Quantity</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>Return Quantity</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>Sub Total</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>Discount</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* {console.log(items)} */}
          {items.map((item) => {
            const {quantity, returnQuantity, price, discount, item: {name}} = item
            const subtotal = (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)
            const returnSubtotal = (parseFloat(item.price) * parseFloat(item.returnQuantity)).toFixed(2)
            const total = subtotal - discount -  returnSubtotal
            return (
              <Table.Row key={item._id}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱{price}</Table.Cell>
                <Table.Cell textAlign={'center'}>{quantity}</Table.Cell>
                <Table.Cell textAlign={'center'}>
                  {returnQuantity}
                  <Button.Group size={'mini'} style={{marginLeft: 10}}>
                    <Button icon
                            disabled={returnSubtotal === subtotal}
                            onClick={() => {
                              returnItem({
                                saleId: _id,
                                itemId: item._id,
                                returnQuantity: returnQuantity + 1,
                                items: items
                              })
                            }}>
                      <Icon name='chevron up' color={'red'}/>
                    </Button>
                    <Button icon
                            disabled={returnQuantity === 0}
                            onClick={() => {
                              returnItem({
                                saleId: _id,
                                itemId: item._id,
                                returnQuantity: returnQuantity - 1,
                                items: items
                              })
                            }}>
                      <Icon name='chevron down' color={'blue'}/>
                    </Button>
                  </Button.Group>


                </Table.Cell>
                <Table.Cell textAlign={'right'}>₱{subtotal}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱{discount}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱{total}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Modal.Content>
  </Modal>
)

export default SalesItemTable

