import React from 'react'
import { Button, Container, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import CustomerForm from './CustomerForm'

const styles = {
  mainContainer: {
    marginTop: 30
  }
}

const EditCustomerForm = (props) => {
  return (
    <Container style={styles.mainContainer}>
      <Container>
        <Link to={'/customers'}><Button color={'grey'} content={'Back to Customers'} icon={'arrow left'}
                                        labelPosition={'left'}/></Link>
        <Divider/>
        <CustomerForm {...props}/>
      </Container>
    </Container>
  )
}

export default EditCustomerForm
