import { Button } from '@mui/material'
import React from 'react'

export default function HideSelectedRanges() {
    const hideSelectedRanges = async () => {
        try {
          await Excel.run(async (context) => {
            const range = context.workbook.getSelectedRange();
            range.rowHidden= true;
            // range.load(["address", "rowIndex", "columnIndex"]);
            await context.sync();
            
           
          });
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <React.Fragment>
      <Button variant='contained' size='small' color='secondary'
    onClick={hideSelectedRanges}>Hide Selected Ranges</Button>
    </React.Fragment>
  )
}
