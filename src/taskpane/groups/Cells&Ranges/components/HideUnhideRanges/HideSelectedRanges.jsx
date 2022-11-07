import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';

export default function HideSelectedRanges() {
  const [selection, setSelection] = React.useState('');
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


      const getSelectionFromEventHandler = async () => {
        try {
          await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getActiveWorksheet();
            sheet.onSelectionChanged.add(function (event) {
                return Excel.run(async (context) => {
                    // console.log("The selected range has changed to: " + event.address);
                    setSelection(event.address);
                    await context.sync();
                    
                   
                });
            });
            await context.sync();
        });
        } catch (error) {
          console.error(error);
        }
      };


    const hideDiscontinuousRanges = async () => {
        try {
          await Excel.run(async (context) => {
            // const range = context.workbook.worksheets.getActiveWorksheet().getRange(selection);
            let sepValues= selection.split(',');
            console.log(sepValues[0])
            const sheet = context.workbook.worksheets.getActiveWorksheet();
            sheet.getRange(sepValues[0]).rowHidden= true;
            
            // range.rowHidden= true; 
            //  range.load(["address", "rowIndex", "columnIndex", "rowIndex", "columnIndex"]);
            await context.sync();
            // console.log(range.rowIndex)
            
           
          });
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(()=>{getSelectionFromEventHandler()},[])
  return (
    <React.Fragment>
      <div>
        <p>{selection}</p>
        {/* <p>{selection[0]}</p> */}
        {/* <p>{selection[1]}</p>
        <p>{selection[2]}</p>
        <p>{selection[3]}</p>
        <p>{selection[4]}</p>
        <p>{selection[5]}</p>
        <p>{selection[6]}</p>
        <p>{selection[7]}</p>
        <p>{selection[8]}</p> */}
      </div>
      <Button variant='contained' size='small' color='secondary'
    onClick={hideSelectedRanges}>Hide Selected Ranges</Button><br />

    <Button variant='contained' size='small' color='secondary'
    onClick={hideDiscontinuousRanges}>Hide Discontinous Selected Ranges</Button>
    </React.Fragment>
  )
}
