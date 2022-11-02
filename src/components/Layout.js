import {Children} from 'react'
import {Navbar} from './Navbar'

export const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      <main style={{padding: '5rem'}}>{children}</main>
    </>
  )
}
