import { TextField } from '@mui/material'
import React from 'react'

export default function RangeInputBox(props) {
  return (
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
          fontSize: "15px",
          color: "black",
        },
      }}
      type="text"
      value={props.value}
      onChange={props.onChange}
      onClick={props.onClick}
    />
  </div>
  )
}