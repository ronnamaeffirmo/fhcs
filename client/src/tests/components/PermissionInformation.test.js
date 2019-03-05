import App from '../../components/PermissionInformation'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('PermissionInformation', () => {
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

  it('renders the title. Please take a look at the descriptions for each permission.', () => {
    const wrapper = render(<App />)
    expect(wrapper.text()).toEqual("Permission InformationPlease take a look at the descriptions for each permission.ALLGETPOSTPUTPATCHDELETEChecking this will override the other selections.")
  })

  it('renders 1 <Header />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Header')).toHaveLength(1)
  })

  it('renders 1 <Container />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Container')).toHaveLength(1)
  })

  it('renders 1 <Tab />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Tab')).toHaveLength(1)
  })

})
