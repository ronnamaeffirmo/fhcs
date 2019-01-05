import App from '../../components/CustomerList'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'
import sinon from 'sinon'

configure({ adapter: new Adapter() })

describe('CustomerList', () => {
  const getCustomers = sinon.stub()
  const testapp = reduxForm({
    form: 'form' 
  })(App)

  it('renders witout crashing', () => {
    const wrapper = shallow(<App getCustomers={getCustomers}/>)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <testapp getCustomers={getCustomers}>
        <div className="unique" />
      </testapp>
    ))
    expect(wrapper.contains(<div className="unique" />)).toEqual(true)
  })

  it('allows us to set props', () => {
    const wrapper = mount(<testapp getcustomers={'sample'} bar="baz"/>)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })

  it('renders 2 <Segment/>', () => {
    const wrapper = shallow(<App getCustomers={getCustomers} />)
    expect(wrapper.find('Segment')).toHaveLength(2)
  })

  it('renders 1 <Container/>', () => {
    const wrapper = shallow(<App getCustomers={getCustomers} />)
    expect(wrapper.find('Container')).toHaveLength(1)
  })

  it('renders 1 <Input/>', () => {
    const wrapper = shallow(<App getCustomers={getCustomers} />)
    expect(wrapper.find('Input')).toHaveLength(1)
  })
})
