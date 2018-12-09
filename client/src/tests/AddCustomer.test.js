import AddCustomer from '../components/AddCustomer'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
import { render } from 'react-testing-library'
import { mount } from 'enzyme'

configure({ adapter: new Adapter() });

describe('AddCustomer', () => {
  it('renders without crashing', () => {
    shallow(<AddCustomer handleSubmit={() => console.log('click')}/>)
  });
  
  it('renders welcome message', () => {
    const { getByText } = render(<AddCustomer handleSubmit={() => console.log('click')}/>)
    expect(getByText('NEW CUSTOMER')).toBeInTheDocument()
  });
  
  it('allows us to set props', () => {
    const wrapper = mount(<AddCustomer bar="baz" handleSubmit={() => console.log('click')} />)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'AddCustomer' })
    expect(wrapper.props().bar).toEqual('AddCustomer')
  });
})