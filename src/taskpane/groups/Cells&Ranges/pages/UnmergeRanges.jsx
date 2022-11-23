import React, { useEffect, useState } from "react";

import RangeInputBox from "../../../shared/reusableComponents/RangeInputBox";
import UnmergeSelectedRanges from "../components/MergeUnmerge/UnmergeSelectedRanges";
import UnmergeAllRanges from "../components/MergeUnmerge/UnmergeAllRanges";

import Title from "../../../shared/reusableComponents/Title";
import RadioButton from "../../../shared/reusableComponents/RadioButton";

const radioInfo = [
  { id: "1", value: "unmergeSelection", label: "Unmerge Ranges from Selection" },
  { id: "2", value: "unmergeAll", label: "Unmerge All" },
];

export default function UnmergeRanges({isOfficeInitialized}) {
  const [ranges, setRanges] = React.useState(" ");
  const [selection, setSelection] = React.useState("unmergeSelection");
  const selectionChangeHandler = (e) => {
    setSelection(e.target.value);
  };
  const inputChangeHandler = (e) => {
    e.preventDefault();
    setRanges(e.target.value);
  };

  const initialValue = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRanges();
        range.load("address");
        await context.sync();
        setRanges(range.address);
        // console.log(range)
      });
    } catch (error) {
      console.log(error);
    }
  };

  const copiedRangeEvent = async () => {
    try {
      await Excel.run(async (context) => {
        const worksheet = context.workbook.worksheets.getActiveWorksheet();
        worksheet.onSelectionChanged.add(copiedRangeEventHandler);
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const copiedRangeEventHandler = (event1) => {
    // console.log(ranges);
    setRanges(event1.address);
  };

  useEffect(() => {
    if(isOfficeInitialized){
    initialValue();
    copiedRangeEvent();
  }
  }, [isOfficeInitialized]);

  return (
    <React.Fragment>
      <Title title=" Unmerge Ranges" />
      {selection === "unmergeSelection" && (
        <RangeInputBox
          label="Selected Range"
          color="success"
          value={ranges}
          onChange={inputChangeHandler}
          selectedRange={ranges}
        />
      )}

      <RadioButton defaultValue="unmergeSelection" formData={radioInfo} onChange={selectionChangeHandler} />

      {selection === "unmergeSelection" && <UnmergeSelectedRanges selectedRange={ranges} />}
      {selection === "unmergeAll" && <UnmergeAllRanges selectedRange={ranges} />}
    </React.Fragment>
  );
}
