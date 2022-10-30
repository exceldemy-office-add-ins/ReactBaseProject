import React from "react";

const Vertically = () =>{

    const verticalFlip = async () => {
        try {
          await Excel.run(async (context) => {
       
            const range = context.workbook.getSelectedRange();
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
    { <button onClick={verticalFlip}>Flip Ranges</button>}
   </div>
    )
}

export default Vertically;