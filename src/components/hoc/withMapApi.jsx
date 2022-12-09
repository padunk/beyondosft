import * as React from "react";

import { Box, CircularProgress } from "@mui/material";

import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

const withMapApi = (Component) => {
  return (props) => {
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_API_KEY,
      id: "my-map",
      libraries,
    });

    if (isLoaded) {
      return <Component {...props} />;
    }

    if (loadError) {
      console.error(loadError);
      return <p>Maps can't render. Sorry!</p>;
    }

    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  };
};

export default withMapApi;
