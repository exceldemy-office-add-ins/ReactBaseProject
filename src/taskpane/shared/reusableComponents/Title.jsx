import { Typography } from "@mui/material";
import React from "react";

export default function Title(props) {
  return (
    <div>
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ marginBottom: "20px", backgroundColor: "rgb(189,215,238)", color: "black" }}
        align="center"
        border="2px dotted white"
      >
        {props.title}
      </Typography>
    </div>
  );
}
