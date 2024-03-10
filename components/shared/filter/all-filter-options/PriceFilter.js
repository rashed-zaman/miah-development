import React, { useState, useEffect } from "react";
import { Grid, Slider } from "@mui/material";
import AccordionLayout from "./AccordionLayout";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function PriceFilter({
  data,
  color,
  ocassion,
  fabric,
  setComittedValue,
  getRoute,
  category,
  pattern,
  comitedValue,
  type = { type },
  setMobileFilter,
  bestSelling,
  featured,
  priceOrder,
  style,
}) {
  // =============== hooks ================
  const router = useRouter();
  // =============== state ================
  const [value, setValue] = useState([1, parseInt(data.maxRate)]);
  const [maxValue, setMaxValue] = useState(parseInt(data.maxRate));
  const [minValue, setMinValue] = useState(parseInt(1));

  // =============== methods ================
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSliderCommitted = async (event, newValue) => {
    setComittedValue(newValue);
    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&promoProduct=0&pattern=${pattern}&occasion=${ocassion}&color=${color}&fabric=${fabric}&priceRange=${newValue}&order=${category}&featured=${
      featured ? featured : ""
    }&bestSelling=${bestSelling ? bestSelling : ""}&priceOrder=${
      priceOrder ? priceOrder : ""
    }&styles=${style ? style : ""}`;
    router.push(url);
  };

  const path = getRoute();

  useEffect(() => {
    let newVal = [...value];
    newVal[1] = parseInt(data.maxRate);
    newVal[0] = 1;
    setValue(newVal);
    setComittedValue(newVal);
    setMaxValue(parseInt(data.maxRate));
    setMinValue(1);
  }, [path]);

  return (
    <>
      {type === "mobile" ? (
        <AccordionLayout title="price range" id="price-id">
          <div className="row">
            <div className="col-6">{comitedValue[0]} TK</div>
            <div className="col-6 text-right">{comitedValue[1]} Tk</div>
          </div>
          <Slider
            getAriaLabel={() => "Price range"}
            size="small"
            step={10}
            value={value}
            min={minValue}
            max={maxValue}
            onChange={handleChange}
            onChangeCommitted={handleSliderCommitted}
            valueLabelDisplay="auto"
          />
        </AccordionLayout>
      ) : (
        <Grid item xs={2}>
          <div className="dropdown">
            <div className="btn-block filter-button" data-toggle="dropdown">
              <div className="row">
                <div className="col-9">PRICE RANGE</div>
                <div className="col-3 text-right">
                  <KeyboardArrowDownIcon />
                </div>
              </div>
            </div>
            <div
              className="dropdown-menu pt-4 px-2"
              style={{
                width: "100%",
                marginTop: "0px",
                borderRadius: "0px",
                height: "100px",
                overflowY: "auto",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              <div className="px-2">
                <Slider
                  getAriaLabel={() => "Price range"}
                  size="small"
                  step={10}
                  value={value}
                  min={minValue}
                  max={maxValue}
                  onChange={handleChange}
                  onChangeCommitted={handleSliderCommitted}
                  valueLabelDisplay="auto"
                />
              </div>
              <div className="row">
                <div className="col-6 text-left">{comitedValue[0]} TK</div>
                <div className="col-6 text-right">{comitedValue[1]} Tk</div>
              </div>
            </div>
          </div>
        </Grid>
      )}
    </>
  );
}
