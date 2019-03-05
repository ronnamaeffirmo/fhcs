import App from '../../components/UserDataCard'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'
import { reduxForm } from 'redux-form'

configure({ adapter: new Adapter() })

describe('UserDataCard', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App username={'YOW'} role={{title: 'manager'}} />)
    expect(wrapper).toMatchSnapshot()
  })
  
  it('renders 1 <Card />', () => {
    const wrapper = shallow(<App username={'YOW'} role={{title: 'manager'}} />)
    expect(wrapper.find('Card')).toHaveLength(1)
  })
  
  it('renders 1 <Button />', () => {
    const wrapper = shallow(<App username={'YOW'} role={{title: 'manager'}} />)
    expect(wrapper.find('Button')).toHaveLength(1)
  })

  it('renders 1 <Image />', () => {
    const wrapper = shallow(<App username={'YOW'} role={{title: 'manager'}} />)
    expect(wrapper.find('Image')).toHaveLength(1)
  })

  it('renders 1 <Grid />', () => {
    const wrapper = shallow(<App username={'YOW'} role={{title: 'manager'}} />)
    expect(wrapper.find('Grid')).toHaveLength(1)
  })

  it('renders 3 <div />', () => {
    const wrapper = shallow(<App username={'YOW'} role={{title: 'manager'}} />)
    expect(wrapper.find('div')).toHaveLength(3)
  })

  it('renders 1 <table />', () => {
    const wrapper = shallow(<App username={'YOW'} role={{title: 'manager'}} />)
    expect(wrapper.find('table')).toHaveLength(1)
  })

  it('renders 1 <Popup />', () => {
    const wrapper = shallow(<App username={'YOW'} role={{title: 'manager'}} />)
    expect(wrapper.find('Popup')).toHaveLength(1)
  })

  it('renders 3 <Icon />', () => {
    const wrapper = shallow(<App username={'YOW'} role={{title: 'manager'}} />)
    expect(wrapper.find('Icon')).toHaveLength(3)
  })
})
