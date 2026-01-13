import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import AccordionLayout from "./AccordionLayout";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grid from "@mui/material/Grid";


import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../service/serviceConfig";
import FilterLabel from "../FilterLabel";
import CustomRadioButton from "../radio-button/CustomRadioButton";
import { useState } from "react";
import { setColorFilter } from "@/store/filterSlice";

export default function ColorFilter({
  data,
  color,
  colorCode,
  setColor,
  getRoute,
  ocassion,
  fabric,
  category,
  pattern,
  comitedValue,
  type,
  bestSelling,
  featured,
  priceOrder,
  style,
  size
}) {
  // =============== hooks ================
  const router = useRouter();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  // =============== methods ================
  const handleColor = (e) => {
    setColor(e.target.value);
    dispatch(setColorFilter(e.target.value));
    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&promoProduct=0&occasion=${ocassion}&pattern=${pattern}&size=${size}&color=${e.target.value}&fabric=${fabric}&priceRange=${comitedValue}&order=${category}&featured=${featured?featured: ""}&bestSelling=${bestSelling?bestSelling: ""}&priceOrder=${priceOrder?priceOrder:""}&styles=${style?style:""}`;
    router.push(url);
  };
  return (
    <>
      {data?.isFilter?.includes("color") && (
        <>
          {type === "mobile" ? (
            <AccordionLayout title="color" id="color-id">
              
              {data.color &&
                data.color.map((item, index) => {
                  return (
                    <CustomRadioButton
                      key={index}
                      colors={item}
                      color={color}
                      handleColor={handleColor}
                    />
                  );
                })}

              {/* <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={filter.color}
                  onChange={handleColor}
                >
                  {data.color &&
                    data.color.map((item, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          value={item.name}
                          control={<Radio />}
                          label={<FilterLabel filter={item} />}
                        />
                      );
                    })}
                </RadioGroup>
              </FormControl> */}
            </AccordionLayout>
          ) : (
            <Grid item xs={2}>
              <div className="dropdown">
                <div className="btn-block filter-button" data-toggle="dropdown">
                  <div className="row">
                    <div className="col-9">COLOR</div>
                    <div className="col-3 text-right">
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                </div>
                <div
                  className="dropdown-menu pl-2"
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    borderRadius: "0px",
                    height: "200px",
                    overflowY: "auto",
                  }}
                >
                  {data.color &&
                    data.color.map((item, index) => {
                      return (
                        <CustomRadioButton
                          key={index}
                          colors={item}
                          color={color}
                          handleColor={handleColor}
                        />
                      );
                    })}
                  {/* <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={filter.color}
                      onChange={handleColor}
                    >
                      {data.color &&
                        data.color.map((item, index) => {
                          return (
                            <FormControlLabel
                              key={index}
                              value={item.name}
                              control={<Radio sx={{
                                color: filter.code,
                                '&.Mui-checked': {
                                  color: filter.color,
                                },
                              }}/>}
                              label={<FilterLabel filter={item} />}
                            />
                          );
                        })}
                    </RadioGroup>
                  </FormControl> */}
                </div>
              </div>
            </Grid>
          )}
        </>
      )}
    </>
  );
}
