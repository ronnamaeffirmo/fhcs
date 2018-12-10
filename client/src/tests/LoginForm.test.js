import App from '../components/LoginForm'

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

describe('LoginForm', () => {
  it('renders without crashing', () => {
    shallow(<App isAuthenticated={false}/>)
  });
  
  it('renders welcome message', () => {
    const { getByText } = render(<App isAuthenticated={false}/>)
    expect(getByText('Username')).toBeInTheDocument()
  });
  
  it('allows us to set props', () => {
    const wrapper = mount(<App bar="baz" isAuthenticated={false}/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  });
})