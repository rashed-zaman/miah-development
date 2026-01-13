"use client"; // required because we use state, useEffect, window, router

import { Autocomplete, Button, Grid } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import AppsIcon from "@mui/icons-material/Apps";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import ProductSort from "./sort-options/ProductSort";

const shortList = [
  { label: "Best Seller", val: "best" },
  { label: "Featured", val: "feat" },
  { label: "Price High To Low", val: "high" },
  { label: "Price Low To High", val: "low" },
];

export default function FilterTopBar({
  data,
  setFilter,
  filter,
  setMobileFilter,
  mobileFilter,
  setProductLayoutClass,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get query params
  const occasion = searchParams.get("occasion") || "";
  const pattern = searchParams.get("pattern") || "";
  const color = searchParams.get("color") || "";
  const fabric = searchParams.get("fabric") || "";
  const styles = searchParams.get("styles") || "";
  const priceRange = searchParams.get("priceRange") || "";
  const size = searchParams.get("size") || "";

  const oldFilterUrl = `?page=1&filter=&size=${size}&priceRange=${priceRange}&occasion=${occasion}&color=${color}&fabric=${fabric}&order=&styles=${styles}&pattern=${pattern}`;

  const getRoute = () => {
    if (pathname.includes("?")) {
      return pathname + oldFilterUrl;
    } else {
      return pathname + "?page=1&filter=";
    }
  };

  const [activeFilter, setActiveFilter] = useState(1);
  const [short, setShort] = useState(null);

  const handlefilter = (id, className) => {
    setActiveFilter(id);
    setProductLayoutClass(className);
  };

  const handleShort = (e, value) => {
    setShort(value);
    const url = getRoute();

    if (value !== null && value.val === "best") {
      router.push(url + "&bestSelling=1&featured=&priceOrder=");
    } else if (value !== null && value.val === "feat") {
      router.push(url + "&bestSelling=&featured=1&priceOrder=");
    } else if (value !== null && value.val === "high") {
      router.push(url + "&bestSelling=&featured=&priceOrder=desc");
    } else if (value !== null && value.val === "low") {
      router.push(url + "&bestSelling=&featured=&priceOrder=asc");
    }

    if (value == null) {
      router.push(url + "&bestSelling=&featured=&priceOrder=");
    }
  };

  // Responsive filter active default
  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveFilter(window.innerWidth > 768 ? 1 : 2);
    }
  }, []);

  return (
    <Grid container spacing={2}>
      {/* Mobile Filter Button */}
      <Grid size={8} sx={{ display: { sm: "none", xs: "block" } }}>
        <Button onClick={() => setMobileFilter(!mobileFilter)}>
          <TuneIcon />
          <span className="ml-2 text-capitalize">Filter</span>
        </Button>
        <small
          className="ml-2"
          style={{ fontSize: "1rem", fontWeight: 500, textTransform: "capitalize" }}
        >
          ({data.totalRow} Products)
        </small>
      </Grid>

      {/* Desktop Filter Button */}
      <Grid size={3} sx={{ display: { sm: "block", xs: "none" } }}>
        <Button onClick={() => setFilter(!filter)}>
          <TuneIcon />
          {filter && <span className="ml-2 text-capitalize">Hide Filter</span>}
        </Button>
        <small
          className="ml-2"
          style={{ fontSize: "1rem", fontWeight: 500, textTransform: "capitalize" }}
        >
          ({data.totalRow} Products)
        </small>
      </Grid>

      {/* Mobile Layout Icons */}
      <Grid  size={{xs:4, sm:6}} sx={{ display: { xs: "block", sm: "none" } }}>
        <div className="text-center pt-1">
          <img
            src="/img/filter-icon-one.svg"
            width={15}
            height={15}
            alt="filter two grid"
            style={{ opacity: activeFilter === 2 ? 1 : 0.3 }}
            className="mx-3 mt-2 cursor-pointer"
            onClick={() => handlefilter(2, "col-6  px-1")}
          />
          <img
            src="/img/filter-icon-three.svg"
            width={16}
            height={16}
            alt="filter grid"
            style={{ opacity: activeFilter === 3 ? 1 : 0.3 }}
            className="mx-2 mt-2 cursor-pointer"
            onClick={() => handlefilter(3, "col-12 px-1")}
          />
        </div>
      </Grid>

      {/* Desktop Layout Icons */}
      <Grid size={{xs:4, sm:6}} sx={{ display: { xs: "none", sm: "block" } }}>
        <div className="text-center">
          <img
            src="/img/filter-icon-one.svg"
            width={21}
            height={22}
            alt="filter two grid"
            style={{ opacity: activeFilter === 2 ? 1 : 0.3 }}
            className="mx-3 mt-2 cursor-pointer"
            onClick={() => handlefilter(2, "col-6  px-1")}
          />
          <AppsIcon
            fontSize="large"
            sx={{ marginTop: "7px" }}
            color={activeFilter === 2 ? "disabled" : "inherit"}
            onClick={() => handlefilter(1, "col-6 col-md-4 col-lg-3 px-1")}
          />
        </div>
      </Grid>

      {/* Sort */}
      <Grid size={3} sx={{ display: { sm: "block", xs: "none" } }}>
        <ProductSort />
      </Grid>

      <Grid size={12} className="pt-0">
        <hr />
      </Grid>
    </Grid>
  );
}
