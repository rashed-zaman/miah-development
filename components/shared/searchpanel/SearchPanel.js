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
import { searchDataLayer } from "../../../service/data-layer-creator/dataLayerCreator";


// Debounce function to limit API calls
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

// Cache for search results
const cache = {};

export default function SearchPanel() {
  // hooks
  const route = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const allRecentSearch = useSelector((state) => state.auth.rectRearch);
  const searchShowHide = useSelector((state) => state.menu.searchPanel);

  // local state
  const [backDrp, setBackDrp] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResutl] = React.useState([]);

  // Debounced API call to search
  const handleSearcValue = debounce((e) => {
    const { value } = e.target;
    if (cache[value]) {
      setSearchResutl(cache[value]);
      return;
    }

    setBackDrp(true);
    setSearch(value);

    commonService
      .getData("searchProduct?name=" + value)
      .then((res) => {
        setSearchResutl(res.search_item.data);
        cache[value] = res.search_item.data; // Cache results
        searchDataLayer(value)
        setBackDrp(false);
      })
      .catch((error) => {
        setBackDrp(false);
        console.log("error", error.Error);
      });
  }, 500);

  // Set search result and recent search
  const handleSetRecnt = () => {
    dispatch(setRecentSerach(search));
    route.push("/search?searchBy=" + search);
    dispatch(setSearchPanel(false));
  };

  // Close the search panel
  const closeSreach = () => {
    dispatch(setSearchPanel(false));
  };

  // Navigate to product details
  const gotoProduct = React.useCallback((product) => {
    route.push(`/product/${product.slug}`);
    dispatch(setSearchPanel(false));
  }, [route, dispatch]);

  // Navigate to recent search result
  const goToRecents = React.useCallback((item) => {
    route.push("/search?searchBy=" + item);
    dispatch(setSearchPanel(false));
  }, [route, dispatch]);

  // Change route for trending and new items
  const changeRoute = React.useCallback((slug) => {
    route.push(slug);
    dispatch(setSearchPanel(false));
  }, [route, dispatch]);

  // Handle Enter keypress
  const handleKeyPress = (e) => {
    if (e.charCode === 13 && search.length > 2) {
      handleSetRecnt();
    }
  };

  // Reset backdrop when panel is shown
  React.useEffect(() => {
    if (searchShowHide) {
      setBackDrp(false);
    }
  }, [searchShowHide]);

  // Styles
  const styles = {
    searchBox: {
      background: "#fff",
      padding: "10px 15px 20px 15px",
    },
    stickyHeader: {
      position: "sticky",
      top: 0,
      left: 0,
      width: "100%",
      background: "#fff",
      zIndex: "modal",
    },
  };

  return (
    <Dialog
      fullScreen={matches ? matches : false}
      maxWidth="md"
      fullWidth
      open={searchShowHide}
    >
      <Box sx={{ maxHeight: 600, position: "relative" }}>
        <Box sx={styles.stickyHeader}>
          <Grid container spacing={2}>
            <Grid item sm={1} xs={1}>
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
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
        <Box sx={styles.searchBox}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={12}>
              <p className="mt-3">
                <b>
                  Search By{" "}
                  <u style={{ cursor: "pointer" }} onClick={handleSetRecnt}>
                    {search}
                  </u>
                </b>
              </p>
              <Divider />
              <br />
              {searchResult.length ? (
                <Box sx={{ position: "relative" }}>
                  <Grid container spacing={2} p={2}>
                    {searchResult.map((item, pos) => (
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
                            loading="lazy" // Lazy loading
                          />
                          <p
                            className="mrY"
                            style={{ fontSize: "12px", fontWeight: "bold" }}
                          >
                            {item.name}
                          </p>
                        </Box>
                      </Grid>
                    ))}
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
              ) : (
                <Box sx={{ textAlign: "center" }}>
                  <p>No search items </p>
                </Box>
              )}
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={2}>
            {allRecentSearch?.length > 0 && (
              <Grid item sm={4} xs={12}>
                <p>
                  <b>RECENT SEARCH</b>
                </p>
                {allRecentSearch.map((item, pos) => (
                  <p
                    className="searchList"
                    key={pos}
                    onClick={() => goToRecents(item)}
                  >
                    <Link href={"/search?searchBy=" + item}>
                      <a>{item}</a>
                    </Link>
                  </p>
                ))}
              </Grid>
            )}
            <Grid item sm={4} xs={12}>
              <p>
                <b>TRENDING SEARCH</b>
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
  );
}
