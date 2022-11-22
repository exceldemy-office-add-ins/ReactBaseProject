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

const radioInfo1 = [
  { id: "1", value: "rows", label: "Split to Rows" },
  { id: "2", value: "columns", label: "Split to Columns" },
];

export default function SplitRanges() {
  const [copiedRange, setCopiedRange] = React.useState("");
  const [targetRange, setTargetRange] = React.useState(" ");
  const [selection, setSelection] = React.useState("rows");
  const [splitType, setSplitType] = React.useState("");
  const [rowNo, setRowNo] = React.useState("");
  const [colNo, setColNo] = React.useState("");
  const [rowIndex, setRowIndex] = React.useState("");
  const [columnIndex, setColumnIndex] = React.useState("");
  const [data, setData] = React.useState("");
  const [sourceValues, setSourceValues] = React.useState("");
  const [focus, setFocus] = React.useState("source");
  const [inputIsShown, setInputIsShown] = React.useState(false);

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

  const splitTypeChangeHandler = (e) => {
    setSplitType(e.target.value);
    setInputIsShown(false);
  };

  const splitTypeChangeHandlerOther = (e) => {
    setSplitType(e.target.value);
    setInputIsShown(true);
  };
  const splitTypeChangeHandlerFromInput = (e) => {
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
        range.load(["rowCount", "columnCount", "values"]);
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
        range.load(["rowIndex", "columnIndex"]);
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
        console.log(splitType);
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        for (let i = 0; i < rowNo; i++) {
          for (let j = 0; j < sourceValues[i][0].split(`${splitType}`).length; j++) {
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
          for (let j = 0; j < sourceValues[i][0].split(`${splitType}`).length; j++) {
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
          selectedRange={copiedRange}
          
        />
        <RadioButton title="Category" defaultValue="rows" formData={radioInfo1} onChange={selectionChangeHandler} />

        <Paper elevation={1} sx={{ marginBottom: "10px", marginTop: "10px", padding: "5px" }}>
        <span style={{fontSize: '.9rem', fontWeight: '500'}}>Split by</span>
          <FormControl
            sx={{
              paddingLeft: "10px",
              display: "flex",
              "& .MuiButtonBase-root": { padding: "5px", color: "black" },
              "& .MuiButtonBase-root-MuiRadio-root": { color: "black" },
              "& .MuiFormControl-root": { alignItems: "start" },
            }}
          >
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group2" defaultValue=" ">
              <FormControlLabel
                value=" "
                control={<Radio />}
                label="Space"
                onChange={splitTypeChangeHandler}
                style={{ height: 25 }}
                sx={{ "& .MuiTypography-root": { fontSize: ".8rem", fontWeight: "500" } }}
              />

              <FormControlLabel
                value=","
                control={<Radio />}
                label="Comma"
                onChange={splitTypeChangeHandler}
                style={{ height: 25 }}
                sx={{ "& .MuiTypography-root": { fontSize: ".8rem", fontWeight: "500" } }}
              />

              <FormControlLabel
                value=";"
                control={<Radio />}
                label="Semicolon"
                onChange={splitTypeChangeHandler}
                style={{ height: 25 }}
                sx={{ "& .MuiTypography-root": { fontSize: ".8rem", fontWeight: "500" } }}
              />

              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                onChange={splitTypeChangeHandlerOther}
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
              color="success"
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
              onChange={splitTypeChangeHandlerFromInput}
            />
          )}
        </Paper>

        <RangeInputBox
          label="Target Range"
          value={targetRange}
          color="primary"
          onChange={targetRangeHandler}
          onClick={targetFocusChangeHandler}
          selectedRange= {targetRange}
        />

        {selection === "rows" && <OkCancelButton onClick={splitRangesRows} selectedRange={copiedRange} />}
        {selection === "columns" && <OkCancelButton onClick={splitRangesColumns}  selectedRange={copiedRange} />}
      </React.Fragment>
    </div>
  );
}
