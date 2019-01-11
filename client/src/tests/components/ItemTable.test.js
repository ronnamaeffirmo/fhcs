import App from '../../components/ItemTable'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon'

configure({ adapter: new Adapter() })

describe('ItemTable', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  })

  it('renders 1 <div />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('div')).toHaveLength(1)
  })

  it('renders 1 <Table />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Table')).toHaveLength(1)
  })

  it('renders 1 <Segment />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Segment')).toHaveLength(1)
  })

  it('renders 1 <TableHeader />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('TableHeader')).toHaveLength(1)
  })
})
