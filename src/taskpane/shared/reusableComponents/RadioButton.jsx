import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Paper } from "@mui/material";
export default function RadioButton(props) {
  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ marginBottom: "10px", marginTop: "10px" }}>
        <FormControl  sx={{
          display: "flex",
          alignItems: "center",
          "& .MuiButtonBase-root": { padding: "5px", color: "black" },
          "&. MuiButtonBase-root-MuiRadio-root": { color: "black" },
        }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group2"
            defaultValue={props.defaultValue}
          >
            {props.formData.map(data=>(

            <FormControlLabel key={data.id}
              value={data.value}
              control={<Radio />}
              label={data.label}
              onChange={props.onChange}
              style={{ height: 32, fontSize: 12 }}
            />
            ))}

          </RadioGroup>
        </FormControl>
      </Paper>
    </React.Fragment>
  );
}
