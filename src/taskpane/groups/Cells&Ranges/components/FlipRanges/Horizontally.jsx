import { Button } from "@mui/material";
import React from "react";
import classes from './horizontally.module.css';

const Horizontally = (props) =>{
    let rng= props.sourceRanges;

    const horizontalFlip = async () => {
        try {
          await Excel.run(async (context) => {
       
            const range = context.workbook.worksheets.getActiveWorksheet().getRange(rng);
            range.load(["values","columnCount", "rowCount"]);
            await context.sync();
            const rowNo = range.rowCount;
            const colNo = range.columnCount;
            //flipping upper half of the rows 
            for(let i =0; i<parseInt(rowNo/2);i++){
              for(let j=0;j<colNo;j++){
                range.getCell(i,j).values= `${range.values[(rowNo-1)-i][j]}`;
              }
            }
            //flipping lower half of the rows
            for(let i =0; i<parseInt(rowNo/2);i++){
              for(let j=0;j<colNo;j++){
                range.getCell((rowNo-1)-i,j).values= `${range.values[i][j]}`;
              }
            }
          });
        } catch (error) {
          console.error(error);
        }
      };
    return(
    <div>
      <Button onClick={horizontalFlip} size="small" variant="contained">Flip Horizontally</Button>
   </div>
    )
}

export default Horizontally;