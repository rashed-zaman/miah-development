import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AppsIcon from "@mui/icons-material/Apps";
import ProductSort from "./sort-options/ProductSort";

const shortList = [
  { label: "Best Seller", val: "best" },
  { label: "Featured", val: "feat" },
  { label: "Price High To Low", val: "high" },
  { label: "Price Low To High", val: "low" },
  // { label: "Old to New", val: "old" },
  // { label: "New to Old", val: "new" },
];

export default function FilterTopBar({
  data,
  setFilter,
  filter,
  setMobileFilter,
  mobileFilter,
  setProductLayoutClass,
}) {
  // =============== hooks ================
  const router = useRouter();
  const prevRoute = router.asPath.split("?");
  const { query } = router;
  const { occasion, pattern, color, fabric, styles, priceRange, size } = query;

  const oldFilterUrl = `?page=1&filter=&size=${size ? size : ""}&priceRange=${
    priceRange ? priceRange : ""
  }&occasion=${occasion ? occasion : ""}&color=${color ? color : ""}
&fabric=${fabric ? fabric : ""}&order=&styles=${styles ? styles : ""}&pattern=${
    pattern ? pattern : ""
  }`;

  const getRoute = () => {
    if (router.asPath.indexOf("?") != -1) {
      let prevRoute = router.asPath.split("?");
      return prevRoute[0] + oldFilterUrl;
    } else {
      return prevRoute[0] + "?page=1&filter=";
    }
  };

  // local state
  const [activeFilter, setActiveFilter] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [short, setShort] = useState(null);

  // methods
  const handlefilter = (id, className) => {
    setActiveFilter(id);
    setProductLayoutClass(className);
  };

  const handleShort = (e, value) => {
    setShort(value);
    const url = getRoute();
    console.log(url);
    if (value !== null && value.val == "best") {
      router.push(url + "&bestSelling=1&featured=&priceOrder=");
    } else if (value !== null && value.val == "feat") {
      router.push(url + "&bestSelling=&featured=1&priceOrder=");
    } else if (value !== null && value.val == "high") {
      router.push(url + "&bestSelling=&featured=&priceOrder=desc");
    } else if (value !== null && value.val == "low") {
      router.push(url + "&bestSelling=&featured=&priceOrder=asc");
    }
    if (value == null) {
      router.push(url + "&bestSelling=&featured=&priceOrder=");
    }
  };

  //   side effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 768) {
        setActiveFilter(1);
      } else {
        setActiveFilter(2);
      }
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} sx={{ display: { sm: "none", xs: "block" } }}>
        <Button
          aria-label="delete"
          onClick={() => setMobileFilter(!mobileFilter)}
        >
          <TuneIcon />
          <span className="ml-2 text-capitalize">Filter</span>
        </Button>
        <small
          className="ml-2"
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            textTransform: "capitalize",
          }}
        >
          ({data.totalRow} Products)
        </small>
      </Grid>
      <Grid item xs={3} sx={{ display: { sm: "block", xs: "none" } }}>
        <Button aria-label="delete" onClick={() => setFilter(!filter)}>
          <TuneIcon />
          {filter && <span className="ml-2 text-capitalize">Hide Filter</span>}
        </Button>
        <small
          className="ml-2"
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            textTransform: "capitalize",
          }}
        >
          ({data.totalRow} Products)
        </small>
      </Grid>
      <Grid item xs={4} sm={6} sx={{ display: { xs: "block", sm: "none" } }}>
        <div className="text-center pt-1">
          <img
            src="/img/filter-icon-one.svg"
            width={15}
            height={15}
            alt="filter two grid"
            style={{ opacity: activeFilter === 2 ? "1" : "0.3" }}
            className="mx-3 mt-2 cursor-pointer"
            onClick={() => handlefilter(2, "col-6  px-1")}
          />

          <img
            src="/img/filter-icon-three.svg"
            width={16}
            height={16}
            alt="filter grid"
            style={{ opacity: activeFilter === 3 ? "1" : "0.3" }}
            className="mx-2 mt-2 cursor-pointer"
            onClick={() => handlefilter(3, "col-12 px-1")}
          />
        </div>
      </Grid>
      <Grid item xs={4} sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
        <div className="text-center">
          <img
            src="/img/filter-icon-one.svg"
            width={21}
            height={22}
            alt="filter two grid"
            style={{ opacity: activeFilter === 2 ? "1" : "0.3" }}
            className="mx-3 mt-2 cursor-pointer"
            onClick={() => handlefilter(2, "col-6  px-1")}
          />
          <AppsIcon
            fontSize="large"
            sx={{ marginTop: "7px" }}
            color={activeFilter == 2 ? "disabled" : ""}
            onClick={() => handlefilter(1, "col-6 col-md-4 col-lg-3 px-1")}
          />

          {/* <img
            src="/img/filter-icon.svg"
            width={20}
            height={20}
            alt="filter grid"
            style={{ opacity: activeFilter === 1 ? "1" : "0.3" }}
            className="mx-2 mt-2 cursor-pointer"
            onClick={() => handlefilter(1, "col-6 col-md-4 col-lg-3 px-1")}
          /> */}
          
        </div>
      </Grid>
      <Grid item xs={3} sx={{ display: { sm: "block", xs: "none" } }}>
        <ProductSort />
        {/* <Autocomplete
          value={short}
          onChange={(event, newValue) => handleShort(event, newValue)}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          disablePortal
          id="combo-box-demo"
          options={shortList}
          size="small"
          renderInput={(params) => <TextField {...params} label="Sort By" />}
        /> */}
      </Grid>
      <Grid item xs={12} className="pt-0">
        <hr />
      </Grid>
    </Grid>
  );
}
