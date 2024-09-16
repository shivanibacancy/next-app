import React from 'react'
import Help from './page'

describe('<Help />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Help />)
  })
})