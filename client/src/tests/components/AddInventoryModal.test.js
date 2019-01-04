import App from '../../components/AddInventoryModal'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('AddInventoryModal', () => {
  const testapp = reduxForm({
    form: 'editForm' 
  })(App)

  it('renders witout crashing', () => {
    shallow(<App options={{sources:'lol'}}/>)
  })

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <testapp options={{sources:'lol'}}>
        <div className="unique" />
      </testapp>
    ))
    expect(wrapper.contains(<div className="unique" />)).toEqual(true)
  })

  it('allows us to set props', () => {
    const wrapper = mount(<testapp bar="baz" options={{sources:'lol'}}/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })

  it('renders <Form />', () => {
    const wrapper = shallow(<App options={{sources:'lol'}} />)
    expect(wrapper.find('Form')).toHaveLength(1)
  })

  it('renders 2 <Buttons />', () => {
    const wrapper = shallow(<App options={{sources:'lol'}} />)
    expect(wrapper.find('Button')).toHaveLength(2)
  })

  it('renders 12 <Field />', () => {
    const wrapper = shallow(<App options={{sources:'lol'}} />)
    expect(wrapper.find('Field')).toHaveLength(12)
  })
})
