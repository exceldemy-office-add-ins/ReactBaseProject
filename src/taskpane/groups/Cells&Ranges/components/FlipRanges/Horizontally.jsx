import React from "react";
import classes from './horizontally.module.css';

const Horizontally = () =>{

    const horizontalFlip = async () => {
        try {
          await Excel.run(async (context) => {
       
            const range = context.workbook.getSelectedRange();
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
    { <button onClick={horizontalFlip}  className={classes.row1}>Flip Ranges</button>}
   </div>
    )
}

export default Horizontally;