import { TextField } from '@mui/material'
import React from 'react'

export default function RangeInputBox(props) {
  return (
 
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
        marginBottom: '10px'
      }}
      type="text"
      value={props.value}
      onChange={props.onChange}
      onClick={props.onClick}
      onFocus= {props.onFocus}
      onBlur= {props.onBlur}
    />

  )
}
