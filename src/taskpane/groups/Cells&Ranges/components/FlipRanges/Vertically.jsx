import React from "react";

import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";

const Vertically = (props) => {
  let rng = props.selectedRange;
  const verticalFlip = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(rng);
        range.load(["values", "columnCount", "rowCount"]);
        await context.sync();
        const rowNo = range.rowCount;
        const colNo = range.columnCount;
        //flipping left half of the columns
        for (let i = 0; i < parseInt(colNo / 2); i++) {
          for (let j = 0; j < rowNo; j++) {
            range.getCell(j, i).values = `${range.values[j][colNo - (i + 1)]}`;
          }
        }
        //flipping right half of the columns
        for (let i = 0; i < parseInt(colNo / 2); i++) {
          for (let j = 0; j < rowNo; j++) {
            range.getCell(j, colNo - (i + 1)).values = `${range.values[j][i]}`;
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <OkCancelButton onClick={verticalFlip} selectedRange={props.selectedRange}/>
    </div>
  );
};

export default Vertically;
