import { Typography } from '@mui/material';
import React from 'react'
import OkCancelButton from '../../../../shared/reusableComponents/okCancelButton';

export default function MergeSelectedRanges({selection}) {
    const mergeRanges = async () => {
        try {
          await Excel.run(async (context) => {
            let sepValues = selection.split(",");
            const sheet = context.workbook.worksheets.getActiveWorksheet();
            for (let i = 0; i < sepValues.length; i++) {
              sheet.getRange(sepValues[i]).merge(true);
              sheet.getRange(sepValues[i]).format.horizontalAlignment= 'Center';
            }
            await context.sync();
            
            
          });
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <React.Fragment>
      <Typography color='error' variant="body2">Merging cells only keeps the upper-left value and discards other values.</Typography>
    <OkCancelButton onClick={mergeRanges}/>
   </React.Fragment>
  )
}
