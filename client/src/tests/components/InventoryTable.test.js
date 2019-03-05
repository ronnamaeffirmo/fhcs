import App from '../../components/InventoryTable'
import Loader from '../../components/Loader'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'

configure({ adapter: new Adapter() })

describe('InventoryTable', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders 1 <Segment/>', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Segment')).toHaveLength(1)
  })
  
  it('renders 1 <Divider/>', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Divider')).toHaveLength(1)
  })

  it('renders 2 <Message/>', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Message')).toHaveLength(2)
  })

  it('renders 1 <Input/>', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Input')).toHaveLength(1)
  })

  it('renders 1 <Table/>', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Table')).toHaveLength(1)
  })

  it('allows us to set props', () => {
    const wrapper = mount(<App bar="baz"/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })

  it('renders the message To add a new inventory', () => {
    const wrapper = render(<App />)
    expect(wrapper.text()).toContain("To add a new inventory")
  })
})