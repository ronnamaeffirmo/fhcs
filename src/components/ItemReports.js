import React, { Component } from 'react'
import { Container, Segment, Statistic, Menu } from 'semantic-ui-react'
import { Bar } from 'react-chartjs-2'
import { Field } from 'redux-form'
import DropdownField from './DropdownField'

import periods from '../common/constants/periods'

// dummy data
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    { label: 'Sales',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
      hoverBorderColor: 'rgba(255, 99, 132, 1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
}

class ItemReports extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeItem: 'sales'
    }

    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick (e, { name }) {
    this.setState({ activeItem: name })
  }

  render () {
    const { activeItem } = this.state
    return (
      <Container style={styles.mainContainer}>
        <Field
          type='selection'
          name='period'
          placeholder='Period of time'
          component={DropdownField}
          options={periods}
        />

        <Segment>
          <Bar
            data={data}
            width='100%'
            height='20vh'
          />
        </Segment>

        <Segment style={styles.statisticSegment}>
          <Statistic.Group widths='three' color='red'>
            <Statistic>
              <Statistic.Value>19000</Statistic.Value>
              <Statistic.Label>Sales</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>503</Statistic.Value>
              <Statistic.Label>Stocks</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>78</Statistic.Value>
              <Statistic.Label>Total Orders</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>

        <Menu pointing secondary>
          <Menu.Item
            name='sales'
            active={activeItem === 'sales'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='inventory'
            active={activeItem === 'inventory'}
            onClick={this.handleItemClick}
          />
        </Menu>

        <Segment>
          { activeItem === 'sales'
            ? 'Sales' : 'Inventory'
          }
        </Segment>
      </Container>
    )
  }
}

const styles = {
  mainContainer: {
    marginTop: '10px'
  },
  statisticSegment: {
    padding: '40px 240px 40px 240px'
  }
}

export default ItemReports
