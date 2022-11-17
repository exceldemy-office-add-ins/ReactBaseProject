import React, { useEffect } from "react";
import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";
import RadioButton from "../../../../shared/reusableComponents/RadioButton";
import RangeInputBox from "../../../../shared/reusableComponents/RangeInputBox";
import Title from "../../../../shared/reusableComponents/Title";


const radioInfo1 = [
  { id: "1", value: "rows", label: "Split to Rows" },
  { id: "2", value: "columns", label: "Split to Columns" },
];

const radioInfo2 = [
  { id: "1", value: " ", label: "Space" },
  { id: "2", value: ",", label: "Comma" },
  { id: "3", value: ";", label: "Semicolon" },
];

export default function SplitRanges() {
  const [copiedRange, setCopiedRange] = React.useState(" ");
  const [targetRange, setTargetRange] = React.useState("");
  const [selection, setSelection] = React.useState("rows");
  const [splitType, setSplitType] = React.useState("");
  const [rowNo, setRowNo] = React.useState("");
  const [colNo, setColNo] = React.useState("");
  const [rowIndex, setRowIndex] = React.useState("");
  const [columnIndex, setColumnIndex] = React.useState("");
  const [data, setData] = React.useState("");
  const [sourceValues, setSourceValues] = React.useState("");
  const [focus, setFocus] = React.useState("source");

  const initialValue = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.load("address");
        await context.sync();
        setData(range.address);
        setCopiedRange(range.address);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sourceRangeHandler = (e) => {
    e.preventDefault();
    setCopiedRange(e.target.value);
  };

  const targetRangeHandler = (e) => {
    e.preventDefault();
    setTargetRange(e.target.value);
  };

  const splitTypeChangeHandler = (e) => {
    setSplitType(e.target.value);
  };

  const selectionChangeHandler = (e) => {
    setSelection(e.target.value);
  };

  var eventResult;

  const dataRangeEvent = async () => {
    try {
      await Excel.run(async (context) => {
        const worksheet = context.workbook.worksheets.getActiveWorksheet();
        eventResult = worksheet.onSelectionChanged.add(dataRangeEventHandler);
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function dataRangeEventHandler(event) {
    await Excel.run(async (context) => {
      setData(event.address);
      await context.sync();
    });
  }

  const getSourceRangeData = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(copiedRange);
        range.load(["address", "rowCount", "columnCount", "values"]);
        await context.sync();
        setSourceValues(range.values);
        setRowNo(range.rowCount);
        setColNo(range.columnCount);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTargetRangeData = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(targetRange);
        range.load(["address", "rowIndex", "columnIndex"]);
        await context.sync();
        setRowIndex(range.rowIndex);
        setColumnIndex(range.columnIndex);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const splitRangesRows = async () => {
    try {
      await Excel.run(async (context) => {
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        for (let i = 0; i < rowNo; i++) {
          for (let j = 0; j < sourceValues[i][0].split(",").length; j++) {
            sheet.getCell(rowIndex + i, columnIndex + j).values = sourceValues[i][0].split(`${splitType}`)[j];
          }
        }
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const splitRangesColumns = async () => {
    try {
      await Excel.run(async (context) => {
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        for (let i = 0; i < rowNo; i++) {
          for (let j = 0; j < sourceValues[i][0].split(",").length; j++) {
            sheet.getCell(rowIndex + j, columnIndex + i).values = sourceValues[i][0].split(`${splitType}`)[j];
          }
        }
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialValue();
    dataRangeEvent();
  }, []);
  useEffect(() => {
    getSourceRangeData();
  }, [copiedRange]);

  useEffect(() => {
    getTargetRangeData();
  }, [targetRange]);

  useEffect(() => {
    if (focus === "source") {
      setCopiedRange(data);
    } else {
      setTargetRange(data);
    }
  }, [data]);

  const sourceFocusChangeHandler = () => {
    setFocus("source");
  };
  const targetFocusChangeHandler = () => {
    setFocus("target");
  };

  return (
    <div>
      <React.Fragment>
        <Title
          title="Split Ranges"
          articleLink="https://www.exceldemy.com/excel-transpose-rows-to-columns-based-on-criteria/"
        />

        <RangeInputBox
          label="Input Range"
          value={copiedRange}
          color="success"
          onChange={sourceRangeHandler}
          onClick={sourceFocusChangeHandler}
        />
        <RadioButton title="Category" defaultValue="rows" formData={radioInfo1} onChange={selectionChangeHandler} />
        <RadioButton title="Split Type" defaultValue=" " formData={radioInfo2} onChange={splitTypeChangeHandler} />
      

        <RangeInputBox
          label="Target Range"
          value={targetRange}
          color="error"
          onChange={targetRangeHandler}
          onClick={targetFocusChangeHandler}
        />

        {selection === 'rows' && <OkCancelButton onClick={splitRangesRows} />}
        {selection === 'columns' && <OkCancelButton onClick={splitRangesColumns} />}
      </React.Fragment>
    </div>
  );
}
