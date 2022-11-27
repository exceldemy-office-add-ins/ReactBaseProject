import React from "react";

import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";

export default function HideSelectedRanges({selectedRange}) {
  let rng = selectedRange;
  const hideSelectedRanges = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(rng);
        range.rowHidden = true;
        await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
     <OkCancelButton onClick={hideSelectedRanges} selectedRange={selectedRange}  targetRange="nothing"/>
    </React.Fragment>
  );
}
