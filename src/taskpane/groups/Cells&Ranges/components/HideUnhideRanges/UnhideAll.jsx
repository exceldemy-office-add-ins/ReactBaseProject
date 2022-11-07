import { Button } from '@mui/material';
import React from 'react'

export default function UnhideAll() {
    const unhideAll = async () => {
        try {
          await Excel.run(async (context) => {
            let sheet = context.workbook.worksheets.getItem("Sheet1");

    let range = sheet.getUsedRange();
    range.load("address");
    await context.sync();
    range.rowHidden=false;
    
    console.log(`The address of the entire worksheet range is "${range.address}"`);
           
          });
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div><Button variant='contained' size='small' color='primary'
    onClick={unhideAll}>Unhide All</Button></div>
  )
}
