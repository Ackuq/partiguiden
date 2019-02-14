import Header from './Header'
import React from 'react'

const Layout = (props) => (
  <React.Fragment>
    <Header />
    {props.children}
  </React.Fragment>
)

export default Layout
