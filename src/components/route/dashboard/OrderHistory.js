"use client";

import React from "react";
import { useSelector } from "react-redux";
import commonService from "../../../service/menu/commonService";
import moment from "moment";

import Accordion from "@mui/material/Accordion";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { IMAGE_URL } from "../../../service/serviceConfig";
import OrderStausStapper from "./OrderStausStapper";
import { Link } from "@mui/material";

import {
  partialrefundDataLayer,
  refundDataLayer,
} from "../../../service/data-layer-creator/dataLayerCreator";

export default function OrderHistory() {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);

  // state
  const [allOrdes, setAllOrders] = React.useState([]);

  // methods
  const getAllOrders = () => {
    commonService
      .authGetData("orderList", userInfo.token)
      .then((res) => {
        setAllOrders(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const cancleOrder = (id) => {
    const body = {
      orderId: id,
      requestType: "order",
    };
    refundDataLayer(id);
    commonService
      .postAuthData("cancelOrder", body, userInfo.token)
      .then(() => getAllOrders())
      .catch((error) => console.log(error));
  };

  const cancleItem = (product) => {
    const body = {
      orderId: product.order_id,
      order_item_id: product.id,
      sku_id: product.sku_id,
      sku: product.sku,
      requestType: "partial",
    };
    partialrefundDataLayer(product);
    commonService
      .postAuthData("cancelOrder", body, userInfo.token)
      .then(() => getAllOrders())
      .catch((error) => console.log(error));
  };

  // side effects
  React.useEffect(() => {
    getAllOrders();
  }, [userInfo]);

  return (
    <>
      {allOrdes.map((order, pos) => (
        <div key={pos}>
          {order.delivery_status === "Done" && (
            <Accordion sx={{ marginLeft: "8px", marginBottom: "5px" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container spacing={1}>
                  <Grid item sm={4} xs={4}>
                    <Typography>Order# {order.order_id}</Typography>
                  </Grid>
                  <Grid
                    item
                    sm={4}
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    <Typography>
                      {moment(order.invoice_date).format("MMMM Do YYYY")}
                    </Typography>
                  </Grid>
                  <Grid item sm={4} xs={8}>
                    <Typography
                      sx={{
                        background: "#000",
                        color: "#fff",
                        textAlign: "center",
                        marginRight: "5px",
                      }}
                    >
                      {order.delivery_status}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>

              <AccordionDetails sx={{ padding: "0px" }}>
                <Card variant="outlined">
                  <Grid
                    container
                    spacing={1}
                    sx={{ background: "rgba(0,0,0,0.05)" }}
                    pl={2}
                    pr={1}
                    pb={1}
                  >
                    <Grid item sm={2} xs={6}>
                      <p className="mb-0">
                        <b>Ordered Placed</b>
                      </p>
                      {moment(order.invoice_date).format("MMMM Do YYYY")}
                    </Grid>

                    <Grid item sm={2} xs={6}>
                      <p className="mb-0">
                        <b>Total</b>
                      </p>
                      Tk {order.grand_total}
                    </Grid>

                    <Grid item sm={2} xs={6}>
                      <p className="mb-0">
                        <b>Shipped To</b>
                      </p>
                      {order.customer_name}
                    </Grid>

                    <Grid item sm={3} xs={6}>
                      <Link
                        target="_blank"
                        href={`/order/order-details?orderid=${order.order_id}`}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          size="small"
                          sx={{
                            background: "#000",
                            color: "#fff",
                            marginBottom: "5px",
                            "&:hover": {
                              color: "#000",
                              backgroundColor: "#fff",
                            },
                          }}
                        >
                          Details
                        </Button>
                      </Link>
                    </Grid>

                    <Grid item sm={2}>
                      <p className="mb-0">Invoice</p>
                      <h5 className="m-0">#{order.order_id}</h5>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} pl={2} pr={2} pb={2}>
                    <Grid item sm={12} mt={2}>
                      <OrderStausStapper status={order.delivery_status} />
                    </Grid>

                    <Grid item sm={12}>
                      <p>
                        Estimate Delivery Date :
                        {moment(order.invoice_date)
                          .add(7, "days")
                          .format("MMMM Do YYYY")}
                        {" - "}
                        {moment(order.invoice_date)
                          .add(15, "days")
                          .format("MMMM Do YYYY")}
                      </p>
                    </Grid>

                    <Grid item sm={12}>
                      {order.order_details.map((product, index) => (
                        <Grid container spacing={1} key={index}>
                          <Grid item sm={2} xs={12}>
                            <Image
                              src={`${IMAGE_URL}m_thumb/${product.p_img}`}
                              alt={product.product_name}
                              width={300}
                              height={300}
                            />
                          </Grid>

                          <Grid item sm={5} xs={12}>
                            <Box sx={{ padding: "2px 10px" }}>
                              <p>{product.product_name}</p>
                              <p>SKU: {product.sku}</p>
                              <p>QTY: {product.qty}</p>
                              <p>Unit Price: Tk {product.sales_cost}</p>
                              <p>
                                <b>Total: {product.sub_total}</b>
                              </p>
                            </Box>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Card>
              </AccordionDetails>
            </Accordion>
          )}
        </div>
      ))}
    </>
  );
}
