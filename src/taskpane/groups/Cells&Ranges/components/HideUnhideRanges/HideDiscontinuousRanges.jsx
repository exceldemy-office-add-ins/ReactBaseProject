import React from "react";

import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";

export default function HideDiscontinuousRanges({ selection }) {
  const hideDiscontinuousRanges = async () => {
    try {
      await Excel.run(async (context) => {
        let sepValues = selection.split(",");

        const sheet = context.workbook.worksheets.getActiveWorksheet();
        for (let i = 0; i < sepValues.length; i++) {
          sheet.getRange(sepValues[i]).rowHidden = true;
 
        }
        await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
     <OkCancelButton onClick={hideDiscontinuousRanges}/>
    </React.Fragment>
  );
}
