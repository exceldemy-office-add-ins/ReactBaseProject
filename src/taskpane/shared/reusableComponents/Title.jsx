import React from "react";

import { Clear, QuestionMark } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Paper, Tooltip } from "@mui/material";

export default function Title(props) {
  return (
    <React.Fragment>
      <Paper elevation={1}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: '5px 10px 5px 10px',
          borderRadius: "5px",
          border: "1px solid gray",
          backgroundColor: 'aliceblue'
        }}
      >
        <span style={{fontSize: '.9rem', fontWeight: '500'}}>{props.title}</span>
        <div>
          {props.articleLink && (
            <Tooltip title="Read the Related Article" placement="top-start">
              <a href={props.articleLink}>
                <QuestionMark sx={{ color: "black",  fontSize: '1rem' }} />
              </a>
            </Tooltip>
          )}

          <Tooltip title="Go to Home" placement="top-start">
            <Link to="/">
              <Clear sx={{ color: "black", fontSize: '1rem' }} />
            </Link>
          </Tooltip>
        </div>
      </div>
          </Paper>
    </React.Fragment>
  );
}
