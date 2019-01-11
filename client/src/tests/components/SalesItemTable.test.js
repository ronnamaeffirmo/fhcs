import App from '../../components/SalesItemTable'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'
import sinon from 'sinon'

configure({ adapter: new Adapter() })

describe('SalesItemTable', () => {
  const props = {
    actions: {returnItemSub: sinon.stub()}
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<App items={[{_id: '1', item: {name: 'mouse'}}]} {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('allows us to set props', () => {
    const wrapper = mount(<App items={[{_id: '1', item: {name: 'mouse'}}]} {...props} bar="baz" />)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })

  it('renders 1 <Modal />', () => {
    const wrapper = shallow(<App items={[{_id: '1', item: {name: 'mouse'}}]} {...props} />)
    expect(wrapper.find('Modal')).toHaveLength(1)
  })

  it('renders 1 <Table />', () => {
    const wrapper = shallow(<App items={[{_id: '1', item: {name: 'mouse'}}]} {...props} />)
    expect(wrapper.find('Table')).toHaveLength(1)
  })

  it('renders 2 <Button />', () => {
    const wrapper = shallow(<App items={[{_id: '1', item: {name: 'mouse'}}]} {...props} />)
    expect(wrapper.find('Button')).toHaveLength(2)
  })

})
