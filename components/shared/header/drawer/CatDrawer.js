import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import { withStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { catDrawer } from "../../../redux/menu/menuActions";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';

const styles = {
  drawerPaper: {
    width: "100%",
  },
};

const CatDrawer = ({ classes, catttttt }) => {
  const open = useSelector((state) => state.menu.catDrawer);
  const dispatch = useDispatch();
  const closeDrawer = () => {
    dispatch(catDrawer(false));
  };
  const categoryList = catttttt.map((m) => {
    return (
      <Box
        key={m.id}
        sx={{
          background: "#f5f5f5",
          borderRadius: "2px",
          paddingBottom: "5px",
          marginBottom: "15px",
        }}
      >
        <Grid
          container
          spacing={1}
        >
          <Grid item xs={8}>
            <Box sx={{ paddingLeft: "10px" }}>{ m.category }</Box>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Box sx={{ paddingRight: "10px" }}>
              <ArrowRightRoundedIcon />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  });
  return (
    <>
      <Drawer
        elevation={0}
        hideBackdrop
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        { categoryList }
        <Box sx={{background:'#f5f5f5', paddingTop: '10px'}}>
          <Container maxWidth="sm">
            <Grid container spacing={0}>
              <Grid item xs={1}>
                <Box>
                  <ArrowLeftRoundedIcon />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box>
                  <b>MEN</b>
                </Box>
              </Grid>
              <Grid
                item xs={3}
                sx={{textAlign: 'right'}}
                onClick={closeDrawer}
              >
                <Box sx={{paddingRight: '10px'}}>
                  <CloseRoundedIcon />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="sm">
          <br />
          <Box sx={{background:'#f5f5f5', borderRadius:'2px', paddingBottom:'5px', marginBottom: '15px'}}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Box sx={{paddingLeft: '10px'}}>
                  Men
                </Box>
              </Grid>
              <Grid item xs={4} sx={{textAlign: 'right'}}>
                <Box sx={{paddingRight: '10px'}}>
                  <ArrowRightRoundedIcon />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{background:'#f5f5f5', borderRadius:'2px', paddingBottom:'5px', marginBottom: '15px'}}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Box sx={{paddingLeft: '10px'}}>
                  Men
                </Box>
              </Grid>
              <Grid item xs={4} sx={{textAlign: 'right'}}>
                <Box sx={{paddingRight: '10px'}}>
                  <ArrowRightRoundedIcon />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{background:'#f5f5f5', borderRadius:'2px', paddingBottom:'5px', marginBottom: '15px'}}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Box sx={{paddingLeft: '10px'}}>
                  Men
                </Box>
              </Grid>
              <Grid item xs={4} sx={{textAlign: 'right'}}>
                <Box sx={{paddingRight: '10px'}}>
                  <ArrowRightRoundedIcon />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Drawer >
    </>
  );
};

export default withStyles(styles)(CatDrawer);
