import App from '../../components/ItemList'
import ItemDataCard from '../../components/ItemDataCard'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon'

configure({ adapter: new Adapter() })

describe('AddCustomerModal', () => {
  const getItemsStub = sinon.stub()
  it('renders without crashing', () => {
    shallow(<App getItems={getItemsStub} />)
  })

  it('renders 1 <Container/>', () => {
    const wrapper = shallow(<App getItems={getItemsStub} />)
    expect(wrapper.find('Container')).toHaveLength(1)
  })

  it('renders 2 <Segment/>', () => {
    const wrapper = shallow(<App getItems={getItemsStub} />)
    expect(wrapper.find('Segment')).toHaveLength(2)
  })

  it('renders 2 <Message/>', () => {
    const wrapper = shallow(<App getItems={getItemsStub} />)
    expect(wrapper.find('Message')).toHaveLength(2)
  })

  it('renders 1 <Divider/>', () => {
    const wrapper = shallow(<App getItems={getItemsStub} />)
    expect(wrapper.find('Divider')).toHaveLength(1)
  })

  it('renders 1 <Grid/>', () => {
    const wrapper = shallow(<App getItems={getItemsStub} />)
    expect(wrapper.find('Grid')).toHaveLength(1)
  })
})
