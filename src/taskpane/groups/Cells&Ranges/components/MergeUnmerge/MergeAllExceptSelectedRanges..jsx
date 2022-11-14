import { Typography } from '@mui/material';
import React from 'react'
import OkCancelButton from '../../../../shared/reusableComponents/okCancelButton';

export default function MergeAllExceptSelectedRanges({selection}) {
  const mergeAllExceptSelection = async () => {
    try {
      await Excel.run(async (context) => {
        const sheet2= context.workbook.worksheets.getActiveWorksheet();
        // sheet2.unmerge(true);
        const range2= sheet2.getUsedRange();
        const mergeRange = range2.getMergedAreasOrNullObject();
        mergeRange.load(['address', 'cellCount'])
        await context.sync();
        
        console.log(mergeRange.address);
        console.log(mergeRange.cellCount);
        let sepValues = mergeRange.address.split(",");
        // console.log(sepValues[1])

        const sheet = context.workbook.worksheets.getActiveWorksheet();

        for (let i = 0; i < sepValues.length; i++) {
          sheet.getRange(sepValues[i]).format.font.color= 'red';
      
        }
        // for (let i = 0; i < sepValues.length; i++) {
        //   sheet.getRange(sepValues[i]).unmerge(true);
      
        // }
        // await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>

       <Typography color='error' variant="body2">Merging cells only keeps the upper-left value and discards other values.</Typography>
    <OkCancelButton onClick={mergeAllExceptSelection}/>
   </React.Fragment>
  )
}
