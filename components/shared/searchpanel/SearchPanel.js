import * as React from "react";
import { Dialog, Box, useMediaQuery, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import commonService from "../../../service/menu/commonService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_URL } from "../../../service/serviceConfig";
import { useDispatch, useSelector } from "react-redux";
import { setRecentSerach } from "../../../redux/auth/authActions";
import { useRouter } from "next/router";
import CancelIcon from "@mui/icons-material/Cancel";

import { setSearchPanel } from "../../../redux/menu/menuActions";

export default function SearchPanel() {
  // hooks
  const route = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const allRecentSearch = useSelector((state) => state.auth.rectRearch);
  const searchShowHide = useSelector((state) => state.menu.searchPanel);

  // local state
  const [open, setOpen] = React.useState(false);
  const [backDrp, setBackDrp] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResutl] = React.useState([]);

  // methods

  const handleSearcValue = (e) => {
    setBackDrp(true);
    const { value } = e.target;
    setSearch(value);
    commonService
      .getData("searchProduct?name=" + value)
      .then((res) => {
        setSearchResutl(res.search_item);
        setBackDrp(false);
      })
      .catch((error) => {
        setBackDrp(false);
        console.log("error", error.Error);
      });
    console.log(value);
  };

  const handleSetRecnt = () => {
    dispatch(setRecentSerach(search));
    route.push("/search?searchBy=" + search);
    dispatch(setSearchPanel(false));
  };

  const closeSreach = () => {
    dispatch(setSearchPanel(false));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const gotoProduct = (product) => {
    route.push(`/product/${product.slug}`);
    dispatch(setSearchPanel(false));
    console.log(product);
  };
  const goToRecents = (item) => {
    route.push("/search?searchBy=" + item);
    dispatch(setSearchPanel(false));
  };
  const changeRoute = (slug) => {
    route.push(slug);
    dispatch(setSearchPanel(false));
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13 && search.length > 2) {
      handleSetRecnt()
    }
  }
  // side effects

  React.useEffect(() => {
    if (searchShowHide) {
      setBackDrp(false);
    }
  }, [searchShowHide]);

  return (
    <>
      <Dialog
        fullScreen={matches ? matches : false}
        maxWidth="md"
        fullWidth
        open={searchShowHide}
      >
        <Box
          sx={{
            maxHeight: 600,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 0,
              left: 0,
              width: "100%",
              background: "#fff",
              zIndex: "modal",
            }}
          >
            <Grid container spacing={2}>
              <Grid item sm={1} xs={1}>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Grid>
              <Grid item sm={10} xs={9}>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  onChange={handleSearcValue}
                  onKeyPress={handleKeyPress}
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search google maps" }}
                />
              </Grid>
              <Grid item sm={1} xs={2}>
                <IconButton
                  onClick={closeSreach}
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
          </Box>
          <Box
            sx={{
              background: "#fff",
              padding: "10px 15px 20px 15px",
            }}
          >
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={12}>
                <p className="mt-3">
                  <b>
                    Search By { " " }
                    <u style={{ cursor: "pointer" }} onClick={handleSetRecnt}>
                      {search}
                    </u>
                  </b>
                </p>
                <Divider />
                <br />
                {
                  searchResult.length ?
                  <Box sx={{ position: "relative" }}>
                    <Grid container spacing={2} p={2}>
                      {searchResult.map((item, pos) => {
                        return (
                          <Grid item sm={2} xs={4} key={pos}>
                            <Box
                              onClick={() => gotoProduct(item)}
                              className="search-panel-product"
                            >
                              <Image
                                src={`${IMAGE_URL}m_thumb/${item.img}`}
                                alt={item.img_title}
                                width={300}
                                height={300}
                                layout="responsive"
                                placeholder="blur"
                                blurDataURL="/homeAsset/bckgnd.png"
                              />
                              <p
                                className="mrY"
                                style={{ fontSize: "12px", fontWeight: "bold" }}
                              >
                                {item.name}
                              </p>
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                    <Backdrop
                      open={backDrp}
                      sx={{
                        color: "#fff",
                        position: "absolute",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                    >
                      <CircularProgress color="inherit" size={20} />
                    </Backdrop>
                  </Box>
                  :
                  <Box sx={{textAlign: 'center'}}>
                    <p>No search items </p>
                  </Box>
                }
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2}>
              {allRecentSearch ? (
                <Grid item sm={4} xs={12}>
                  <p>
                    <b>RECENT SEARCH</b>
                  </p>
                  {allRecentSearch.map((item, pos) => {
                    return (
                      <p
                        className="searchList"
                        key={pos}
                        onClick={() => goToRecents(item)}
                      >
                        <Link href={"/search?searchBy=" + item}>
                          <a>{item}</a>
                        </Link>
                      </p>
                    );
                  })}
                </Grid>
              ) : null}
              <Grid item sm={4} xs={12}>
                <p>
                  <b>TREANDING SEARCH</b>
                </p>
                <div className="treadingSearhList">
                  <p onClick={() => changeRoute("/women/salwar-kameez")}>
                    Salwar Kammez
                  </p>
                  <p onClick={() => changeRoute("/women/saree")}> Saree</p>
                  <p onClick={() => changeRoute("/men/lungi")}> Lungi</p>
                  <p onClick={() => changeRoute("/others/gamcha")}> Gamcha</p>
                  <p onClick={() => changeRoute("/others/cut-fabrics")}>
                    Cut Fabrics
                  </p>
                </div>
              </Grid>
              <Grid item sm={4} xs={12}>
                <p>
                  <b>{"WHAT'S NEW"}</b>
                </p>
                <div className="treadingSearhList">
                  <p onClick={() => changeRoute("/men")}>Men</p>
                  <p onClick={() => changeRoute("/women")}> Women</p>
                  <p onClick={() => changeRoute("/others")}> Others</p>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
