import React from "react";


export default function Transpose(props) {
  let sourceRng= props.copiedRange;
  let targetRng = props.targetRange;

  const tableToList = async () => {
    try {
      await Excel.run(async (context) => {
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        for (let i = 1; i < rowNo; i++) {
          for (let j = 0; j < colNo - 1; j++) {
            sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 0).values = sourceValues[i][0];
            sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 1).values = sourceValues[0][j + 1];
            sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 2).values = sourceValues[i][j + 1];
          }
        }
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <OkCancelButton onClick={tableToList} selectedRange={copiedRange} targetRange={targetRange} />
    </React.Fragment>
  );
}
