import React from 'react'
import EditCustomerForm from '../components/EditCustomerForm'
import {getCustomer, updateCustomer} from '../actions/customerActions'
import {connect} from 'react-redux'

class EditCustomerContainer extends React.Component {
  componentDidMount () {
    this.props.getCustomer(this.props.customerId)
  }

  render () {
    return <EditCustomerForm {...this.props}/>
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: state.customer.selection,
  customerId: ownProps.match.params.id
})

const mapDispatchToProps = (dispatch) => ({
  submissionHandler: (values) => {
    dispatch(updateCustomer(values))
  },
  getCustomer: (id) => {
    dispatch(getCustomer(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomerContainer)
