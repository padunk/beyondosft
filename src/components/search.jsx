import { Box } from "@mui/material";
import Maps from "./maps";
import React from "react";

const Search = () => {
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "1rem",
      }}
    >
      <Maps />
    </Box>
  );
};

export default Search;
