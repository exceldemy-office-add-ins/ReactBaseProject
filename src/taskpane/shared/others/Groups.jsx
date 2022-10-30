import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Groups() {
  return (
    <React.Fragment>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Link to='/cell&Ranges' style={{textDecoration: 'none'}}>
              <Button sx={{ bgcolor: 'secondary.main', color: 'primary.contrastText' }} variant='contained'size="small">Cell & Ranges</Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Button variant='outlined' size="small" xs={{fontSize:'h6.fontSize'}}>Table</Button>
            </Grid>

          </Grid>
        </Box>
    </React.Fragment>
  )
}
