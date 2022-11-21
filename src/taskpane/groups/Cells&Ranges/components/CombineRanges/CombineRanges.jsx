import React, { useEffect } from "react";
import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";
import RadioButton from "../../../../shared/reusableComponents/RadioButton";
import RangeInputBox from "../../../../shared/reusableComponents/RangeInputBox";
import Title from "../../../../shared/reusableComponents/Title";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Paper, TextField } from "@mui/material";
import HorizontalRadioButton from "../../../../shared/reusableComponents/HorizontalRadioButton";
const radioInfo1 = [
  { id: "1", value: "rows", label: "Combine rows" },
  { id: "2", value: "columns", label: "Combine columns" },
  { id: "3", value: "singleCell", label: "Combine into single cell" },
];

const radioInfo2 = [
  { id: "1", value: "left", label: "Left Cell" },
  { id: "2", value: "right", label: "Right Cell" },
];

const radioInfo3 = [
  { id: "1", value: "top", label: "Top Cell" },
  { id: "2", value: "bottom", label: "Bottom Cell" },
];

const radioInfo4 = [
  { id: "1", value: "keep", label: "Keep content of combined cells" },
  { id: "2", value: "delete", label: "Delete content of combined cells" },
];

export default function CombineRanges() {
  const [copiedRange, setCopiedRange] = React.useState(" ");
  const [selection, setSelection] = React.useState("rows");
  const [separator, setSeparatorType] = React.useState(" ");
  const [rowNo, setRowNo] = React.useState("");
  const [colNo, setColNo] = React.useState("");
  const [rowIndex, setRowIndex] = React.useState("");
  const [columnIndex, setColumnIndex] = React.useState("");
  const [data, setData] = React.useState("");
  const [sourceValues, setSourceValues] = React.useState("");
  const [inputIsShown, setInputIsShown] = React.useState(false);
  const [side, setSide] = React.useState("left");
  const [topBottom, setTopBottom] = React.useState("top");
  const [options, setOptions] = React.useState("keep");

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

  const separatorChangeHandler = (e) => {
    setSeparatorType(e.target.value);
    setInputIsShown(false);
  };

  const separatorChangeHandlerOther = (e) => {
    setSeparatorType(e.target.value);
    setInputIsShown(true);
  };
  const separatorChangeHandlerFromInput = (e) => {
    setSeparatorType(e.target.value);
  };

  const selectionChangeHandler = (e) => {
    setSelection(e.target.value);
  };

  const sideChangeHandler = (e) => {
    setSide(e.target.value);
  };

  const topBottomChangeHandler = (e) => {
    setTopBottom(e.target.value);
  };

  const optionsChangeHandler = (e) => {
    setOptions(e.target.value);
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
        range.load(["rowCount", "columnCount", "values", "rowIndex", "columnIndex"]);
        await context.sync();
        setSourceValues(range.values);
        setRowNo(range.rowCount);
        setColNo(range.columnCount);
        setRowIndex(range.rowIndex);
        setColumnIndex(range.columnIndex);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const combineRangesRows = async () => {
    try {
      await Excel.run(async (context) => {
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        if(options === 'delete'){
          sheet.getRange(copiedRange).clear();
        }
        await context.sync();
        for (let i = 0; i < rowNo; i++) {
          if (side === "left") {
            sheet.getCell(rowIndex + i, columnIndex).values = sourceValues[i].join(`${separator}`);
            sheet.getCell(rowIndex + i, columnIndex).format.autofitRows();
            sheet.getCell(rowIndex + i, columnIndex).format.autofitColumns();
          } else {
            sheet.getCell(rowIndex + i, columnIndex + colNo - 1).values = sourceValues[i].join(`${separator}`);
            sheet.getCell(rowIndex + i, columnIndex + colNo - 1).format.autofitRows();
            sheet.getCell(rowIndex + i, columnIndex + colNo - 1).format.autofitColumns();
          }
        }
     
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const combineRangesColumns = async () => {
    try {
      await Excel.run(async (context) => {
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        if(options === 'delete'){
          sheet.getRange(copiedRange).clear();
        }
        for (let i = 0; i < colNo; i++) {
          let concatColValue = "";
          for (let j = 0; j < rowNo; j++) {
            concatColValue = concatColValue.concat(sourceValues[j][i]);
          }
          if (topBottom === "top") {
            sheet.getCell(rowIndex, columnIndex + i).values = concatColValue;
            sheet.getCell(rowIndex, columnIndex + i).format.autofitRows();
            sheet.getCell(rowIndex, columnIndex + i).format.autofitColumns();
          } else {
            sheet.getCell(rowIndex + rowNo - 1, columnIndex + i).values = concatColValue;
            sheet.getCell(rowIndex + rowNo - 1, columnIndex + i).format.autofitRows();
            sheet.getCell(rowIndex + rowNo - 1, columnIndex + i).format.autofitColumns();
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
    setCopiedRange(data);
  }, [data]);

  return (
    <React.Fragment>
      <Title title="Combine Ranges" />

      <RangeInputBox label="Source Range" value={copiedRange} color="success" onChange={sourceRangeHandler} />
      <RadioButton
        title="To combine selected cells according to following options:"
        defaultValue="rows"
        formData={radioInfo1}
        onChange={selectionChangeHandler}
      />

      <Paper elevation={1} sx={{ marginBottom: "10px", marginTop: "10px", padding: "5px" }}>
        <span style={{ fontSize: ".9rem", fontWeight: "500" }}>Specify a separator:</span>
        <FormControl
          sx={{
            paddingLeft: "10px",
            display: "flex",
            "& .MuiButtonBase-root": { padding: "5px", color: "black" },
            "& .MuiButtonBase-root-MuiRadio-root": { color: "black" },
            "& .MuiFormControl-root": { alignItems: "start" },
          }}
        >
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group2" defaultValue=" " row>
            <FormControlLabel
              value=" "
              control={<Radio />}
              label="Space"
              onChange={separatorChangeHandler}
              style={{ height: 25 }}
              sx={{ "& .MuiTypography-root": { fontSize: ".8rem", fontWeight: "500" } }}
            />

            <FormControlLabel
              value=""
              control={<Radio />}
              label="Nothing"
              onChange={separatorChangeHandler}
              style={{ height: 25 }}
              sx={{ "& .MuiTypography-root": { fontSize: ".8rem", fontWeight: "500" } }}
            />

            <FormControlLabel
              value=";"
              control={<Radio />}
              label="Semicolon"
              onChange={separatorChangeHandler}
              style={{ height: 25 }}
              sx={{ "& .MuiTypography-root": { fontSize: ".8rem", fontWeight: "500" } }}
            />

            <FormControlLabel
              value="Other separator"
              control={<Radio />}
              label="Other"
              onChange={separatorChangeHandlerOther}
              style={{ height: 25 }}
              sx={{ "& .MuiTypography-root": { fontSize: ".8rem", fontWeight: "500" } }}
            />
          </RadioGroup>
        </FormControl>

        {inputIsShown && (
          <TextField
            label="Other"
            focused
            size="small"
            margin="none"
            color="secondary"
            sx={{
              alignSelf: "center",
              input: { height: "15px", padding: "5px 8px" },
              div: {
                fontSize: "12px",
                color: "black",
              },
              marginBottom: "5px",
              marginTop: "5px",
            }}
            type="text"
            onChange={separatorChangeHandlerFromInput}
          />
        )}
      </Paper>

      {selection === "rows" && (
        <HorizontalRadioButton
          title="Place the results to:"
          defaultValue="left"
          formData={radioInfo2}
          onChange={sideChangeHandler}
        />
      )}

      {selection === "columns" && (
        <HorizontalRadioButton
          title="Place the results to:"
          defaultValue="top"
          formData={radioInfo3}
          onChange={topBottomChangeHandler}
        />
      )}

      <RadioButton title="Options" defaultValue ="keep" formData={radioInfo4} onChange= {optionsChangeHandler} />

      {selection === "rows" && <OkCancelButton onClick={combineRangesRows} />}
      {selection === "columns" && <OkCancelButton onClick={combineRangesColumns} />}

    </React.Fragment>
  );
}
