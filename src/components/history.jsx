import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import Maps from "./maps";
import PlaceIcon from "@mui/icons-material/Place";
import React from "react";
import { connect } from "react-redux";

function renderListItem(lists, selected, handleClick) {
  return lists.map((list, idx) => {
    if (typeof list === "undefined") {
      return (
        <ListItemButton
          selected={selected === idx}
          key={idx}
          onClick={(event) => handleClick(event, idx)}
        >
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <Typography>No data store.</Typography>
        </ListItemButton>
      );
    }

    if (!list.formatted_address) {
      return (
        <ListItemButton
          selected={selected === idx}
          key={`${idx}-${list.name}`}
          onClick={(event) => handleClick(event, idx)}
        >
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText primary={list.name} />
        </ListItemButton>
      );
    }

    return (
      <ListItemButton
        selected={selected === idx}
        key={`${idx}-${list.name}`}
        onClick={(event) => handleClick(event, idx)}
      >
        <ListItemIcon>
          <PlaceIcon />
        </ListItemIcon>
        <ListItemText primary={list.name} secondary={list.formatted_address} />
      </ListItemButton>
    );
  });
}

const History = ({ searchKeywords }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (_, index) => {
    setSelectedIndex(index);
  };

  if (searchKeywords.length < 1) {
    return <Typography>No history recorded.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: "600px",
          overflowY: "scroll",
        }}
      >
        <List dense>
          {renderListItem(searchKeywords, selectedIndex, handleListItemClick)}
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <Maps mapWidth="360px" isSmall selectedIndex={selectedIndex} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  searchKeywords: state.searchKeywords,
});

export default connect(mapStateToProps)(History);
