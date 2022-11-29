import { Checkbox, FormControlLabel, FormGroup, Paper } from "@mui/material";
import React, { useEffect } from "react";
import CustomCheckbox from "../../../../shared/reusableComponents/CustomCheckbox";
import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";
import RangeInputBox from "../../../../shared/reusableComponents/RangeInputBox";
import Title from "../../../../shared/reusableComponents/Title";

const formData = [
  {id: '1', label: 'First Name', value: 'firstName'},
  {id: '2', label: 'Middle Name', value: 'middleName'},
  {id: '3', label: 'Last Name', value: 'lastName'},
]


export default function SplitNames({isOfficeInitialized}) {
  const [copiedRange, setCopiedRange] = React.useState(" ");
  const [targetRange, setTargetRange] = React.useState(" ");
  const [names, setNames] = React.useState([]);
  const [rowNo, setRowNo] = React.useState("");
  const [colNo, setColNo] = React.useState("");
  const [rowIndex, setRowIndex] = React.useState("");
  const [columnIndex, setColumnIndex] = React.useState("");
  const [data, setData] = React.useState(" ");
  const [sourceValues, setSourceValues] = React.useState("");
  const [focus, setFocus] = React.useState("source");
  const [submitted, setSubmitted]=React.useState(false);


  const initialValue = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRanges();
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
        if(copiedRange.length >= 2){
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(copiedRange);
        range.load(["rowCount", "columnCount", "values"]);
        await context.sync();
        setSourceValues(range.values);
        setRowNo(range.rowCount);
        setColNo(range.columnCount);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTargetRangeData = async () => {
    try {
      await Excel.run(async (context) => {
        if(targetRange.length >= 2){
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(targetRange);
        range.load(["rowIndex", "columnIndex"]);
        await context.sync();
        setRowIndex(range.rowIndex);
        setColumnIndex(range.columnIndex);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const splitRangesRows = async () => {
    try {
      await Excel.run(async (context) => {
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        if(names.length === 0){
          setSubmitted(true);
        }else{
          setSubmitted(false);
        }
        if(names.includes('firstName')){
          for (let i = 0; i < rowNo; i++) {
            for (let j = 0; j<names.length; j++) {
              sheet.getCell(rowIndex + i, columnIndex + 0).values = sourceValues[i][0].split(" ")[0];
            }
          }
        }

        if(names.includes('lastName')){
          for (let i = 0; i < rowNo; i++) {
            console.log(sourceValues[i][0].split(" ").length)
              if(sourceValues[i][0].split(" ").length <3){
                sheet.getCell(rowIndex + i, columnIndex + 2).values = sourceValues[i][0].split(" ")[1];
              }else{
                sheet.getCell(rowIndex + i, columnIndex + 2).values = sourceValues[i][0].split(" ")[2];
              }
          }
        }

        if(names.includes('middleName')){
          for (let i = 0; i < rowNo; i++) {
            console.log(sourceValues[i][0].split(" ").length)
              if(sourceValues[i][0].split(" ").length <3){
                sheet.getCell(rowIndex + i, columnIndex + 1).values = '';
              }else{
                sheet.getCell(rowIndex + i, columnIndex + 1).values = sourceValues[i][0].split(" ")[1];
              }
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
    return () => {
      setCopiedRange(""); // This worked for me
    };
  }, [isOfficeInitialized]);
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

  const namesChangeHandler =(e)=>{
    if(e.target.checked){
      setNames([...names, e.target.value]);
    }else{
      setNames(names.filter(name=>name !==e.target.value));
    }
  }

  return (
    <div>
      <React.Fragment>
        <Title
          title="Split Names"
          articleLink="https://www.exceldemy.com/excel-transpose-rows-to-columns-based-on-criteria/"
        />

        <RangeInputBox
          label="Input Range"
          value={copiedRange}
          color="success"
          onChange={sourceRangeHandler}
          onClick={sourceFocusChangeHandler}
          selectedRange={copiedRange}
        />
   <CustomCheckbox fromData={formData} onClick = {namesChangeHandler} options= {names} submitted={submitted} />

        <RangeInputBox
          label="Target Range"
          value={targetRange}
          color="primary"
          onChange={targetRangeHandler}
          onClick={targetFocusChangeHandler}
          selectedRange={targetRange}
        />

        <OkCancelButton onClick={splitRangesRows} selectedRange={copiedRange}  targetRange={targetRange} />
      </React.Fragment>
  
    </div>
  );
}
