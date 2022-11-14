import React from "react";

import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";

export default function HideSelectedRanges(props) {
  let rng = props.selection;
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
     <OkCancelButton onClick={hideSelectedRanges} />
    </React.Fragment>
  );
}
