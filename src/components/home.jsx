import { Box, Tab, Tabs } from "@mui/material";

import History from "./history";
import React from "react";
import Search from "./search";
import TabPanel from "./tab-panel";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "85ch",
        margin: "auto",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Search" {...a11yProps(0)} />
          <Tab label="History" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Search />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <History />
      </TabPanel>
    </Box>
  );
};

export default Home;
