import React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

export default function HideSelectedRanges(props) {
  let rng = props.selection;
  const hideSelectedRanges = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(rng);
        range.rowHidden = true;
        await context.sync();
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
            <Button variant="contained" size="small" color="success" onClick={hideSelectedRanges}>
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
