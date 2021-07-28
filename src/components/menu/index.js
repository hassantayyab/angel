import React from 'react'
import DesktopMenu from './desktop'
import MobileMenu from './mobile'
import Layout from '../utils/layout'

// Header menu can only be nested twice (e.g. Parent -> child -> grandchild)
// This has already been handled in the graphql query

const HeaderMenu = ({ data }) => (
  <Layout>
    <DesktopMenu list={data} />
    <MobileMenu list={data} />
  </Layout>
)

export default HeaderMenu
