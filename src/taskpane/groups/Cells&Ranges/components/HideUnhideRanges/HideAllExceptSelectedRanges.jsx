import { Button } from '@mui/material';
import React from 'react'

export default function HideAllExceptSelectedRanges() {
    const hideAllExceptSelectedRanges = async () => {
        try {
          await Excel.run(async (context) => {
            const sheet2= context.workbook.worksheets.getActiveWorksheet();
            const range2= sheet2.getUsedRange();
            range2.rowHidden= true;
            await context.sync();
            const range = context.workbook.getSelectedRange();
            range.rowHidden= false;
            // range.load(["address", "rowIndex", "columnIndex"]);
            await context.sync();
            
           
          });
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div><Button variant='contained' size='small' color='secondary'
    onClick={hideAllExceptSelectedRanges}>Hide All Except Selected Ranges</Button></div>
  )
}
