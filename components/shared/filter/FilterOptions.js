import React, { useState } from "react";
import { useRouter } from "next/router";

import ColorFilter from "./all-filter-options/ColorFilter";
import FabricFilter from "./all-filter-options/FabricFilter";
import OccasionFilter from "./all-filter-options/OccasionFilter";
import CategoryFilter from "./all-filter-options/CategoryFilter";
import PriceFilter from "./all-filter-options/PriceFilter";
import AppliedFilter from "./AppliedFilter";
import SizeFilter from "./all-filter-options/SizeFilter";
import PatternFilter from "./all-filter-options/PatternFilter";
import StyleFilter from "./all-filter-options/StyleFilter";

export default function FilterOptions({ data, type, setMobileFilter }) {
  // =============== hooks ================
  const router = useRouter();
  const { query } = router;
  const { bestSelling, featured, priceOrder } = query;

  // ==================== local state =============
  const [comitedValue, setComittedValue] = useState([
    0,
    parseInt(data.maxRate),
  ]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [fabric, setFabric] = useState("");
  const [ocassion, setoccasion] = useState("");
  const [pattern, setPattern] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState([]);

  // ==================== methods =================
  const getRoute = () => {
    if (router.asPath.indexOf("?") !== -1) {
      let prevRoute = router.asPath.split("?");
      return prevRoute[0];
    } else {
      return router.asPath;
    }
  };
  return (
    <>
      {type === "mobile" && (
        <AppliedFilter
          color={color}
          ocassion={ocassion}
          fabric={fabric}
          pattern={pattern}
          size={size}
          comitedValue={comitedValue}
          setColor={setColor}
          setSize={setSize}
          setFabric={setFabric}
          setoccasion={setoccasion}
          setCategory={setCategory}
          setPattern={setPattern}
          getRoute={getRoute}
          type={type}
          data={data}
        />
      )}

      <StyleFilter
        data={data}
        size={size}
        color={color}
        ocassion={ocassion}
        fabric={fabric}
        pattern={pattern}
        category={category}
        comitedValue={comitedValue}
        setComittedValue={setComittedValue}
        getRoute={getRoute}
        type={type}
        setMobileFilter={setMobileFilter}
        query={query}
        bestSelling={bestSelling}
        featured={featured}
        priceOrder={priceOrder}
        style={style}
        setStyle={setStyle}
      />

      <PriceFilter
        data={data}
        color={color}
        ocassion={ocassion}
        fabric={fabric}
        pattern={pattern}
        category={category}
        comitedValue={comitedValue}
        setComittedValue={setComittedValue}
        getRoute={getRoute}
        type={type}
        setMobileFilter={setMobileFilter}
        bestSelling={bestSelling}
        featured={featured}
        priceOrder={priceOrder}
        style={style}
      />

      <SizeFilter
        data={data}
        size={size}
        color={color}
        ocassion={ocassion}
        fabric={fabric}
        pattern={pattern}
        category={category}
        comitedValue={comitedValue}
        setSize={setSize}
        getRoute={getRoute}
        type={type}
        bestSelling={bestSelling}
        featured={featured}
        priceOrder={priceOrder}
        style={style}
      />

      <ColorFilter
        data={data}
        color={color}
        ocassion={ocassion}
        fabric={fabric}
        pattern={pattern}
        category={category}
        comitedValue={comitedValue}
        setColor={setColor}
        getRoute={getRoute}
        type={type}
        bestSelling={bestSelling}
        featured={featured}
        priceOrder={priceOrder}
        style={style}
      />

      <FabricFilter
        data={data}
        color={color}
        ocassion={ocassion}
        fabric={fabric}
        category={category}
        pattern={pattern}
        comitedValue={comitedValue}
        setFabric={setFabric}
        getRoute={getRoute}
        type={type}
        bestSelling={bestSelling}
        featured={featured}
        priceOrder={priceOrder}
        style={style}
      />

      <OccasionFilter
        data={data}
        color={color}
        ocassion={ocassion}
        fabric={fabric}
        category={category}
        pattern={pattern}
        comitedValue={comitedValue}
        setoccasion={setoccasion}
        getRoute={getRoute}
        type={type}
        bestSelling={bestSelling}
        featured={featured}
        priceOrder={priceOrder}
        style={style}
      />

      <PatternFilter
        data={data}
        color={color}
        ocassion={ocassion}
        pattern={pattern}
        fabric={fabric}
        category={category}
        comitedValue={comitedValue}
        setPattern={setPattern}
        getRoute={getRoute}
        type={type}
        bestSelling={bestSelling}
        featured={featured}
        priceOrder={priceOrder}
        style={style}
      />

      <CategoryFilter
        data={data}
        color={color}
        ocassion={ocassion}
        fabric={fabric}
        category={category}
        pattern={pattern}
        comitedValue={comitedValue}
        setCategory={setCategory}
        getRoute={getRoute}
        type={type}
        bestSelling={bestSelling}
        featured={featured}
        priceOrder={priceOrder}
        style={style}
      />
      {type !== "mobile" && (
        <AppliedFilter
          color={color}
          ocassion={ocassion}
          fabric={fabric}
          pattern={pattern}
          size={size}
          comitedValue={comitedValue}
          setColor={setColor}
          setSize={setSize}
          setFabric={setFabric}
          setoccasion={setoccasion}
          setCategory={setCategory}
          setPattern={setPattern}
          getRoute={getRoute}
          type={type}
        />
      )}
    </>
  );
}
