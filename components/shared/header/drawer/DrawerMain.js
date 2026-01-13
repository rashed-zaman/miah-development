import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import { withStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { drawer, catDrawer, subDrawer } from "../../../../redux/menu/menuActions";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button} from "@mui/material";
import Link from "next/link";

const styles = {
  drawerPaper: {
    width: "100%",
  },
};

// const categoryButton = menu

const DrawerMain = ({ classes, menu}) => {
  // ============= hooks ======
  const router = useRouter();
  const dispatch = useDispatch();

  const open = useSelector((state) => state.menu.drawer);
  const openCat = useSelector((state) => state.menu.catDrawer);
  const openSubCat = useSelector((state) => state.menu.subDrawer);
  
  // ============= local ======
  const [rootCatName, setRootCatName] = useState("");
  const [rootSlug, setRootCatSlug] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const [CategorySlug, setCategorySlug] = useState("");
  const [category, setCat] = useState([]);
  const [subCategory, setSubCat] = useState([]);

  // close main drawer
  const closeDrawer = () => {
    dispatch(drawer(false));
  };

  // close category drawer
  const closeCatDrawer = () => {
    dispatch(catDrawer(false));
  };

  // close subcategory drawer
  const closeSubCatDrawer = () => {
    dispatch(subDrawer(false));
  };

  const closeAllDrawer = () => {
    dispatch(drawer(false));
    dispatch(catDrawer(false));
    dispatch(subDrawer(false));
  };

  // load category
  const loadCategory = (category) => {
    setCat(category.category);
    dispatch(catDrawer(true));
    setRootCatName(category.root_category);
    setRootCatSlug(category.slug);
  };

  // load category
  const loadSubCategory = (subcategory) => {
    setSubCat(subcategory.subcategory);
    setCategoryName(subcategory.category);
    dispatch(subDrawer(true));
    setCategorySlug(subcategory.slug);
    console.log(subcategory);
  };

  //change route

  const changeroute = (subcat) => {
    router.push("/" + rootSlug + "/" + CategorySlug + "/" + subcat.slug);
    closeAllDrawer();
  };

  const goToRootCategory = () => {
    router.push("/" + rootSlug);
    closeAllDrawer();
  };

  const goToCategory = () => {
    router.push("/" + rootSlug + "/" + CategorySlug);
    closeAllDrawer();
  };

  //  root category component
  const rootCategoryList = menu.map((rootCategory) => {
    return (
      <Box
        key={rootCategory.id}
        sx={{
          background: "#f5f5f5",
          borderRadius: "2px",
          paddingBottom: "5px",
          marginBottom: "15px",
        }}
      >
        <Grid container spacing={1} onClick={() => loadCategory(rootCategory)}>
          <Grid item xs={8}>
            <Box sx={{ paddingLeft: "10px" }}>{rootCategory.root_category}</Box>
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

  // category component
  const categoryList = category.map((cat) => {
    return (
      <Box
        key={cat.id}
        sx={{
          background: "#f5f5f5",
          borderRadius: "2px",
          paddingBottom: "5px",
          marginBottom: "15px",
        }}
      >
        <Grid container spacing={1} onClick={() => loadSubCategory(cat)}>
          <Grid item xs={8}>
            <Box sx={{ paddingLeft: "10px" }}>{cat.category}</Box>
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

  // sub category component
  const subCategoryList = subCategory.map((subCat) => {
    return (
      <Box
        key={subCat.id}
        sx={{
          background: "#f5f5f5",
          borderRadius: "2px",
          paddingBottom: "5px",
          marginBottom: "15px",
        }}
        onClick={() => changeroute(subCat)}
      >
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Box sx={{ paddingLeft: "10px" }}>{subCat.sub_category}</Box>
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
      {/* root category drawer */}
      <Drawer
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Container maxWidth="sm">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <IconButton aria-label="delete" onClick={closeDrawer}>
                <CloseRoundedIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ textAlign: "right" }}>
                <IconButton>
                  <FavoriteBorderRoundedIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <br />
          {rootCategoryList}
          
          {/* <Box
            sx={{
              background: "#f5f5f5",
              borderRadius: "2px",
              paddingBottom: "5px",
              marginBottom: "15px",
            }}
          >
            <Link href={ "/eid-collection"}>
              <Grid container spacing={1} onClick={closeDrawer}>
                <Grid item xs={8}>
                  <Box sx={{ paddingLeft: "10px" }}>
                    <a>
                      Eid Collection
                    </a>
                  </Box>
                </Grid>
              </Grid> 
            </Link>
          </Box>                           */}

          <Box
            sx={{
              background: "#f5f5f5",
              borderRadius: "2px",
              paddingBottom: "5px",
              marginBottom: "15px",
            }}
          >
            <Link href={ "/exclusive-trendz-product/saleableProduct"}>
              <Grid container spacing={1} onClick={closeDrawer}>
                <Grid item xs={8}>
                  <Box sx={{ paddingLeft: "10px" }}>
                    <a>
                     Sale
                    </a>
                  </Box>
                </Grid>
              </Grid> 
            </Link>
          </Box>                          

        </Container>
        <Container maxWidth="sm">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box sx={{ position: "relative", textAlign: "center" }}>
                <Image
                  src="/img/drawer/drawer-img.jpg"
                  alt="Miah Drawer"
                  width={300}
                  height={300}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL="/img/drawer/drawer-img.jpg"
                />
                <Button>
                  <a href="tel:+8801313767678" className="miahfornt">
                    Client services: +8801313767678
                  </a>
                </Button>
                <Box
                  className="drawer-image-container"
                  sx={{ position: "absolute", top: "50%", width: "100%" }}
                >
                  <p> cloths made from </p>
                  <p> passion to fashion </p>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Drawer>

      {/* category drawer */}
      <Drawer
        elevation={0}
        hideBackdrop
        anchor="right"
        open={openCat}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box sx={{ background: "#f5f5f5", paddingTop: "10px" }}>
          <Container maxWidth="sm">
            <Grid container spacing={0}>
              <Grid item xs={1}>
                <Box onClick={closeCatDrawer}>
                  <ArrowLeftRoundedIcon />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box>
                  <b onClick={closeCatDrawer}>{rootCatName}</b>
                </Box>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{ textAlign: "right" }}
                onClick={closeAllDrawer}
              >
                <Box sx={{ paddingRight: "10px" }}>
                  <CloseRoundedIcon onClick={closeAllDrawer} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="sm" className="pt-4">
          {/* <Box
            sx={{
              background: "#f5f5f5",
              borderRadius: "2px",
              paddingBottom: "5px",
              marginTop: "30px",
              marginBottom: "15px",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Box onClick={goToRootCategory} sx={{ paddingLeft: "10px" }}>
                  All {rootCatName}
                </Box>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "right" }}>
                <Box sx={{ paddingRight: "10px" }}>
                  <ArrowRightRoundedIcon />
                </Box>
              </Grid>
            </Grid>
          </Box> */}
          {categoryList}
        </Container>
      </Drawer>

      {/* sub category drawer */}
      <Drawer
        elevation={0}
        hideBackdrop
        anchor="right"
        open={openSubCat}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box sx={{ background: "#f5f5f5", paddingTop: "10px" }}>
          <Container maxWidth="sm">
            <Grid container spacing={0}>
              <Grid item xs={1}>
                <Box onClick={closeSubCatDrawer}>
                  <ArrowLeftRoundedIcon />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box>
                  <b onClick={closeSubCatDrawer}>{CategoryName}</b>
                </Box>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{ textAlign: "right" }}
                onClick={closeAllDrawer}
              >
                <Box sx={{ paddingRight: "10px" }}>
                  <CloseRoundedIcon />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="sm" className="pt-4">
          {/* <Box
            sx={{
              background: "#f5f5f5",
              borderRadius: "2px",
              paddingBottom: "5px",
              marginTop: "30px",
              marginBottom: "15px",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Box sx={{ paddingLeft: "10px" }} onClick={goToCategory}>
                  All {CategoryName}
                </Box>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "right" }}>
                <Box sx={{ paddingRight: "10px" }}>
                  <ArrowRightRoundedIcon />
                </Box>
              </Grid>
            </Grid>
          </Box> */}
          {subCategoryList}
        </Container>
      </Drawer>
    </>
  );
};

export default withStyles(styles)(DrawerMain);
