import React from 'react'

import DeleteItemFrom from '../components/DeleteItemForm'

const dummyItems = [
  {
    _id: 1,
    name: 'orange',
    description: 'matamis',
    price: '40',
    quantity: '1',
    unit: 'pcs'
  },
  {
    _id: 2,
    name: 'apple',
    description: 'red',
    price: '50',
    quantity: '1',
    unit: 'pcs'
  },
  {
    _id: 3,
    name: 'banana',
    description: 'yellow',
    price: '15',
    quantity: '14',
    unit: 'pcs'
  },
  {
    _id: 4,
    name: 'mango',
    description: 'matamis/maasim',
    price: '35',
    quantity: '1',
    unit: 'pcs'
  },
  {
    _id: 5,
    name: 'grapes',
    description: 'small and sweet',
    price: '300',
    quantity: '1',
    unit: 'kg'
  },
  {
    _id: 6,
    name: 'papaya',
    description: 'yummy',
    price: '100',
    quantity: '1',
    unit: 'pcs'
  }
]

class DeleteItemFormContainer extends React.Component {
  handleRemove (id) {
    //  insert remove code here:
    console.log(`remove id: ${id}`)
  }
  render () {
    return (
      <DeleteItemFrom handleRemove={this.handleRemove} items={dummyItems} />
    )
  }
}

export default DeleteItemFormContainer
