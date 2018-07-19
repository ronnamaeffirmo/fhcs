import React from 'react'
import { Container } from 'semantic-ui-react'

const DeleteItem = (props) => {
  const { handleRemove, items } = props
  console.log(items)
  return (
    <div className="grid div">
      {items.map(item =>
        <div key={item._id} className="grid item">
          <b>name: {item.name}</b>
          <h3>description: {item.description}</h3>
          <h3>price: {item.price}</h3>
          <h3>quantity: {item.quantity}</h3>
          <h3>unit: {item.unit}</h3>
          <Container className="ui fluid container">
            <button className="ui inverted red button" type="buton" onClick={() => handleRemove(item._id)}>Remove</button>
          </Container>
        </div>
      )}
    </div>
  )
}

export default DeleteItem
