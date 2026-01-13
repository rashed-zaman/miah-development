import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

Tab;

import { getData } from "../../../../service/common-service/commonService";
import FeatureSlide from "./FeatureSlide";

export default function Feature() {
  // ============ local state ===============
  const initialState = {
    bestSellsProducts: [],
    featuredProducts: [],
    newArrivalProducts: [],
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [featureProducts, setFeatureProducts] = useState(initialState);
  // =============== methods ================
  const getFeatureProducts = () => {
    getData("homeProductList").then((res) => {
      setFeatureProducts(res);
      // console.log(res);
    });
  };

  useEffect(() => {
    getFeatureProducts();
  }, []);

  return (
    <Box
      className="ps-home ps-home--5"
      sx={{ marginTop: { xs: 4 }, marginBottom: { xs: 3, sm: 5 } }}
    >
      <section className="ps-section--tabs">
        <div className="container">
          <TabContext value={value}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab label="Bestsellers" value="1" />
                <Tab label="Featured" value="2" />
                <Tab label="New Arrivals" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <FeatureSlide products={featureProducts?.bestSellsProducts} />
            </TabPanel>
            <TabPanel value="2">
              <FeatureSlide products={featureProducts?.featuredProducts} />
            </TabPanel>
            <TabPanel value="3">
              <FeatureSlide products={featureProducts?.newArrivalProducts} />
            </TabPanel>
          </TabContext>
          {/* <ul className="nav nav-tabs" id="bestsellerTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="bestsellers-tab"
                data-toggle="tab"
                href="#bestsellers"
                role="tab"
                aria-controls="bestsellers"
                aria-selected="true"
              >
                Bestsellers
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="featured-tab"
                data-toggle="tab"
                href="#featured"
                role="tab"
                aria-controls="featured"
                aria-selected="false"
              >
                Featured
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="special-tab"
                data-toggle="tab"
                href="#special"
                role="tab"
                aria-controls="special"
                aria-selected="false"
              >
                New Arrivals
              </a>
            </li>
          </ul>
          <div className="tab-content" id="bestsellerTabContent">
            <div
              className="tab-pane fade show active"
              id="bestsellers"
              role="tabpanel"
              aria-labelledby="bestsellers-tab"
            >
              <FeatureSlide products={featureProducts.bestSellsProducts} />
            </div>
            <div
              className="tab-pane fade"
              id="featured"
              role="tabpanel"
              aria-labelledby="featured-tab"
            >
              <FeatureSlide products={featureProducts.featuredProducts} />
            </div>
            <div
              className="tab-pane fade"
              id="special"
              role="tabpanel"
              aria-labelledby="special-tab"
            >
              <FeatureSlide products={featureProducts.newArrivalProducts} />
            </div>
          </div> */}
        </div>
      </section>
    </Box>
  );
}
