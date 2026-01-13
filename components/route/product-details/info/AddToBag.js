import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";

import { addToBag } from "../../../../redux/shoppingBag/shoppingBagActions";
import {
  stockStatus,
  createItem,
} from "../../../../service/order-service/orderService";
import ItemQty from "./ItemQty";
import { useRouter } from "next/router";

import { addBagDataLayer } from "../../../../service/data-layer-creator/dataLayerCreator";
import commonService from "../../../../service/menu/commonService";
import { sendtCartToSave } from "../../../../service/cart-service/cartService";
import { Grid } from "@mui/material";
// import ItemAddedToBag from "../item-added-to-bag/ItemAddedToBag";

const ItemAddedToBag = dynamic(() =>
  import("../item-added-to-bag/ItemAddedToBag")
);

export default function AddToBag({ product, selectedVariation, sku, size }) {
  // ==================
  // hooks
  // ==================
  const router = useRouter();
  const dispatch = useDispatch();
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const userInfo = useSelector((state) => state.auth.userInfo);

  // =================
  // local state
  // =================
  const [cutFabricDescription, setCutFabricDescription] = useState("");
  const [cutFabQty, setCutFabQty] = useState(1);
  const [itemQty, setItemQty] = useState(1);
  const [isSizeSelected, setIsSizeSelected] = useState(true);
  const [isOutofStock, setOutofStock] = useState(false);
  const [item, setItem] = useState(null);
  const [bntloading, setBntloading] = useState(false);
  const [dialog, setDialog] = useState(false);

  // ==================
  // methods
  // ==================
  const handleCutFabricDescription = (e) => {
    const { value } = e.target;
    setCutFabricDescription(value);
  };

  const increaseQty = () => {
    setCutFabQty((prv) => prv + 1);
  };

  const decreaseQty = () => {
    setCutFabQty((prv) => (prv > 1 ? prv - 1 : prv));
  };

  const checkStock = async (prodExist, type) => {
    const body = {
      sku: sku.sku,
      qty: type === "old" ? prodExist.qty + itemQty : itemQty,
    };
    await stockStatus(body).then((res) => {
      if (res.status === true) {
        const item = createItem(
          product,
          sku,
          selectedVariation,
          size,
          cutFabQty,
          cutFabricDescription,
          itemQty
        );
        dispatch(addToBag(item));
        addBagDataLayer(item);
        setItem(item);
        setDialog(true);
        setBntloading(false);
        // commonService.sendtCartToSave(shoppingBag, userInfo.token)
        // sendtCartToSave(shoppingBag, userInfo.token)
      } else {
        setOutofStock(true);
        setBntloading(false);
      }
    });
  };

  // ===============
  // side effect
  // ===============

  useEffect(() => {
    size !== "" && setIsSizeSelected(true);
  }, [size]);

  const addItemToBag = () => {
    if (selectedVariation.vSize.length && size == "") {
      setIsSizeSelected(false);
      return;
    }
    setOutofStock(false);
    setBntloading(true);
    const isProductExist = shoppingBag.find((item) => item.id === sku.sku);
    if (isProductExist) {
      checkStock(isProductExist, "old");
    } else {
      checkStock(isProductExist, "new");
      // const item = createItem(
      //   product,
      //   sku,
      //   selectedVariation,
      //   size,
      //   cutFabQty,
      //   cutFabricDescription
      // );
      // dispatch(addToBag(item));
      // setItem(item);
      // setBntloading(false);
      // setDialog(true);
    }
  };
  useEffect(() => {
    setItemQty(1);
    setOutofStock(false);
  }, [router.asPath, selectedVariation]);

  return (
    <>
      {product.category_id === 7 ? (
        <div>
          <Grid container>
            <Grid item xs={7} sm={12} sx={{ textAlign: "left" }}>
              <button onClick={decreaseQty} className="qty-btn">
                -
              </button>
              <span className="qty-value">{cutFabQty}</span>
              <button onClick={increaseQty} className="qty-btn">
                +
              </button>
              <span>Yard</span>
            </Grid>
            <Grid item xs={5} sm={12}>
              <div>
                <label>Fabric Description</label>
              </div>
              <textarea
                cols="19"
                rows="2"
                onChange={handleCutFabricDescription}
                value={cutFabricDescription}
              ></textarea>
            </Grid>
          </Grid>
        </div>
      ) : (
        <ItemQty itemQty={itemQty} setItemQty={setItemQty} />
      )}

      {selectedVariation.vSize.length > 0 ? (
        <>
          {bntloading ? (
            <button className="ps-btn ps-btn--rounded ps-product__buy">
              PROCESSING
            </button>
          ) : (
            <button
              className="ps-btn ps-btn--rounded ps-product__buy "
              onClick={addItemToBag}
            >
              ADD TO BAG
            </button>
          )}
        </>
      ) : (
        <>
          {selectedVariation.inventory > 0 ? (
            <>
              {product.category_id === 7 ? (
                <>
                  {bntloading ? (
                    <button className="ps-btn ps-btn--rounded ps-product__buy w-full">
                      PROCESSING
                    </button>
                  ) : (
                    <button
                      className="ps-btn ps-btn--rounded ps-product__buy w-full"
                      onClick={addItemToBag}
                    >
                      ADD TO BAG
                    </button>
                  )}
                </>
              ) : (
                <>
                  {bntloading ? (
                    <button className="ps-btn ps-btn--rounded ps-product__buy">
                      PROCESSING
                    </button>
                  ) : (
                    <button
                      className="ps-btn ps-btn--rounded ps-product__buy"
                      onClick={addItemToBag}
                    >
                      ADD TO BAG
                    </button>
                  )}
                </>
              )}
            </>
          ) : (
            <button className="ps-btn ps-btn--rounded ps-product__buy ps-product__buy__disabled">
              OUT OF STOCK
            </button>
          )}
        </>
      )}
      <div>
        {isOutofStock && <span className="my-2 text-danger">Out of stock</span>}
      </div>
      {!isSizeSelected && (
        <p className="pb-2 text-danger">Please select your size</p>
      )}
      <ItemAddedToBag
        dialog={dialog}
        setDialog={setDialog}
        selectedVariation={selectedVariation}
        product={product}
        sku={sku}
        cutFabQty={cutFabQty}
        item={item}
      />
    </>
  );
}
