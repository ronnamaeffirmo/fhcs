import App from '../components/AddCustomerModal'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount } from 'enzyme'
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
import { render } from 'react-testing-library'

configure({ adapter: new Adapter() });

describe('AddCustomerModal', () => {
  it('renders witout crashing', () => {
    shallow(<App/>)
  })
  
  it('renders welcome message', () => {
    const { getByText } = render(<App />);
    expect(getByText('NEW CUSTOMER')).toBeInTheDocument()
  })

  it('allows us to set props', () => {
    const wrapper = mount(<App bar="baz"/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })
})
