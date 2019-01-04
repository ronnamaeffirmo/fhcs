import App from '../../components/AddRole'
import RoleForm from '../../components/RoleForm'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('AddRole', () => {
  const testapp = reduxForm({
    form: 'roleForm' 
  })(App)

  it('renders without crashing', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders <RoleForm/> components', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(RoleForm)).toHaveLength(1)
  })

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <testapp>
        <div className="unique" />
      </testapp>
    ))
    expect(wrapper.contains(<div className="unique" />)).toEqual(true)
  })

  it('allows us to set props', () => {
    const wrapper = mount(<testapp bar="baz"/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })
})
