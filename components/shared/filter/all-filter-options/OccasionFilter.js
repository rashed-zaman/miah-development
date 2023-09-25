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

import { setOccasionFilter } from "../../../../redux/filter/fiterAction";

export default function OccasionFilter({
  data,
  color,
  setoccasion,
  getRoute,
  ocassion,
  fabric,
  category,
  comitedValue,
  type,
}) {
  // =============== hooks ================
  const router = useRouter();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  // =============== methods ================
  const handleOccasion = (e) => {
    setoccasion(e.target.value);
    dispatch(setOccasionFilter(e.target.value));
    const currentUrl = getRoute();

    const url = `${currentUrl}?filter=&occasion=${e.target.value}&color=${color}&fabric=${fabric}&priceRange=${comitedValue}&order=${category}`;
    router.push(url);
  };
  return (
    <>
      {data?.isFilter?.includes("occasion") && (
        <>
          {type === "mobile" ? (
            <AccordionLayout title="occasions" id="occation-id">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={filter.ocassion}
                  onChange={handleOccasion}
                >
                  {data.occasion &&
                    data.occasion.map((item) => {
                      return (
                        <FormControlLabel
                          key={item.id}
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
                    <div className="col-9">OCCASION</div>
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
                      value={filter.ocassion}
                      onChange={handleOccasion}
                    >
                      {data.occasion &&
                        data.occasion.map((item, index) => {
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
