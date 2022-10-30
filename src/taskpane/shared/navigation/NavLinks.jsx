import React from 'react'

import { Link} from 'react-router-dom'



export default function NavLinks() {
  return (
    <React.Fragment>
      <nav style={{padding:'10px', display: 'flex'}}>
      <Link to='/'  style={{paddingRight: 10}}>Home</Link>
      <Link to='/groups' style={{paddingRight: 10}}>Groups</Link><br/>
      </nav>

    </React.Fragment>
  )
}
