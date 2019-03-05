import App from '../../components/InventoriesReport'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('InventoriesReport', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App inventories={[{_id: '1', createdAt: '2017-12-14', quantity: '2', encoder: 'dianne', source: 'lbc'}]} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('allows us to set props', () => {
    const wrapper = mount(<App inventories={[{_id: '1', createdAt: '2017-12-14', quantity: '2', encoder: 'dianne', source: 'lbc'}]} bar="baz" />)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'App' })
    expect(wrapper.props().bar).toEqual('App')
  })

  it('renders 1 <Table />', () => {
    const wrapper = shallow(<App inventories={[{_id: '1', createdAt: '2017-12-14', quantity: '2', encoder: 'dianne', source: 'lbc'}]} />)
    expect(wrapper.find('Table')).toHaveLength(1)
  })
})
