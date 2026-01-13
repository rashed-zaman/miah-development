import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import AccordionLayout from "./AccordionLayout";
import { useRouter } from "next/navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setFabricFilter } from "@/store/filterSlice";



export default function FabricFilter({
  data,
  color,
  setFabric,
  getRoute,
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
  const handleFabric = (e) => {
    setFabric(e.target.value);
    dispatch(setFabricFilter(e.target.value));
    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&promoProduct=0&occasion=${ocassion}&color=${color}&size=${size}&fabric=${e.target.value}&priceRange=${comitedValue}&order=${category}&featured=${featured?featured: ""}&bestSelling=${bestSelling?bestSelling: ""}&priceOrder=${priceOrder?priceOrder:""}&styles=${style?style:""}`;
    router.push(url);
  };
  return (
    <>
      {data?.isFilter?.includes("fabrics") && (
        <>
          {type === "mobile" ? (
            <AccordionLayout title="Fabric" id="fabric-id">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={filter.fabric}
                onChange={handleFabric}
              >
                {data.fabrics &&
                  data.fabrics.map((item) => {
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
            </AccordionLayout>
          ) : (
            <Grid item xs={2}>
              <div className="dropdown">
                <div className="btn-block filter-button" data-toggle="dropdown">
                  <div className="row">
                    <div className="col-9">FABRIC</div>
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
                      value={filter.fabric}
                      onChange={handleFabric}
                    >
                      {data.fabrics &&
                        data.fabrics.map((item, index) => {
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
