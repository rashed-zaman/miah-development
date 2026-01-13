import React, { useState } from "react";
import {
  Box,
  Grid,
  Drawer,
  IconButton,
  Container,
  Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import { useSelector, useDispatch } from "react-redux";
import { selectDrawer, selectCatDrawer, selectSubDrawer, setDrawer,setCatDrawer,setSubDrawer } from "@/store/menuSlice";
import { useRouter } from "next/navigation"
import Image from "next/image";
import Link from "next/link";



const DrawerMain = ({ menu }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // redux states
  const open = useSelector(selectDrawer);
  const openCat = useSelector(selectCatDrawer);
  const openSubCat = useSelector(selectSubDrawer);

  // local states
  const [rootCat, setRootCat] = useState({ name: "", slug: "" });
  const [cat, setCat] = useState({ name: "", slug: "", list: [] });
  const [subCategory, setSubCat] = useState([]);

  // ==== drawer actions ====
  const closeAllDrawer = () => {
    dispatch(setDrawer(false));
    dispatch(setCatDrawer(false));
    dispatch(setSubDrawer(false));
  };

  const loadCategory = (rootCategory) => {
    setCat({ name: "", slug: "", list: rootCategory.category });
    setRootCat({ name: rootCategory.root_category, slug: rootCategory.slug });
    dispatch(setCatDrawer(true));
  };

  const loadSubCategory = (subcategory) => {
    setCat({ ...cat, name: subcategory.category, slug: subcategory.slug });
    setSubCat(subcategory.subcategory);
    dispatch(setSubDrawer(true));
  };

  // ==== navigation ====
  const changeRoute = (slug) => {
    router.push(`/${rootCat.slug}/${cat.slug}/${slug}`);
    closeAllDrawer();
  };

  const goToRootCategory = () => {
    router.push(`/${rootCat.slug}`);
    closeAllDrawer();
  };

  const goToCategory = () => {
    router.push(`/${rootCat.slug}/${cat.slug}`);
    closeAllDrawer();
  };

  // ==== reusable list item ====
  const ListItem = ({ label, onClick }) => (
    <Box
      sx={{
        background: "#f5f5f5",
        borderRadius: "2px",
        paddingBottom: "5px",
        marginBottom: "15px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Grid container spacing={1}>
        <Grid size={8}>
          <Box sx={{ pl: 1 }}>{label}</Box>
        </Grid>
        <Grid size={4} sx={{ textAlign: "right" }}>
          <Box sx={{ pr: 1 }}>
            <ArrowRightRoundedIcon />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      {/* Root Category Drawer */}
      <Drawer anchor="left" open={open} PaperProps={{ sx: { width: "100%" } }}>
        <Container maxWidth="sm">
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={6}>
              <IconButton onClick={() => dispatch(setDrawer(false))}>
                <CloseRoundedIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <IconButton>
                <FavoriteBorderRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Box mt={2}>
            {menu.map((root) => (
              <ListItem
                key={root.id}
                label={root.root_category}
                onClick={() => loadCategory(root)}
              />
            ))}

            <Box
              sx={{
                background: "#f5f5f5",
                borderRadius: "2px",
                pb: 1,
                mb: 2,
              }}
            >
              <Link href="/exclusive-trendz-product/saleableProduct">
                <Grid container spacing={1} onClick={closeAllDrawer}>
                  <Grid item xs={8}>
                    <Box sx={{ pl: 1 }}>Sale</Box>
                  </Grid>
                </Grid>
              </Link>
            </Box>
          </Box>
        </Container>

        <Container maxWidth="sm">
          <Grid container>
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

      {/* Category Drawer */}
      <Drawer
        elevation={0}
        hideBackdrop
        anchor="right"
        open={openCat}
        PaperProps={{ sx: { width: "100%" } }}
      >
        <Box sx={{ background: "#f5f5f5", py: 1 }}>
          <Container maxWidth="sm">
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <ArrowLeftRoundedIcon onClick={() => dispatch(setCatDrawer(false))} />
              </Grid>
              <Grid item xs={8}>
                <b>{rootCat.name}</b>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: "right" }}>
                <CloseRoundedIcon onClick={closeAllDrawer} />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="sm" sx={{ pt: 2 }}>
          {cat.list.map((c) => (
            <ListItem
              key={c.id}
              label={c.category}
              onClick={() => loadSubCategory(c)}
            />
          ))}
        </Container>
      </Drawer>

      {/* SubCategory Drawer */}
      <Drawer
        elevation={0}
        hideBackdrop
        anchor="right"
        open={openSubCat}
        PaperProps={{ sx: { width: "100%" } }}
      >
        <Box sx={{ background: "#f5f5f5", py: 1 }}>
          <Container maxWidth="sm">
            <Grid container alignItems="center">
              <Grid size={1}>
                <ArrowLeftRoundedIcon onClick={() => dispatch(setSubDrawer(false))} />
              </Grid>
              <Grid size={8}>
                <b>{cat.name}</b>
              </Grid>
              <Grid size={3} sx={{ textAlign: "right" }}>
                <CloseRoundedIcon onClick={closeAllDrawer} />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="sm" sx={{ pt: 2 }}>
          {subCategory.map((sub) => (
            <ListItem
              key={sub.id}
              label={sub.sub_category}
              onClick={() => changeRoute(sub.slug)}
            />
          ))}
        </Container>
      </Drawer>
    </>
  );
};

export default DrawerMain;
