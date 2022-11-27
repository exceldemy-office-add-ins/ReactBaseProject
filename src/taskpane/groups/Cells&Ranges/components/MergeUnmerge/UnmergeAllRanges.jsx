import React from "react";
import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";

export default function UnmergeAllRanges({selectedRange}) {
  const unmergeAll = async () => {
    try {
      await Excel.run(async (context) => {
        const sheet2 = context.workbook.worksheets.getActiveWorksheet();
        const range2 = sheet2.getUsedRange();
        const mergeRange = range2.getMergedAreasOrNullObject();
        mergeRange.load(["address", "cellCount"]);
        await context.sync();

        let sepValues = mergeRange.address.split(",");
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        for (let i = 0; i < sepValues.length; i++) {
          sheet.getRange(sepValues[i]).unmerge(true);

        }
        await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
      <OkCancelButton onClick={unmergeAll}  targetRange="nothing" />
    </React.Fragment>
  );
}
