import React from 'react'
import { reduxForm } from 'redux-form'
import { Redirect } from 'react-router'
import { Button, Dimmer, Segment, Loader, Message, Form, Container, Dropdown } from 'semantic-ui-react'
// import DropdownField from './DropdownField'
import units from '../common/constants/units'

class EditForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      _id: this.props.item ? this.props.item._id : null,
      name: this.props.item ? this.props.item.name : '',
      description: this.props.item ? this.props.item.description : '',
      price: this.props.item ? this.props.item.price : '',
      quantity: this.props.item ? this.props.item.quantity : '',
      unit: this.props.item ? this.props.item.unit : '',
      errors: {},
      loading: false,
      done: false}
  }

  async componentDidMount () {
    const paramsId = this.props.match.params._id
    if (paramsId) {
      await this.props.getItem(paramsId)
    }
  }

  handleChange (event, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit () {
    let errors = {}
    if (this.state.name === '') errors.name = `Name can't be empty`
    if (this.state.description === '') errors.description = `Description can't be empty`
    if (this.state.price <= 0) errors.price = `Price must be greater than 0`
    if (this.state.quantity <= 0) errors.quantity = `Quantity must be greater than 0`
    this.setState({ errors })
    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      const { _id, name, description, price, quantity, unit } = this.state
      const data = { name, description, price, quantity, unit }
      this.setState({ loading: true })
      this.props.patchItem(_id, data).then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 1000)
        })
      }).then(() => {
        this.setState({ done: true, loading: false })
      })
    }
  }

  render () {
    return (
      <div>
        {
          this.state.done ? <Redirect to="/items" />
            : <Form error className= 'left column'>
              <Form.Field>
                <label>Name</label>
                <Form.Input
                  placeholder='Product name'
                  value={this.state.name} name = 'name'
                  type = 'text'
                  onChange={(e, { name, value }) => this.handleChange(e, { name, value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <Form.Input
                  placeholder='Product description'
                  value={this.state.description}
                  name = 'description'
                  type = 'text'
                  onChange={(e, { name, value }) => this.handleChange(e, { name, value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <Form.Input
                  placeholder='Price of the product'
                  value={this.state.price}
                  name = 'price'
                  type = 'number'
                  onChange={(e, { name, value }) => this.handleChange(e, { name, value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Quantity</label>
                <Form.Input
                  placeholder='Quantity of the product'
                  value={this.state.quantity}
                  name = 'quantity'
                  type = 'number'
                  onChange={(e, { name, value }) => this.handleChange(e, { name, value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Unit</label>
                <Dropdown
                  onChange={(e, { name, value }) => this.handleChange(e, { name, value })}
                  options={units}
                  name='unit'
                  placeholder='Choose an option'
                  selection
                  value={this.state.unit}
                />
              </Form.Field>
              <Form.Field>
                {Object.keys(this.state.errors).length !== 0 ? <span>
                  <Message
                    error
                    header='There was some errors with your submission'
                    list={[
                      this.state.errors.name,
                      this.state.errors.description,
                      this.state.errors.price,
                      this.state.errors.quantity
                    ]}
                  /></span>
                  : this.state.loading ? <Form.Field><Segment>
                    <Dimmer style={{height: '50px'}} active>
                      <Loader size='mini'>Loading</Loader>
                    </Dimmer>
                  </Segment></Form.Field>
                    : ''}
              </Form.Field>
              <Container>
                <Button color='teal' onClick={() => this.handleSubmit()} content='Submit'/>
              </Container>
            </Form>
        }
      </div>
    )
  }
}

export default reduxForm({
  form: 'edit'
})(EditForm)
