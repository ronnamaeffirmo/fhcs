import App from '../../components/DropdownField'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('DropdownField', () => {
  it('renders witout crashing', () => {
    const wrapper = shallow(<App input={{value: 'one'}} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('allows us to set props', () => {
    const wrapper = mount(<App input={{value: 'one'}} bar="baz" />)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })

  it('renders 1 <Dropdown />', () => {
    const wrapper = shallow(<App input={{value: 'one'}} />)
    expect(wrapper.find('Dropdown')).toHaveLength(1)
  })

  it('renders 1 <label />', () => {
    const wrapper = shallow(<App input={{value: 'one'}} />)
    expect(wrapper.find('label')).toHaveLength(1)
  })
 
})
