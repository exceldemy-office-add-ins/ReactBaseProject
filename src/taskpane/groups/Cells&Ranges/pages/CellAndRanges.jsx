import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CellAndRanges() {
  return (
    <React.Fragment>
       <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Link to='/flipRanges' style={{textDecoration: 'none'}}>
              <Button sx={{ bgcolor: 'secondary.main', color: 'primary.contrastText', fontSize:10 }} variant='contained'size="small">Flip Ranges</Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
            <Link to='/transposeRanges' style={{textDecoration: 'none'}}>
            <Button sx={{ bgcolor: 'secondary.main', color: 'primary.contrastText', fontSize:10 }} variant='contained'size="small">Transpose Ranges</Button>
            </Link>
            </Grid>

          </Grid>
        </Box>
    </React.Fragment>
  )
}
