import React, { useEffect } from "react";
import { Grid, Stack, Chip } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  setColorFilter,
  setSizeFilter,
  setFabricFilter,
  setOccasionFilter,
  setPatternFilter,
  setShortOrder,
} from "../../../redux/filter/fiterAction";

export default function AppliedFilter({
  color,
  ocassion,
  fabric,
  size,
  comitedValue,
  setColor,
  setFabric,
  setoccasion,
  setCategory,
  setPattern,
  setSize,
  getRoute,
  pattern,
  type,
  data,
  bestSelling,
  featured,
  priceOrder,
  style,
}) {
  // =============== hooks ================
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  // ================ methods ============

  const removeColor = () => {
    setColor("");
    dispatch(setColorFilter(""));
    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&occasion=${ocassion}&color=${""}&fabric=${fabric}&pattern=${pattern}&priceRange=${comitedValue}&featured=${
      featured ? featured : ""
    }&bestSelling=${bestSelling ? bestSelling : ""}&priceOrder=${
      priceOrder ? priceOrder : ""
    }&styles=${style ? style : ""}&size=${size}`;
    router.push(url);
  };

  const removeOcassion = () => {
    setoccasion("");
    dispatch(setOccasionFilter(""));
    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&occasion=&color=${color}&fabric=${fabric}&priceRange=${comitedValue}&pattern=${pattern}&featured=${
      featured ? featured : ""
    }&bestSelling=${bestSelling ? bestSelling : ""}&priceOrder=${
      priceOrder ? priceOrder : ""
    }&styles=${style ? style : ""}&size=${size}`;
    router.push(url);
  };

  const removeFabric = () => {
    setFabric("");
    dispatch(setFabricFilter(""));
    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&occasion=${ocassion}&color=${color}&fabric=&priceRange=${comitedValue}&pattern=${pattern}&featured=${
      featured ? featured : ""
    }&bestSelling=${bestSelling ? bestSelling : ""}&priceOrder=${
      priceOrder ? priceOrder : ""
    }&styles=${style ? style : ""}&size=${size}`;
    router.push(url);
  };
  const removePattern = () => {
    setPattern("");
    dispatch(setPatternFilter(""));
    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&occasion=${ocassion}&color=${color}&fabric=${fabric}&priceRange=${comitedValue}&pattern=&order=&featured=${
      featured ? featured : ""
    }&bestSelling=${bestSelling ? bestSelling : ""}&priceOrder=${
      priceOrder ? priceOrder : ""
    }&styles=${style ? style : ""}&size=${size}`;
    router.push(url);
  };
  const removeSize = () => {
    setSize("");
    dispatch(setSizeFilter(""));
    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&occasion=${ocassion}&color=${color}&order=&size=&fabric=${fabric}&priceRange=${comitedValue}&pattern=${pattern}&featured=${
      featured ? featured : ""
    }&bestSelling=${bestSelling ? bestSelling : ""}&priceOrder=${
      priceOrder ? priceOrder : ""
    }&styles=${style ? style : ""}`;
    router.push(url);
  };

  useEffect(() => {
    dispatch(setColorFilter(""));
    dispatch(setOccasionFilter(""));
    dispatch(setFabricFilter(""));
    dispatch(setPatternFilter(""));
    dispatch(setSizeFilter(""));
    setColor("");
    setoccasion("");
    setFabric("");
    setPattern("");
    setSize("");
  }, [query.rootCategory, query.category, query.subCategory]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginTop: "5px" }}>
          {type === "mobile" && (
            <div className="row">
              <div className="col-6 text-center">
                <p className="mb-0 pl-0">
                  <b>Applied filters</b>
                </p>
              </div>
              {/* <div className="col-6 text-center">
                <small>Total Products ({data?.product.length})</small>
              </div> */}
            </div>
          )}
          <Stack direction="row" spacing={1}>
            {filter.color && (
              <Chip
                label={filter.color}
                variant="outlined"
                onDelete={removeColor}
              />
            )}
            {filter.fabric && (
              <Chip
                label={filter.fabric}
                variant="outlined"
                onDelete={removeFabric}
              />
            )}
            {filter.ocassion && (
              <Chip
                label={filter.ocassion}
                variant="outlined"
                onDelete={removeOcassion}
              />
            )}
            {filter.pattern && (
              <Chip
                label={filter.pattern}
                variant="outlined"
                onDelete={removePattern}
              />
            )}
            {filter.size && (
              <Chip
                label={filter.size}
                variant="outlined"
                onDelete={removeSize}
              />
            )}
          </Stack>
          {type === "mobile" && <hr />}
        </Grid>
      </Grid>
    </>
  );
}
