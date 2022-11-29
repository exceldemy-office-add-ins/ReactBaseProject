import React, { useCallback, useEffect } from "react";
import OkCancelButton from "../../../shared/reusableComponents/okCancelButton";
import RadioButton from "../../../shared/reusableComponents/RadioButton";
import RangeInputBox from "../../../shared/reusableComponents/RangeInputBox";
import Title from "../../../shared/reusableComponents/Title";

const radioInfo = [
  { id: "1", value: "tableToList", label: "Cross Table To List" },
  { id: "2", value: "listToTable", label: "List to Cross Table" },
];

export default function TransposeRanges({isOfficeInitialized}) {
  const [copiedRange, setCopiedRange] = React.useState(" ");
  const [targetRange, setTargetRange] = React.useState(" ");
  const [selection, setSelection] = React.useState("tableToList");
  const [rowNo, setRowNo] = React.useState("");
  const [colNo, setColNo] = React.useState("");
  const [rowIndex, setRowIndex] = React.useState("");
  const [columnIndex, setColumnIndex] = React.useState("");
  const [data, setData] = React.useState(" ");
  const [sourceValues, setSourceValues] = React.useState("");
  const [focus, setFocus] = React.useState("source");

  const initialValue = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRanges();
        range.load("address");
        await context.sync();
        // setData(range.address);
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

  const selectionChangeHandler = useCallback((e) => {
    setSelection(e.target.value);
  },[]);
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
          range.load(["address", "rowCount", "columnCount", "values"]);
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
        range.load(["address", "rowIndex", "columnIndex"]);
        await context.sync();
        setRowIndex(range.rowIndex);
        setColumnIndex(range.columnIndex);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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



  const listToTable = async () => {
    try {
      await Excel.run(async (context) => {
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        // for (let i = 1; i < rowNo; i++) {
        //   for (let j = 0; j < colNo - 1; j++) {
        //     sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 0).values = sourceValues[i][0];
        //     sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 1).values = sourceValues[0][j + 1];
        //     sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 2).values = sourceValues[i][j + 1];
        //   }
        // }
        let unique_1 =[];
        let unique_2= [];
        for(let i=0; i<rowNo; i++){
          if(!unique_1.includes(sourceValues[i][0])){
            unique_1.push(sourceValues[i][0])
          }
          if(!unique_2.includes(sourceValues[i][1])){
            unique_2.push(sourceValues[i][1])
          }
        }

        for(let i=0; i<unique_1.length;i++){
          sheet.getCell(rowIndex+1+i, columnIndex).values= unique_1[i] 
          for(let j=0; j<unique_2.length; j++){
            // console.log(unique_1[i], unique_2[j])
            sheet.getCell(rowIndex, columnIndex+1+j).values = unique_2[j]
            for(let k=0; k<rowNo; k++){
              if(unique_1[i] === sourceValues[k][0] && unique_2[j]===sourceValues[k][1] ){
                    sheet.getCell(rowIndex+1+i, columnIndex+1+j).values = sourceValues[k][2]
              }
            }
          }
        }
        // if(unique_1[0]=== sourceValues[0][0] && unique_2[0] === sourceValues[0][1]){
        //   console.log('matched')
        // }


        // console.log(sourceValues)
        // console.log(unique_1)
        // console.log(unique_2)
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    if(isOfficeInitialized){
    initialValue();
    dataRangeEvent();
  }
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

  return (
    <React.Fragment>
      <Title title="Transpose Dimensions"  />

      <RangeInputBox
        label="Source Range"
        value={copiedRange}
        color="success"
        onChange={sourceRangeHandler}
        onClick={sourceFocusChangeHandler}
        selectedRange={copiedRange}
      />


      <RadioButton title="Transpose Type" defaultValue="tableToList" formData={radioInfo} onChange={selectionChangeHandler} />

      <RangeInputBox
        label="Destination Range"
        value={targetRange}
        color="primary"
        onChange={targetRangeHandler}
        onClick={targetFocusChangeHandler}
        selectedRange= {targetRange}
      />

      {selection === "tableToList" && <OkCancelButton onClick={tableToList} selectedRange={copiedRange} targetRange={targetRange} />}
      {selection === "listToTable" && <OkCancelButton onClick={listToTable} selectedRange={copiedRange} targetRange={targetRange} />}
    </React.Fragment>
  );
}
