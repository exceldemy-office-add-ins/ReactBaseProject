import React from "react";

import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";

export default function HideAllExceptSelectedRanges({selectedRange}) {

    const hideAllExceptSelectedRanges = async () => {
        try {
          await Excel.run(async (context) => {
            const sheet2= context.workbook.worksheets.getActiveWorksheet();
            const range2= sheet2.getUsedRange();
            range2.rowHidden= true;
            await context.sync();

            let sepValues = selectedRange.split(",");
            const sheet = context.workbook.worksheets.getActiveWorksheet();
            for (let i = 0; i < sepValues.length; i++) {
              sheet.getRange(sepValues[i]).rowHidden = false;
            }
            await context.sync();
            
           
          });
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <React.Fragment>
    <OkCancelButton  onClick={hideAllExceptSelectedRanges} selectedRange={selectedRange} targetRange="nothing" />
  </React.Fragment>
  )
}
