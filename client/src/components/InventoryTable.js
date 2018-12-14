import React from 'react'
import { Button, Divider, Input, Message, Segment, Table } from 'semantic-ui-react'
import _ from 'lodash'
import moment from 'moment'

const styles = {
  mainContainer: {
    marginRight: '20%',
    marginLeft: '20%',
    marginTop: 30
  },
  topSegment: {
    boxShadow: 'none'
  },
}

const InventoryTable = props => {
  let {inventories, filterInventories, filteredInventories} = props
  inventories = filteredInventories || inventories || []
  return (
    <div style={styles.mainContainer}>
      <Segment style={styles.topSegment}>
        <Input
          fluid
          icon='search'
          placeholder='Search inventories here...'
          onChange={(e) => { filterInventories(e.target.value) }}
        />
        <Divider/>
        <Message style={{padding: '0.5rem 1rem'}} size='tiny' info>
          To add a new inventory, head over to <b>items list</b> and
          click <Button circular icon='add' size='mini'/>on an item card
        </Message>
      </Segment>
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign={'center'}>ITEM</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>DATE</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>QUANTITY</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>SOURCE</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>STATUS</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>PRODUCER</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {inventories && inventories.map(inventory => {
            return (
              <Table.Row key={inventory._id}>
                <Table.Cell textAlign={'center'}>{inventory.item.name}</Table.Cell>
                <Table.Cell textAlign={'center'}>{moment(inventory.date).format('MMMM DD, YYYY')}</Table.Cell>
                <Table.Cell textAlign={'center'}>{inventory.quantity > 0 ? inventory.quantity : 'N/A'} </Table.Cell>
                <Table.Cell
                  textAlign={'center'}>{inventory.source ? _.capitalize(inventory.source) : 'N/A'}</Table.Cell>
                <Table.Cell textAlign={'center'}>{_.capitalize(inventory.status.replace('_', ' '))}</Table.Cell>
                <Table.Cell
                  textAlign={'center'}>{inventory.producer ? _.upperCase(inventory.producer) : 'N/A'}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default InventoryTable
