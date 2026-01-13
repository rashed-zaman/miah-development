import React from "react";
import AccordionLayout from "./AccordionLayout";
import { Card, Grid } from "@mui/material";
import { IMAGE_URL } from "../../../../service/serviceConfig";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import StyleFilterCard from "../StyleFilterCard";

export default function StyleFilter({
  data,
  size,
  color,
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
  setStyle
}) {
  // =============== hooks ================
  const router = useRouter();

  // destructure props
  const { categoryList, subCategoryList } = data;


  // methods
  const handleStyle = (slug) => {
    const isExist = style.find((item) => item === slug);
    const temStyle = isExist
      ? style.filter((item) => item != slug)
      : [...style, slug];

    const currentUrl = getRoute();
    const url = `${currentUrl}?filter=&promoProduct=0&pattern=${pattern}&occasion=${ocassion}&color=${color}&size=${size}&fabric=${fabric}&priceRange=${comitedValue}&order=${category}&styles=${temStyle}&featured=${featured?featured: ""}&bestSelling${bestSelling?bestSelling: ""}&priceOrder=${priceOrder?priceOrder:""}`;
    router.push(url);

    setStyle(temStyle);
  };

  useEffect(() => {
    setStyle([]);
  }, [getRoute()]);

  return (
    <>
      {categoryList.length > 0 && (
        <AccordionLayout title="Style" id="style-id">
          <Grid container spacing={1}>
            {categoryList.map((cat, index) => {
              return (
                <Grid xs={6} key={index} item>
                  <StyleFilterCard
                    handleStyle={handleStyle}
                    style={style}
                    data={cat}
                  />
                </Grid>
              );
            })}
            {/* {categoryList.map((cat, index) => {
                return (
                <Grid xs={6} key={index} item>
                    <StyleFilterCard
                    handleStyle={handleStyle}
                    style={style}
                    data={cat}
                    />
                </Grid>
                );
            })} */}
          </Grid>
        </AccordionLayout>
      )}
    </>
  );
}
