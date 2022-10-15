import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Ifatca from "views/Ifatca";
import PatcaGuests from "views/PatcaGuests";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Navigation = () => {
  const [value, setValue] = useState(1);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Scan IFATCA Guests" />
          <Tab label="Scan PATCA Guests" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Ifatca />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PatcaGuests />
      </TabPanel>
    </>
  );
};

export default Navigation;
