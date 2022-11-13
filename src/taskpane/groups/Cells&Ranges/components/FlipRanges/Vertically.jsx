import React from "react";

import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const Vertically = (props) =>{
  let rng= props.sourceRanges;
    const verticalFlip = async () => {
        try {
          await Excel.run(async (context) => {
       
            const range = context.workbook.worksheets.getActiveWorksheet().getRange(rng);
            range.load(["values","columnCount", "rowCount"]);
            await context.sync();
            const rowNo = range.rowCount;
            const colNo = range.columnCount;
            //flipping left half of the columns 
            for(let i =0; i<parseInt(colNo/2);i++){
              for(let j=0;j<rowNo;j++){
                range.getCell(j,i).values= `${range.values[j][colNo-(i+1)]}`;
              }
            }
            //flipping right half of the columns
            for(let i =0; i<parseInt(colNo/2);i++){
                for(let j=0;j<rowNo;j++){
                  range.getCell(j,colNo-(i+1)).values= `${range.values[j][i]}`;
                }
              }
          });
        } catch (error) {
          console.error(error);
        }
      };
    return(
    <div>
         <Box >
      <Grid container spacing={2} sx={{display:'flex',justifyContent:'center'}}> 
        <Grid item sm={3}>
          <Button variant="outlined" size="small" color="success" onClick={verticalFlip}>
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
    )
}

export default Vertically;