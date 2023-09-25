import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grid from "@mui/material/Grid";
import FilterOptions from "./FilterOptions";

export default function DesktopFilter({ data, setMobileFilter }) {
  return (
    <div id="desktop-filter">
      <Grid container spacing={2}>
        <FilterOptions data={data} type="desktop" setMobileFilter={setMobileFilter} />
        {/* <ColorFilter data={data} /> */}
        
        {/* <Grid item xs={2}>
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
              className="dropdown-menu"
              style={{ width: "100%", marginTop: "0px", borderRadius: "0px" }}
            >
              <a className="dropdown-item" href="#">
                Link 1
              </a>
              <a className="dropdown-item" href="#">
                Link 2
              </a>
              <a className="dropdown-item" href="#">
                Link 3
              </a>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="dropdown">
            <div className="btn-block filter-button" data-toggle="dropdown">
              <div className="row">
                <div className="col-9">SHOR BY</div>
                <div className="col-3 text-right">
                  <KeyboardArrowDownIcon />
                </div>
              </div>
            </div>
            <div
              className="dropdown-menu"
              style={{ width: "100%", marginTop: "0px", borderRadius: "0px" }}
            >
              <a className="dropdown-item" href="#">
                Link 1
              </a>
              <a className="dropdown-item" href="#">
                Link 2
              </a>
              <a className="dropdown-item" href="#">
                Link 3
              </a>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="dropdown">
            <div className="btn-block filter-button" data-toggle="dropdown">
              <div className="row">
                <div className="col-9">MORE FILTER</div>
                <div className="col-3 text-right">
                  <KeyboardArrowDownIcon />
                </div>
              </div>
            </div>
            <div
              className="dropdown-menu"
              style={{ width: "100%", marginTop: "0px", borderRadius: "0px" }}
            >
              <a className="dropdown-item" href="#">
                Link 1
              </a>
              <a className="dropdown-item" href="#">
                Link 2
              </a>
              <a className="dropdown-item" href="#">
                Link 3
              </a>
            </div>
          </div>
        </Grid> */}
      </Grid>
    </div>
  );
}
