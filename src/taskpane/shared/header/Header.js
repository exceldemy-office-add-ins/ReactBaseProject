import { Box, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "../navigation/NavLinks";

export default function Header() {
  return (
    <React.Fragment>
      <Box>
        <Grid container>
       
            <NavLinks/>
           

        </Grid>
      </Box>
    </React.Fragment>
  );
}
