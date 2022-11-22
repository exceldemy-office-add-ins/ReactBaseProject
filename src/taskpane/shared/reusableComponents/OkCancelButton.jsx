import React from "react";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function OkCancelButton(props) {
  return (
    <React.Fragment>
      <div className="centered">
        <Button
          sx={{
            marginRight: "10px",
            "& .MuiButtonBase-root": { padding: "0px 5px", minWidth: "40px", lineHeight: "1rem" },
          }}
          variant="outlined"
          size="small"
          color="success"
          onClick={props.onClick}
          disabled= {props.selectedRange === "" ? true : false}
        >
          OK
        </Button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            sx={{ "& .MuiButtonBase-root": { padding: "0px 5px", minWidth: "40px", lineHeight: "1rem" } }}
            variant="outlined"
            size="small"
            color="error"
          >
            Cancel
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
}
