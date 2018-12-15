import App from '../components/EditItemForm'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme'
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
import { render } from 'react-testing-library'
import { mount } from 'enzyme'

configure({ adapter: new Adapter() })

describe('EditItemForm', () => {
  it('renders without crashing', () => {
    shallow(<App/>)
  })
  
//   it('renders welcome message', () => {
//     const { getByText } = render(<App/>)
//     expect(getByText('Username')).toBeInTheDocument()
//   })
  
  it('allows us to set props', () => {
    const wrapper = shallow(<App bar="baz"/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })
})