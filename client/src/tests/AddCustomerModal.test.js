import App from '../components/AddCustomerModal'
import CustomerForm from '../components/CustomerForm'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'

configure({ adapter: new Adapter() })

describe('AddCustomerModal', () => {
  it('renders witout crashing', () => {
    shallow(<App />)
  })

  it('renders <CustomerForm/> components', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(CustomerForm)).toHaveLength(1)
  })
  
  it('allows us to set props', () => {
    const wrapper = mount(<App bar="baz"/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })

  it('renders the title NEW CUSTOMER', () => {
    const wrapper = render(<App />)
    expect(wrapper.text()).toContain("NEW CUSTOMER")
  })
})
