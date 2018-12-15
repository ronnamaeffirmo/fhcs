import App from '../components/AddInventoryModal'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount } from 'enzyme'
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
import { render } from 'react-testing-library'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() });

describe('AddInventoryModal', () => {
  const testapp = reduxForm({
    form: 'editForm' 
  })(App)

  it('renders witout crashing', () => {
    shallow(<App options={{sources:'lol'}}/>)
  })
  
  it('renders welcome message', () => {
    const { getByText } = render(<testapp options={{sources:'lol'}}/>);
    expect(getByText('')).toBeInTheDocument()
  });

  it('allows us to set props', () => {
    const wrapper = mount(<testapp bar="baz" options={{sources:'lol'}}/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })
})
