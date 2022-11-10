import { Home } from '@mui/icons-material'
import React from 'react'

import { Link} from 'react-router-dom'



export default function NavLinks() {
  return (
    <React.Fragment>
      <nav style={{padding:'10px', display: 'flex'}}>
      <Link to='/'  style={{paddingRight: 10}}><Home/> </Link>
      </nav>

    </React.Fragment>
  )
}
