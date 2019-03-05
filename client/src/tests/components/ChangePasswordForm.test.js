import App from '../../components/ChangePasswordForm'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('ChangePasswordForm', () => {
  const handleSubmitStub = sinon.stub()
  const testapp = reduxForm({
    form: 'roleForm' 
  })(App)

  it('renders without crashing', () => {
    const wrapper = shallow(<App handleSubmit={handleSubmitStub}/>)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <testapp handlesubmit={'value'}>
        <div className="unique" />
      </testapp>
    ))
    expect(wrapper.contains(<div className="unique" />)).toEqual(true)
  })

  it('allows us to set props', () => {
    const wrapper = mount(<testapp bar="baz" handlesubmit={'value'}/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })

  it('renders 1 <Button />', () => {
    const wrapper = shallow(<App handleSubmit={handleSubmitStub} />)
    expect(wrapper.find('Button')).toHaveLength(1)
  })

  it('renders 1 <Form />', () => {
    const wrapper = shallow(<App handleSubmit={handleSubmitStub} />)
    expect(wrapper.find('Form')).toHaveLength(1)
  })

  it('renders 3 <Field />', () => {
    const wrapper = shallow(<App handleSubmit={handleSubmitStub} />)
    expect(wrapper.find('Field')).toHaveLength(3)
  })  
})
