import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import AccordionLayout from "./AccordionLayout";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import { setSizeFilter } from "../../../../redux/filter/fiterAction";

export default function SizeFilter({
  data,
  size,
  color,
  setSize,
  getRoute,
  ocassion,
  fabric,
  category,
  pattern,
  comitedValue,
  type,
}) {
  
  // =============== hooks ================
  const router = useRouter();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  // =============== methods ================
  const handleSize = (e) => {
    setSize(e.target.value);
    dispatch(setSizeFilter(e.target.value));
    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&promoProduct=0&pattern=${pattern}&occasion=${ocassion}&color=${color}&size=${e.target.value}&fabric=${fabric}&priceRange=${comitedValue}&order=${category}`;
    router.push(url);
  };

  return (
    <>
      {data?.isFilter?.includes("size") && (
        <>
          {type === "mobile" ? (
            <AccordionLayout title="Size" id="size-id">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={filter.size}
                  onChange={handleSize}
                >
                  {data.size &&
                    data.size.map((item, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          value={item.name}
                          control={<Radio />}
                          label={item.name}
                        />
                      );
                    })}
                </RadioGroup>
              </FormControl>
            </AccordionLayout>
          ) : (
            <Grid item xs={2}>
              <div className="dropdown">
                <div className="btn-block filter-button" data-toggle="dropdown">
                  <div className="row">
                    <div className="col-9">SIZE</div>
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
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={filter.size}
                      onChange={handleSize}
                    >
                      {data.size &&
                        data.size.map((item, index) => {
                          return (
                            <FormControlLabel
                              key={index}
                              value={item.name}
                              control={<Radio />}
                              label={item.name}
                            />
                          );
                        })}
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </Grid>
          )}
        </>
      )}
    </>
  );
}
