import App from '../../components/DeleteConfirmationModal'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('DeleteConfirmationModal', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App element={{name: 'reyliegh'}}/>)
    // expect(wrapper).toMatchSnapshot()
  })

  it('allows us to set props', () => {
    const wrapper = mount(<App element={{name: 'reyliegh'}} bar="baz" />)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })

  it('renders 1 <Modal />', () => {
    const wrapper = shallow(<App element={{name: 'reyliegh'}} />)
    expect(wrapper.find('Modal')).toHaveLength(1)
  })

  it('renders 1 <Header />', () => {
    const wrapper = shallow(<App element={{name: 'reyliegh'}} />)
    expect(wrapper.find('Header')).toHaveLength(1)
  })

  it('renders 1 <p />', () => {
    const wrapper = shallow(<App element={{name: 'reyliegh'}} />)
    expect(wrapper.find('p')).toHaveLength(1)
  })

  it('renders 1 <Button />', () => {
    const wrapper = shallow(<App element={{name: 'reyliegh'}} />)
    expect(wrapper.find('Button')).toHaveLength(1)
  })
})
