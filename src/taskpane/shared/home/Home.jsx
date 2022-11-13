import * as React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import classes from './home.module.css';
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomTab = styled(Tab)`
  color: #000055;
  font-size: 11px;
  min-width: 70px;
  min-height: 30px;
  padding: 1px;
`;



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          style={{ minHeight: "30px" }}
        >
          <CustomTab label="Cell & Range" {...a11yProps(0)} />
          <CustomTab label="Table" {...a11yProps(1)} />
          <CustomTab label="Chart" {...a11yProps(2)} />
          <CustomTab label="Data" {...a11yProps(3)} />
          <CustomTab label="Graph" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} sx={{padding: '0px'}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header" >
          <Typography sx={{color:'black', fontSize:'1rem', fontWeight:'500'}}>Ranges</Typography>
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

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Merge & Unmerge</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </TabPanel>
      <TabPanel value={value} index={1}>
          item two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
