import React from 'react'
import OkCancelButton from '../../../../shared/reusableComponents/okCancelButton';

export default function UnhideSelectedRanges(props) {
    let rng = props.selectedRange;
    const unhideSelectedRanges = async () => {
      try {
        await Excel.run(async (context) => {
          let sheet = context.workbook.worksheets.getActiveWorksheet().getRange(rng);
          // let range = sheet.getUsedRange();
          sheet.rowHidden = false;
          await context.sync();
        });
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <React.Fragment>
    <OkCancelButton onClick={unhideSelectedRanges} />
   </React.Fragment>
  )
}
