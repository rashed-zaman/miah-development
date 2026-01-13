"use client";

import React from "react";
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Image from "next/image";
import { IMAGE_URL } from "../../../../service/serviceConfig";

import { MiahButton } from "../../../core/button/MiahButton";
import { useRouter } from "next/navigation"; // <-- Next 15

export default function ItemAddedToBag({
  dialog,
  cutFabQty,
  selectedVariation,
  product,
  sku,
  item,
  setDialog,
}) {
  const router = useRouter(); // Next 15 router

  // ============= methods =============
  const handleDialogClose = () => {
    setDialog(false);
  };

  const goToCheckout = () => {
    setDialog(false);
    router.push("/checkout"); // works the same in Next 15
  };

  return (
    <Dialog
      open={dialog}
      onClose={handleDialogClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <small>
          <b>Successfully Added To Your Bag</b>
        </small>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Image
              src={`${IMAGE_URL}${selectedVariation.vImage[0].img}`}
              alt="Picture of the product"
              width={300}
              height={300}
              layout="responsive"
              placeholder="blur"
              blurDataURL="/homeAsset/bckgnd.png"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <p className="marginBottomZero marginTopZero">
              <b>{product.name}</b>
            </p>
            <p className="marginBottomZero marginTopZero">
              <b>sku : </b> {sku.sku}
            </p>
            {item?.size && (
              <p className="marginBottomZero marginTopZero">
                <b>size : </b> {item.size}
              </p>
            )}
            <p className="marginBottomZero marginTopZero">
              <b>Unit Price : </b>Tk {product.sales_cost}
            </p>
            <p className="marginBottomZero marginTopZero">
              {Number(product.category_id) === 7 ? (
                <span>
                  <b>Quantity : </b>
                  {cutFabQty}
                </span>
              ) : (
                <span>
                  <b>Quantity : </b> {item && item.qty}
                </span>
              )}
            </p>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-12 my-1">
              <MiahButton size="small" methodFromParent={handleDialogClose}>
                Continue Shopping
              </MiahButton>
            </div>
            <div className="col-md-6 col-12 my-1">
              <MiahButton size="small" methodFromParent={goToCheckout}>
                Checkout
              </MiahButton>
            </div>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
}
