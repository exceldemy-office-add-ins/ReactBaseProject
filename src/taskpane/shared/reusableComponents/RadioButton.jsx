import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Paper } from "@mui/material";
export default function RadioButton(props) {
  return (
    <React.Fragment>
      <Paper elevation={1} sx={{ marginBottom: "10px", marginTop: "10px", padding:'5px'}}>
      <span style={{fontSize: '.9rem', fontWeight: '500'}}>{props.title}</span>
        <FormControl  sx={{
          paddingLeft:'10px',
          display: "flex",
          "& .MuiButtonBase-root": { padding: "5px", color: "black" },
          "& .MuiButtonBase-root-MuiRadio-root": { color: "black" },
          "& .MuiFormControl-root":{alignItems: 'start'}
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
              style={{ height: 25 }}
              sx={{'& .MuiTypography-root': {fontSize: ".8rem", fontWeight: '500'}}}
            />
            ))}

          </RadioGroup>
        </FormControl>
      </Paper>
    </React.Fragment>
  );
}
