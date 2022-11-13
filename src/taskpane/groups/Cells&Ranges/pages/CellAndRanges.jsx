import React from 'react'
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from '../../../shared/home/home.module.css'
export default function CellAndRanges(props) {
  return (
    <div>
       <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header" >
          <Typography sx={{color:'black', fontSize:'1rem', fontWeight:'500'}}>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding:'2px'}}>
        {props.rangesData.map((data) => (
          <Link to={data.link} style={{ textDecoration: "none"}} key={data.id}>
            <div className={classes.div}>
              <p className={classes.title}>{data.title}</p>
              <p className={classes.description}>{data.description}</p>
            </div>
          </Link>
        ))}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
