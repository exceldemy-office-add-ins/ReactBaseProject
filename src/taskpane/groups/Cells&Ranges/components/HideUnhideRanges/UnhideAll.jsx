import React from "react";

import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";

export default function UnhideAll({selectedRange}) {
  const unhideAll = async () => {
    try {
      await Excel.run(async (context) => {
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        let range = sheet.getUsedRange();
        await context.sync();
        range.rowHidden = false;
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
     <OkCancelButton onClick={unhideAll} selectedRange={selectedRange}  />
    </React.Fragment>
  );
}
