import App from '../../components/UserList'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'
import sinon from 'sinon'

configure({ adapter: new Adapter() })

describe('UserList', () => {
  const props = {
      users: [{_id: '12', name: 'mike'}, {_id: '123', name: 'joe'}]
  }
  it('renders without crashing', () => {
    const wrapper = shallow(<App {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders 1 <Container />', () => {
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.find('Container')).toHaveLength(1)
  })

  it('renders 2 <Segment />', () => {
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.find('Segment')).toHaveLength(2)
  })

  it('renders 1 <Grid />', () => {
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.find('Grid')).toHaveLength(1)
  })

  it('renders 1 <Input />', () => {
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.find('Input')).toHaveLength(1)
  })

  it('renders 1 <Grid />', () => {
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.find('Grid')).toHaveLength(1)
  })
})
