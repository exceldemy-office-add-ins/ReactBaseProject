import React, { useEffect, useState } from "react";

import UnhideAll from "../components/HideUnhideRanges/UnhideAll";
import RangeInputBox from "../../../shared/reusableComponents/RangeInputBox";
import UnhideSelectedRanges from "../components/HideUnhideRanges/UnhideSelectedRanges";
import Title from "../../../shared/reusableComponents/Title";
import RadioButton from "../../../shared/reusableComponents/RadioButton";

const radioInfo = [
  { id: "1", value: "unhideSelectedRanges", label: "Unhide from Selection" },
  { id: "2", value: "unhideAll", label: "Unhide All" },
];

export default function HideUnhideRanges() {
  const [ranges, setRanges] = React.useState("");
  const [selection, setSelection] = React.useState("unhideSelectedRanges");
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
        const range = context.workbook.getSelectedRange();
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
    initialValue();
    copiedRangeEvent();
  }, []);

  return (
    <React.Fragment>
      <Title title="Unhide Ranges" />

      <RangeInputBox label="Selected Range" color="success" value={ranges} onChange={inputChangeHandler} selectedRange={ranges}/>

      <RadioButton defaultValue="unhideSelectedRanges" formData={radioInfo} onChange={selectionChangeHandler} />
      {selection === "unhideSelectedRanges" && <UnhideSelectedRanges selectedRange={ranges} />}
      {selection === "unhideAll" && <UnhideAll selectedRange={ranges} />}
    </React.Fragment>
  );
}
