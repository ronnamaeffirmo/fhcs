import App from '../../components/CustomDropzone'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render } from 'enzyme'

configure({ adapter: new Adapter() })

describe('CustomerDataCard', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App input={{value: '1'}} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders <div/>', () => {
    const wrapper = render(<App input={{value: '1'}} />)
    expect(wrapper.find('div')).toHaveLength(2)
  })

  it('renders <input/>', () => {
    const wrapper = render(<App input={{value: '1'}} />)
    expect(wrapper.find('input')).toHaveLength(1)
  })

})
