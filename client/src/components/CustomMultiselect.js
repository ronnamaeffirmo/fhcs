import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'

// generic
class CustomMultiselect extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      options: [],
      currentValues: []
    }
  }

  componentDidMount() {
    // init options with workers data
    const mappedWorkers = this.props.workers.map(worker => ({
      key: worker, text: worker, value: worker
    }))
    this.setState({ options: mappedWorkers })
  }

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleChange = (e, { value }) => {
    const { input } = this.props
    this.setState({ currentValues: value })
    input.onChange(value)
  }

  render() {
    const { currentValues, options } = this.state
    const { label, input, ...custom } = this.props
    return (
      <Form.Field>
        <label>{label}</label>
        <Dropdown
          {...input}
          {...custom}
          options={options}
          search
          selection
          fluid
          multiple
          allowAdditions
          value={currentValues}
          onAddItem={this.handleAddition}
          onChange={this.handleChange}
          onBlur={(e, { value }) => input.onBlur(value)}
        />
      </Form.Field>
    )
  }
}

export default CustomMultiselect
