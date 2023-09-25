import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";

export default function SizeVariation({
  selectedVariation,
  setSize,
  selectedSizeId,
}) {
  // ==================== local state ================
  const [active, setActive] = useState("");
  // ==================== methods ================
  const selectSize = (size) => {
    setSize(size);
    setActive(size.id);
  };
  // ===========================test===========================
  const [nvalue, setNvalue] = React.useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSize(value);
  };

  useEffect(() => {
    setNvalue(selectedVariation.vSize[0] ? selectedVariation.vSize[0] : null);
  }, [selectedVariation]);

  return (
    <>
      {selectedVariation.vSize.length ? (
        <div className="ps-product__group">
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <h6>Size</h6>
            <div className="ps-product__size ps-select--feature">
              {selectedVariation.vSize.map((size, index) => {
                return (
                  <div key={size.id} className="custom-control">
                    {size.inventory > 0 ? (
                      <label
                        className={
                          selectedSizeId === size.id
                            ? "custom-control-label active-size"
                            : "custom-control-label"
                        }
                        onClick={() => selectSize(size)}
                      >
                        {size.size}
                      </label>
                    ) : (
                      <label className="custom-control-label diabled-size">
                        {size.size}
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </Box>
          <div>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <div className="ps-product__size ps-select--feature">
                <FormControl
                  sx={{ minWidth: { sm: 83, xs: 80 }, mt: -1 }}
                  size="small"
                  hiddenLabel
                >
                  <InputLabel
                    id="demo-controlled-open-select-label"
                    sx={{ color: "#000", fontWeight: "bold" }}
                  >
                    Size
                  </InputLabel>

                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    onChange={handleChange}
                    value={nvalue}
                    label="Size"
                  >
                    {selectedVariation.vSize.map((size) => {
                      return (
                        <MenuItem key={size.id} value={size}>
                          {size.size}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </Box>
          </div>
        </div>
      ) : null}
    </>
  );
}
