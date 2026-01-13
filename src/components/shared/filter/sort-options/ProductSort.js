"use client";

import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import AccordionLayout from "../all-filter-options/AccordionLayout";

const shortList = [
  { label: "Best Seller", val: "best" },
  { label: "Featured", val: "feat" },
  { label: "Price High To Low", val: "high" },
  { label: "Price Low To High", val: "low" },
  // { label: "Old to New", val: "old" },
  // { label: "New to Old", val: "new" },
];

export default function ProductSort({ type }) {
  const [inputValue, setInputValue] = useState("");
  const [short, setShort] = useState(null);

  const [value, setValue] = useState("");

  // =============== hooks ================
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevRoute = pathname.split("?");
  const occasion = searchParams.get("occasion");
  const pattern = searchParams.get("pattern");
  const color = searchParams.get("color");
  const fabric = searchParams.get("fabric");
  const styles = searchParams.get("styles");
  const priceRange = searchParams.get("priceRange");
  const size = searchParams.get("size");

  const oldFilterUrl = `?page=1&filter=&size=${size ? size : ""}&priceRange=${
    priceRange ? priceRange : ""
  }&occasion=${occasion ? occasion : ""}&color=${color ? color : ""}
&fabric=${fabric ? fabric : ""}&order=&styles=${styles ? styles : ""}&pattern=${
    pattern ? pattern : ""
  }`;

  const getRoute = () => {
    // pathname doesn't include search; prevRoute[0] is the base path
    return prevRoute[0] + oldFilterUrl;
  };

  const handleShort = (e, value) => {
    setShort(value);
    const url = getRoute();
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

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
    const url = getRoute();
    if (value !== null && value == "best") {
      router.push(url + "&bestSelling=1&featured=&priceOrder=");
    } else if (value !== null && value == "feat") {
      router.push(url + "&bestSelling=&featured=1&priceOrder=");
    } else if (value !== null && value == "high") {
      router.push(url + "&bestSelling=&featured=&priceOrder=desc");
    } else if (value !== null && value == "low") {
      router.push(url + "&bestSelling=&featured=&priceOrder=asc");
    }
    if (value == "") {
      router.push(url + "&bestSelling=&featured=&priceOrder=");
    }
  };

  return (
    <>
      {type == "mobile" ? (
        <AccordionLayout title="Sort By" id="sort-id">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              {shortList &&
                shortList.map((item) => {
                  return (
                    <FormControlLabel
                      key={item.label}
                      value={item.val}
                      control={<Radio />}
                      label={item.label}
                    />
                  );
                })}
            </RadioGroup>
          </FormControl>
        </AccordionLayout>
      ) : (
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
          renderInput={(params) => <TextField {...params} label="Sort By" />}
        />
      )}
    </>
  );
}
