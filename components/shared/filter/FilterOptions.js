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

export default function FilterOptions({ data, type, setMobileFilter }) {
  // =============== hooks ================
  const router = useRouter();

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
