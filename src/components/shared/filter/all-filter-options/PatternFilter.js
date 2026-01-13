import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import AccordionLayout from "./AccordionLayout";
import { useRouter } from "next/navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setPatternFilter } from "@/store/filterSlice";



export default function PatternFilter({
  data,
  color,
  setPattern,
  getRoute,
  pattern,
  ocassion,
  fabric,
  category,
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
  const handlePattern = (e) => {
    setPattern(e.target.value);
    dispatch(setPatternFilter(e.target.value));
    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&promoProduct=0&pattern=${e.target.value}&size=${size}&occasion=${ocassion}&color=${e.target.value}&fabric=${fabric}&priceRange=${comitedValue}&order=${category}&featured=${featured?featured: ""}&bestSelling=${bestSelling?bestSelling: ""}&priceOrder=${priceOrder?priceOrder:""}&styles=${style?style:""}`;
    router.push(url);
    // console.log(e.target.value);
  };
  return (
    <>
      {data?.isFilter?.includes("pattern") && (
        <>
          {type === "mobile" ? (
            <AccordionLayout title="pattern" id="color-id">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={filter.pattern}
                  onChange={handlePattern}
                >
                  {data.pattern &&
                    data.pattern.map((item, index) => {
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
                    <div className="col-9">PATTERN</div>
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
                      value={filter.pattern}
                      onChange={handlePattern}
                    >
                      {data.pattern &&
                        data.pattern.map((item, index) => {
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
