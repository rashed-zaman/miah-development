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
import { useRouter } from "next/router";

import AccordionLayout from "../all-filter-options/AccordionLayout";

const shortList = [
  { label: "Best Seller", val: "best" },
  { label: "Featured", val: "feat" },
  { label: "Price High To Low", val: "high" },
  { label: "Price Low To High", val: "low" },
  // { label: "Old to New", val: "old" },
  // { label: "New to Old", val: "new" },
];

export default function ProductSort({type}) {
  const [inputValue, setInputValue] = useState("");
  const [short, setShort] = useState(null);

  const [value, setValue] = useState('')

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
    const {value} = event.target
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
  }

  return (
    <>
    {
        type == "mobile" ? 
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
      :
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
    }
    </>
  );
}
