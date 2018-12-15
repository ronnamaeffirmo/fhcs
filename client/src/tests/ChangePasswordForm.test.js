import App from '../components/ChangePasswordForm'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount } from 'enzyme'
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
import { render } from 'react-testing-library'
import sinon from 'sinon'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('ChangePasswordForm', () => {
  const handleSubmitStub = sinon.stub()
  const testapp = reduxForm({
    form: 'roleForm' 
  })(App)

  it('renders without crashing', () => {
    shallow(<App handleSubmit={handleSubmitStub}/>)
  })

  it('renders welcome message', () => {
    const { getByText } = render(<testapp handlesubmit={'value'}/>)
    expect(getByText('')).toBeInTheDocument()
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
})
