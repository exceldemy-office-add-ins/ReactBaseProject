import React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

export default function HideAllExceptSelectedRanges({selection}) {

    const hideAllExceptSelectedRanges = async () => {
        try {
          await Excel.run(async (context) => {
            const sheet2= context.workbook.worksheets.getActiveWorksheet();
            const range2= sheet2.getUsedRange();
            range2.rowHidden= true;
            await context.sync();

            let sepValues = selection.split(",");
            const sheet = context.workbook.worksheets.getActiveWorksheet();
            for (let i = 0; i < sepValues.length; i++) {
              sheet.getRange(sepValues[i]).rowHidden = false;
            }
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
          <Button variant="contained" size="small" color="success" onClick={hideAllExceptSelectedRanges}>
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
  )
}
