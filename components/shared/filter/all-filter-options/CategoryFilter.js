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
import { setShortOrder } from "../../../../redux/filter/fiterAction";

export default function CategoryFilter({
  data,
  color,
  setCategory,
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
  const handleCategory = (event, newValue) => {
    setCategory(newValue);
    dispatch(setShortOrder(newValue));
    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&occasion=${ocassion}&pattern=${pattern}&size=${size}&color=${color}&fabric=${fabric}&priceRange=${comitedValue}&order=${newValue}&featured=${featured?featured: ""}&bestSelling=${bestSelling?bestSelling: ""}&priceOrder=${priceOrder?priceOrder:""}&styles=${style?style:""}`;
    router.push(url);
  };
  return (
    <>
      {data?.isFilter?.includes("category") && (
        <>
          {type === "mobile" ? (
            <AccordionLayout title="Sort" id="category-id">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={filter.category}
                onChange={handleCategory}
              >
                <FormControlLabel
                  value="DESC"
                  control={<Radio />}
                  label="Newest to Oldest"
                />
                <FormControlLabel
                  value="ASC"
                  control={<Radio />}
                  label="Oldest to Newest"
                />
              </RadioGroup>
            </AccordionLayout>
          ) : (
            <Grid item xs={2}>
              <div className="dropdown">
                <div className="btn-block filter-button" data-toggle="dropdown">
                  <div className="row">
                    <div className="col-9">SHORT</div>
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
                      value={filter.category}
                      onChange={handleCategory}
                    >
                      <FormControlLabel
                        value="DESC"
                        control={<Radio />}
                        label="Newest to Oldest"
                      />
                      <FormControlLabel
                        value="ASC"
                        control={<Radio />}
                        label="Oldest to Newest"
                      />
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
