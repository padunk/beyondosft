import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";

import { Box } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { saveSearch } from "../actions/action-creators";
import withMapApi from "./hoc/withMapApi";

const containerStyle = {
  height: "600px",
};

const center = {
  lat: 37.772,
  lng: -122.214,
};

function Maps({
  searchKeywords,
  saveSearch,
  mapWidth = "100%",
  isSmall,
  selectedIndex,
}) {
  const map = React.useRef(null);
  const marker = React.useRef(null);
  const autocomplete = React.useRef(null);

  const onPlaceChanged = () => {
    if (autocomplete.current !== null) {
      marker.current.setVisible(false);
      const place = autocomplete.current.getPlace();
      saveSearch(place);
      if (!place?.geometry && !place?.geometry.location) {
        return;
      }
      if (place.geometry.viewport) {
        map.current.fitBounds(place.geometry.viewport);
      } else {
        map.current.setCenter(place.geometry.location);
        map.current.setZoom(17);
      }
      marker.current.setPosition(place.geometry.location);
      marker.current.setVisible(true);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  React.useEffect(() => {
    if (isSmall && selectedIndex !== null) {
      const place = searchKeywords[selectedIndex];
      if (!place?.geometry && !place?.geometry.location) {
        return;
      }
      if (place.geometry.viewport) {
        map.current.fitBounds(place.geometry.viewport);
      } else {
        map.current.setCenter(place.geometry.location);
        map.current.setZoom(17);
      }
      marker.current.setPosition(place.geometry.location);
      marker.current.setVisible(true);
    }
  }, [selectedIndex]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleMap
        id="my-map"
        mapContainerStyle={{
          ...containerStyle,
          width: mapWidth,
        }}
        center={center}
        zoom={9}
        onLoad={(mapInstance) => (map.current = mapInstance)}
      >
        {!isSmall && (
          <Autocomplete
            onLoad={(autocompleteInstance) =>
              (autocomplete.current = autocompleteInstance)
            }
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter Location"
              style={{
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px",
                marginTop: "1rem",
              }}
            />
          </Autocomplete>
        )}
        <Marker
          position={center}
          onLoad={(markerInstance) => (marker.current = markerInstance)}
        />
      </GoogleMap>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  searchKeywords: state.searchKeywords,
});

const mapDispatchToProps = {
  saveSearch,
};

const ConnectMaps = connect(
  mapStateToProps,
  mapDispatchToProps
)(withMapApi(Maps));

export default React.memo(ConnectMaps);
