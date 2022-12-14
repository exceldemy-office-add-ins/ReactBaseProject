import React, { useEffect, useState } from "react";

import HideAllExceptSelectedRanges from "../components/HideUnhideRanges/HideAllExceptSelectedRanges";
import HideDiscontinuousRanges from "../components/HideUnhideRanges/HideDiscontinuousRanges";
import HideSelectedRanges from "../components/HideUnhideRanges/HideSelectedRanges";
import RangeInputBox from "../../../shared/reusableComponents/RangeInputBox";
import Title from "../../../shared/reusableComponents/Title";
import RadioButton from "../../../shared/reusableComponents/RadioButton";

const radioInfo = [
  { id: "1", value: "continuousSelection", label: "Single/Multiple Adjacent Range" },
  { id: "2", value: "multipleDiscontinuousSelection", label: "Multiple Non-Adjacent Range" },
  { id: "3", value: "allExceptSelectedRanges", label: "Hide All Except Selected Range" },
];

export default function HideUnhideRanges({isOfficeInitialized}) {
  const [ranges, setRanges] = React.useState(" ");
  const [selection, setSelection] = React.useState("continuousSelection");
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
  return () => {
    setRanges(""); // This worked for me
  };
  }, [isOfficeInitialized]);

  return (
    <React.Fragment>
      <Title title="Hide Ranges" />
      <RangeInputBox label="Selected Range" color="success" value={ranges} onChange={inputChangeHandler} selectedRange={ranges} />

      <RadioButton defaultValue="continuousSelection" formData={radioInfo} onChange={selectionChangeHandler} />

      {selection === "continuousSelection" && <HideSelectedRanges selectedRange={ranges} />}
      {selection === "multipleDiscontinuousSelection" && <HideDiscontinuousRanges selectedRange={ranges} />}
      {selection === "allExceptSelectedRanges" && <HideAllExceptSelectedRanges selectedRange={ranges} />}
    </React.Fragment>
  );
}
