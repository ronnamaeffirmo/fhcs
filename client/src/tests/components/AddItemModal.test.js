import App from '../../components/AddItemModal'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
import { render } from 'react-testing-library'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('AddItemModal', () => {
  const testapp = reduxForm({
    form: 'item' 
  })(App)

  it('renders without crashing', () => {
    shallow(<App/>)
  })

  it('renders welcome message', () => {
    const { getByText } = render(<testapp />)
    expect(getByText('')).toBeInTheDocument()
  })

  it('allows us to set props', () => {
    const wrapper = mount(<testapp bar="baz"/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })
})
