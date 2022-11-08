import React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

export default function UnhideAll() {
  const unhideAll = async () => {
    try {
      await Excel.run(async (context) => {
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        let range = sheet.getUsedRange();
        await context.sync();
        range.rowHidden = false;
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
      <Box>
        <Grid container spacing={2}>
          <Grid item sm={3}>
            <Button variant="contained" size="small" color="success" onClick={unhideAll}>
              OK
            </Button>
          </Grid>
          <Grid item sm={3}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="contained" size="small" color="error">
                Close
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
