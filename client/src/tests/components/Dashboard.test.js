import App from '../../components/Dashboard'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('Dashboard', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
    // expect(wrapper).toMatchSnapshot()
  })

  it('allows us to set props', () => {
    const wrapper = mount(<App bar="baz" />)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })

  it('renders 1 <div />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('div')).toHaveLength(1)
  })

  it('renders the title. Hello, fhcs! This is your dashboard', () => {
    const wrapper = render(<App />)
    expect(wrapper.text()).toEqual("Hello, fhcs! This is your dashboard")
  })
})
