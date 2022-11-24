import React from "react";
import { Alert, Checkbox, FormControlLabel, FormGroup, Paper } from "@mui/material";
export default function CustomCheckbox(props) {
  return (
    <React.Fragment>
      <Paper elevation={1} sx={{ marginBottom: "10px", marginTop: "10px", padding: "5px" }}>
        <FormGroup>
            {props.fromData.map(data=>(
          <FormControlLabel
            sx={{
              span: { padding: "3px" },
              "& .MuiTypography-root": { fontSize: ".85rem", fontWeight: '500' },
              svg: { width: ".95rem", height: ".95rem", marginLeft: "10px" },
            }}
            control={<Checkbox onClick={props.onClick} value={data.value} />}
            label={data.label}
          />
            ))}
        </FormGroup>
        {props.options.length === 0 && props.submitted && (
          <Alert
            severity="error"
            style={{ marginBottom: "5px", fontWeight: "600" }}
            sx={{ "& .MuiAlert-icon": { padding: "0px" }, "& .MuiAlert-message": { padding: "0px" } }}
          >
            Please! Select at least one option.
          </Alert>
        )}
      </Paper>
    </React.Fragment>
  );
}
