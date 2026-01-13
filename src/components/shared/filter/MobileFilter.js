import React from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@emotion/react";

import FilterOptions from "./FilterOptions";

const MobileFilter = ({ data, drawer, setMobileFilter }) => {
  // hooks
  const theme = useTheme();
  const deviceWidth = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      anchor="right"
      open={drawer}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box
        className="filter-container"
        sx={{ width: { xs: "100vw", sm: "500px" }, padding: "10px" }}
      >
        <Grid container spacing={1}>
          <Grid item xs={10} className="pt-4 text-center">
            Fiter and Sorts
          </Grid>
          <Grid item xs={2} className="text-right pt-3">
            <IconButton
              aria-label="delete"
              onClick={() => setMobileFilter(false)}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <FilterOptions data={data} type="mobile" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default MobileFilter;
