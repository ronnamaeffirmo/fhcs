import App from '../../components/CustomerDataCard'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
configure({ adapter: new Adapter() })

describe('CustomerDataCard', () => {
  const props = {
    customer: {name: 'aljon', _id: '123', address: 'iloilo', phone: '619'},
    actions: {removeCustomer: sinon.stub()}
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<App {...props}/>)
    // expect(wrapper).toMatchSnapshot()
  })

  // it('renders children when passed in', () => {
  //   const wrapper = shallow((
  //     <App {...props}>
  //       <div className="unique" />
  //     </App>
  //   ))
  //   expect(wrapper.contains(<div className="unique" />)).toEqual(true)
  // })

  // it('allows us to set props', () => {
  //   const wrapper = mount(<App {...props} bar="baz"/>)
  //   expect(wrapper.props().bar).toEqual('baz')
  //   wrapper.setProps({ bar: 'App' })
  //   expect(wrapper.props().bar).toEqual('App')
  // })
})
