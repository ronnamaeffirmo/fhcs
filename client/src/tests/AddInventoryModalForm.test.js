import App from '../components/AddInventoryModalForm'

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

describe('AddInventoryModalForm', () => {
  it('renders without crashing', () => {
    shallow(<App item={{name: 'shovel'}} options={{sources: 'test', producers:'test', statuses: 'test'}}/>)
  });
  
  it('renders welcome message', () => {
    const { getByText } = render(<App item={{name: 'shovel'}} options={{sources: 'test', producers:'test', statuses: 'test'}}/>)
    expect(getByText('Add Inventory')).toBeInTheDocument()
  });
  
  it('allows us to set props', () => {
    const wrapper = mount(<App bar="baz" item={{name: 'shovel'}} options={{sources: 'test', producers:'test', statuses: 'test'}}/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  });
})