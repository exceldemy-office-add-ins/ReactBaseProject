import { Box, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <React.Fragment>
      <Box>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <h2>Exceldemy-Add-In</h2>
           
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
