import App from '../../components/InventoryList'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'
import sinon from 'sinon'

configure({ adapter: new Adapter() })

describe('InventoryList', () => {
  const getInventories = sinon.stub()
  it('renders without crashing', () => {
    const wrapper = shallow(<App getInventories={getInventories}/>)
    expect(wrapper).toMatchSnapshot()
  })

  it('allows us to set props', () => {
    const wrapper = mount(<App getInventories={getInventories} bar="baz"/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })

  it('renders 1 <Container/>', () => {
    const wrapper = shallow(<App getInventories={getInventories} />)
    expect(wrapper.find('Container')).toHaveLength(1)
  })

  it('renders 2 <Segment/>', () => {
    const wrapper = shallow(<App getInventories={getInventories} />)
    expect(wrapper.find('Segment')).toHaveLength(2)
  })

  it('renders 1 <Input/>', () => {
    const wrapper = shallow(<App getInventories={getInventories} />)
    expect(wrapper.find('Input')).toHaveLength(1)
  })

  it('renders 2 <Message/>', () => {
    const wrapper = shallow(<App getInventories={getInventories} />)
    expect(wrapper.find('Message')).toHaveLength(2)
  })

  it('renders 1 <Button/>', () => {
    const wrapper = shallow(<App getInventories={getInventories} />)
    expect(wrapper.find('Button')).toHaveLength(1)
  })

  it('renders 1 <Table/>', () => {
    const wrapper = shallow(<App getInventories={getInventories} />)
    expect(wrapper.find('Table')).toHaveLength(1)
  })
})
