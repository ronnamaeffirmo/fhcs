import React from 'react'
import { Container } from 'semantic-ui-react'
import './index.css'

const PaddedContainer = ({ children }) => (
  <Container text>{children}</Container>
)

export default PaddedContainer
