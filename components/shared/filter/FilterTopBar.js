import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AppsIcon from '@mui/icons-material/Apps';

const shortList = [
  { label: "Best Seller", val: "best" },
  { label: "Featured", val: "feat" },
  { label: "Price Heigh To Low", val: "high" },
  { label: "Price Low To Heigh", val: "low" },
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

  console.log(router.query);

  // local state
  const [activeFilter, setActiveFilter] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [short, setShort] = useState(null);

  // methods
  const goTourl = (props, orderBy) => {
    const page = router.query.page ? router.query.page : "";
    const filter = router.query.filter ? router.query.filter : "";
    const occasion = router.query.occasion ? router.query.occasion : "";
    const color = router.query.color ? router.query.color : "";
    const fabric = router.query.fabric ? router.query.fabric : "";
    const order = router.query.order ? router.query.order : "";
    const styles = router.query.styles ? router.query.styles : "";
    const priceRange = router.query.priceRange ? router.query.priceRange : "";
    const size = router.query.size ? router.query.size : "";

    let prevRoute = router.asPath.split("?");
    router.asPath.indexOf("filter") !== -1
      ? router.push(
          prevRoute[0] +
            "?page=" +
            1 +
            "&filter=" +
            filter +
            // "&promoProduct=0" +
            "&size=" +
            size +
            "&priceRange=" +
            priceRange +
            "&occasion=" +
            occasion +
            "&color=" +
            color +
            "&fabric=" +
            fabric +
            "&order=" +
            orderBy +
            "&styles=" +
            styles +
            "&" +
            props
        )
      : router.push(prevRoute[0] + "?page=&filter=" + props);
  };

  const handlefilter = (id, className) => {
    setActiveFilter(id);
    setProductLayoutClass(className);
  };

  const handleShort = (e, value) => {
    setShort(value);
    if (value !== null) {
      if (value.val == "best") {
        goTourl("bestSelling=1&featured=", "");
      } else if (value.val == "feat") {
        goTourl("featured=&bestSelling=1", "");
      } else if (value.val == "high") {
        goTourl("priceOrder=desc&featured=&bestSelling=", "");
      } else if (value.val == "low") {
        goTourl("priceOrder=asc&featured=&bestSelling=", "");
      }
    } else {
      goTourl("", "desc");
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
            width={20}
            height={20}
            alt="filter two grid"
            style={{ opacity: activeFilter === 2 ? "1" : "0.3" }}
            className="mx-3 mt-2 cursor-pointer"
            onClick={() => handlefilter(2, "col-6  px-1")}
          />

          <img
            src="/img/filter-icon-three.svg"
            width={20}
            height={20}
            alt="filter grid"
            style={{ opacity: activeFilter === 3 ? "1" : "0.3" }}
            className="mx-2 mt-2 cursor-pointer"
            onClick={() => handlefilter(3, "col-12 px-1")}
          />
        </div>
      </Grid>
      <Grid item xs={4} sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
        <div className="text-center pt-1">
          <img
            src="/img/filter-icon-one.svg"
            width={21}
            height={22}
            alt="filter two grid"
            style={{ opacity: activeFilter === 2 ? "1" : "0.3" }}
            className="mx-3 mt-2 cursor-pointer"
            onClick={() => handlefilter(2, "col-6  px-1")}
          />
          <AppsIcon fontSize="large" sx={{marginTop:'7px'}} color={activeFilter == 2 ? "disabled" : ""}  onClick={() => handlefilter(1, "col-6 col-md-4 col-lg-3 px-1")} />

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
        <Autocomplete
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
          renderInput={(params) => <TextField {...params} label="Short By" />}
        />
      </Grid>
      <Grid item xs={12}>
        <hr />
      </Grid>
    </Grid>
  );
}
