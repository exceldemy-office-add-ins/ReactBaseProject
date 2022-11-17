import React from "react";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";


export default function OkCancelButton(props) {
  return (
    <React.Fragment>

      <div className="centered">
        <Button sx={{paddingRight: '10px', "& .MuiButtonBase-root":{padding:'0px 5px', minWidth: '40px'}}} variant="outlined" size="small" color="success" onClick={props.onClick}>
          OK
        </Button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button  variant="outlined" size="small" color="error">
            Cancel
          </Button>
        </Link>
      </div>
      
    </React.Fragment>
  );
}
