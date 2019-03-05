import App from '../../components/RoleForm'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount } from 'enzyme'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('RoleForm', () => {
  const testapp = reduxForm({
    form: 'roleForm'
  })(App)

  it('renders without crashing', () => {
    shallow(<App/>)
  })

  // it('renders welcome message', () => {
  //   const { getByText } = render(<testapp />)
  //   expect(getByText('')).toBeInTheDocument()
  // })

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

  // it('renders 1 <Container />', () => {
  //   const wrapper = shallow(<App />)
  //   expect(wrapper.find('Container')).toHaveLength(1)
  // })
})
