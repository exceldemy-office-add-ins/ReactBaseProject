import React from "react";

import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";


const Horizontally = (props) => {

  let rng = props.sourceRanges;

  const horizontalFlip = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(rng);
        range.load(["values", "columnCount", "rowCount"]);
        await context.sync();
        const rowNo = range.rowCount;
        const colNo = range.columnCount;
        //flipping upper half of the rows
        for (let i = 0; i < parseInt(rowNo / 2); i++) {
          for (let j = 0; j < colNo; j++) {
            range.getCell(i, j).values = `${range.values[rowNo - 1 - i][j]}`;
          }
        }
        //flipping lower half of the rows
        for (let i = 0; i < parseInt(rowNo / 2); i++) {
          for (let j = 0; j < colNo; j++) {
            range.getCell(rowNo - 1 - i, j).values = `${range.values[i][j]}`;
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>      

      <Box >
      <Grid container spacing={2} sx={{display:'flex',justifyContent:'center'}}> 
        <Grid item sm={3}>
          <Button variant="outlined" size="small" color="success" onClick={horizontalFlip}>
            OK
          </Button>
        </Grid>
        <Grid item sm={3}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="outlined" size="small" color="error">
              Close
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>

    </div>
  );
};

export default Horizontally;
