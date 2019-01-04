import App from '../../components/CustomerDataCard'

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount } from 'enzyme'
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
import { render } from 'react-testing-library'
import sinon from 'sinon'
configure({ adapter: new Adapter() })

describe('ChangePasswordForm', () => {
  const props = {
    customer: {name: 'aljon', _id: '123', address: 'iloilo', phone: '619'},
    actions: {removeCustomer: sinon.stub()}
  }
  it('renders without crashing', () => {
    shallow(<App {...props}/>)
  })
})
