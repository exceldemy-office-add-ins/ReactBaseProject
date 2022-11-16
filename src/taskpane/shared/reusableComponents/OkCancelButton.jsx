import React from "react";

import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

export default function OkCancelButton(props) {
  return (
    <div style={{marginTop: '20px'}}>
      <Box >
        <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item sm={3}>
            <Button variant="outlined" size="small" color="success" onClick={props.onClick}>
              OK
            </Button>
          </Grid>
          <Grid item sm={3}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="outlined" size="small" color="error">
                Cancel
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
