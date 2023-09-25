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
import { useRouter } from "next/router";

export default function ItemAddedToBag({
  dialog,
  cutFabQty,
  selectedVariation,
  product,
  sku,
  item,
  setDialog,
}) {
  const router = useRouter();
  // ============= methods =============
  const handleDialogClose = () => {
    setDialog(false);
  };
  const goToCheckout = () => {
    setDialog(false);
    router.push("/checkout");
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
        {
          <small>
            <b>Successfully Added To Your Bag</b>
          </small>
        }
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <Image
              src={`${IMAGE_URL}${selectedVariation.vImage[0].img}`}
              alt="Picture of the author"
              width={300}
              height={300}
              layout="responsive"
              placeholder="blur"
              blurDataURL="/homeAsset/bckgnd.png"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <p className="marginBottomZero marginTopZero">
              <b>{product.name}</b>
            </p>
            <p className="marginBottomZero marginTopZero">
              <b>sku : </b> {sku.sku}
            </p>
            {item?.size? (
              <p className="marginBottomZero marginTopZero">
                <b>size : </b> {item.size}
              </p>
            ):
            null}
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
        <Grid container justifyContent="end" spacing={1}>
          <Grid item sm={12} xs={12}>
            <Grid container justifyContent="end" spacing={2}>
              <Grid item sm={6} xs={12}>
                <MiahButton size="small" methodFromParent={handleDialogClose}>
                  Continue Shopping
                </MiahButton>
              </Grid>
              <Grid item sm={6} xs={12}>
                <MiahButton size="small" methodFromParent={goToCheckout}>
                  Checkout
                </MiahButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
