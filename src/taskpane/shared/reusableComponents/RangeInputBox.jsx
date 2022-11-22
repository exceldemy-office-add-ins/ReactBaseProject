import { Alert, TextField } from "@mui/material";
import React from "react";

export default function RangeInputBox(props) {
  return (
    <React.Fragment>
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
        <TextField
          label={props.label}
          focused
          size="small"
          margin="none"
          color={props.color}
          sx={{
            alignSelf: "center",
            input: { height: "1rem" },
            div: {
              fontSize: ".85rem",
              color: "black",
              minWidth: '275px'
            },
            marginBottom: "5px",
            marginTop: "5px",
            legend:{width:'95px'}
          }}
          type="text"
          value={props.value}
          onChange={props.onChange}
          onClick={props.onClick}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
      </div>
      <div className="centered">
        {props.selectedRange === "" && (
          <Alert
            severity="error"
            style={{ marginBottom: "5px", fontWeight: "600" }}
            sx={{ "& .MuiAlert-icon": { padding: "0px" }, "& .MuiAlert-message": { padding: "0px" } }}
          >
            Please! Select a Range.
          </Alert>
        )}
      </div>
    </React.Fragment>
  );
}
