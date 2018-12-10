import App from '../components/AddItemModal'

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

describe('AddItemModalForm', () => {
  it('renders without crashing', () => {
    shallow(<App/>)
  });

//   it('renders welcome message', () => {
//     const { getByText } = shallow(<App />);
//     expect(getByText('Add Inventory')).toBeInTheDocument()
//   });

  it('allows us to set props', () => {
    const wrapper = shallow(<App bar="baz"/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  });
})
