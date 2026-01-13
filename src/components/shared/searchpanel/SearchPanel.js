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
import CancelIcon from "@mui/icons-material/Cancel";
import { searchDataLayer } from "../../../service/data-layer-creator/dataLayerCreator";
import { useRouter } from "next/navigation";
import { setSearchPanel } from "@/store/menuSlice";
import { setRecentSearch } from "@/store/authSlice";



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
  const [totalProduct, setTotalProduct] = React.useState(0);

  // Debounced API call to search
  const handleSearcValue = debounce((e) => {
    const { value } = e.target;

    // If the search input is blank, reset the search results and total product count
    if (!value.trim()) {
      setSearchResutl([]);
      setTotalProduct(0);
      return;
    }

    // If the search input is not blank, proceed with the API call
    setBackDrp(true);
    setSearch(value);

    commonService
      .getData("searchProduct?name=" + value)
      .then((res) => {
        setSearchResutl(res.search_item.data);
        cache[value] = res.search_item.data; // Cache results
        setTotalProduct(res.search_item.total);

        searchDataLayer(value);
        setBackDrp(false);
      })
      .catch((error) => {
        setBackDrp(false);
        console.log("error", error.Error);
      });
  }, 300);

  // Set search result and recent search
  const handleSetRecnt = () => {
    dispatch(setRecentSearch(search));
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

  const drawerStyle = {
    minHeight: "85vh",
    maxHeight: "85vh",
  };

  return (
    <Dialog
      fullScreen={matches ? false : false}
      maxWidth="md"
      fullWidth
      open={searchShowHide}
      sx={matches ? drawerStyle : {}}
    >
      <Box>
        <Box sx={styles.stickyHeader}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 1, md: 1 }}>
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid  size={{ xs: 9, sm: 10 }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                onChange={handleSearcValue}
                onKeyUp={handleKeyPress}
                placeholder="Search..."
                inputProps={{ "aria-label": "search google maps" }}
              />
            </Grid>
            <Grid  size={{ xs: 2, sm: 1 }}>
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
            <Grid  size={{ xs: 12, sm: 12 }}>
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
              {searchResult.length > 0 && (
                <Box sx={{ position: "relative" }}>
                  <p>Total Product: {totalProduct}</p>
                  <Grid container spacing={2} p={2}>
                    {searchResult.map((item, pos) => (
                      <Grid  key={pos} size={{ xs: 4, sm: 2 }}>
                        <Box
                          onClick={() => gotoProduct(item)}
                          className="search-panel-product"
                        >
                          <Image
                            src={`${IMAGE_URL}m_thumb/${item.img}`}
                            alt={item.img_title ?? "imge alt"}
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
              )}

              {searchResult.length === 0 && search.length > 0 && (
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
                      {item}
                    </Link>
                  </p>
                ))}
              </Grid>
            )}
            <Grid  size={{ xs: 12, sm: 4 }}>
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
            <Grid  size={{ xs: 12, sm: 4 }}>
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