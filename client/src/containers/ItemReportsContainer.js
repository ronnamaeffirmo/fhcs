import React from 'react'
import { connect } from 'react-redux'
import ItemReport from '../components/ItemReport'
import { getItemReport } from '../actions/itemActions'

class ItemReportsContainer extends React.Component {
  componentDidMount () {
    console.log('[!] -- ItemReportsContainer Mounted')
    console.log('[!] -- GETTING INFORMATION FOR', this.props.itemId)
    this.props.getItemReport(this.props.itemId)
  }

  render () {
    return (
      <ItemReport {...this.props}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  itemId: ownProps.match.params.id,
  item: state.item.reportSelection,
  loading: state.item.loading
})

const mapDispatchToProps = (dispatch) => ({
  getItemReport: (itemId) => dispatch(getItemReport(itemId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemReportsContainer)
