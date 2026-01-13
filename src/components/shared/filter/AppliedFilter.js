"use client";

import React, { useEffect } from "react";
import { Grid, Stack, Chip } from "@mui/material";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  setColorFilter,
  setSizeFilter,
  setFabricFilter,
  setOccasionFilter,
  setPatternFilter,
} from "@/store/filterSlice";

export default function AppliedFilter({
  color,
  ocassion,
  fabric,
  size,
  comitedValue,
  setColor,
  setFabric,
  setoccasion,
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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Category-related params (used instead of query.*)
  const rootCategory = searchParams.get("rootCategory");
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");

  // ================ helpers =================
  const pushUrl = (params) => {
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  // ================ remove handlers =================
  const baseParams = () => {
    const params = new URLSearchParams();
    params.set("filter", "");
    params.set("occasion", ocassion || "");
    params.set("color", color || "");
    params.set("fabric", fabric || "");
    params.set("pattern", pattern || "");
    params.set("size", size || "");
    params.set("priceRange", comitedValue);
    params.set("featured", featured || "");
    params.set("bestSelling", bestSelling || "");
    params.set("priceOrder", priceOrder || "");
    params.set("styles", style || "");
    return params;
  };

  const removeColor = () => {
    setColor("");
    dispatch(setColorFilter(""));
    const params = baseParams();
    params.set("color", "");
    pushUrl(params);
  };

  const removeOcassion = () => {
    setoccasion("");
    dispatch(setOccasionFilter(""));
    const params = baseParams();
    params.set("occasion", "");
    pushUrl(params);
  };

  const removeFabric = () => {
    setFabric("");
    dispatch(setFabricFilter(""));
    const params = baseParams();
    params.set("fabric", "");
    pushUrl(params);
  };

  const removePattern = () => {
    setPattern("");
    dispatch(setPatternFilter(""));
    const params = baseParams();
    params.set("pattern", "");
    pushUrl(params);
  };

  const removeSize = () => {
    setSize("");
    dispatch(setSizeFilter(""));
    const params = baseParams();
    params.set("size", "");
    pushUrl(params);
  };

  // ================ reset filters on category change =================
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
  }, [rootCategory, category, subCategory]);

  // ================ UI =================
  return (
    <Grid container spacing={2}>
      <Grid  size={12} sx={{ marginTop: "5px" }}>
        {type === "mobile" && (
          <div className="row">
            <div className="col-6 text-center">
              <p className="mb-0 pl-0">
                <b>Applied filters</b>
              </p>
            </div>
          </div>
        )}

        <Stack direction="row" spacing={1}>
          {filter.color && (
            <Chip label={filter.color} variant="outlined" onDelete={removeColor} />
          )}
          {filter.fabric && (
            <Chip label={filter.fabric} variant="outlined" onDelete={removeFabric} />
          )}
          {filter.ocassion && (
            <Chip label={filter.ocassion} variant="outlined" onDelete={removeOcassion} />
          )}
          {filter.pattern && (
            <Chip label={filter.pattern} variant="outlined" onDelete={removePattern} />
          )}
          {filter.size && (
            <Chip label={filter.size} variant="outlined" onDelete={removeSize} />
          )}
        </Stack>

        {type === "mobile" && <hr />}
      </Grid>
    </Grid>
  );
}
