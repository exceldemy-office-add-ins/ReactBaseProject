import { Button, Typography } from "@mui/material";
import React from "react";
import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";

export default function MergeSelectedRanges({ selection }) {
  const mergeRanges = async () => {
    try {
      await Excel.run(async (context) => {
        let sepValues = selection.split(",");
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        for (let i = 0; i < sepValues.length; i++) {
          sheet.getRange(sepValues[i]).merge(true);
          sheet.getRange(sepValues[i]).format.horizontalAlignment = "Center";
        }
        await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
      <OkCancelButton onClick={mergeRanges} selectedRange={selection} targetRange="nothing"/>
      <Typography variant="body2" style={{ padding: "10px" }}>
        <span style={{ fontWeight: "600" }}>Info:</span> Merging cells only keeps the upper-left value and discards
        other values.
      </Typography>
    </React.Fragment>
  );
}
