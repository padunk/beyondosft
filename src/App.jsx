import { Box, Typography } from "@mui/material";

import Home from "./components/home";

function App() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBlock: "2rem",
        }}
      >
        <Typography variant="h2">Google Maps Autocomplete Search</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Home />
      </Box>
    </>
  );
}

export default App;
