import * as React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CellAndRanges from "../../groups/Cells&Ranges/pages/CellAndRanges";

//importing data
import { rangesData, mergeUnmerge } from "../data/rangesData";

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
      <TabPanel value={value} index={0} sx={{ padding: "0px" }}>
        <CellAndRanges rangesData={rangesData} title="Ranges" />
        <CellAndRanges rangesData={mergeUnmerge} title="Merge & Unmerge" />
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
