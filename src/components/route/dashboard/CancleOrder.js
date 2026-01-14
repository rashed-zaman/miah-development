"use client";

import React from "react";
import { useSelector } from "react-redux";
import commonService from "../../../service/menu/commonService";
import moment from "moment";

import Accordion from "@mui/material/Accordion";
import { Card, Box, Container } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { IMAGE_URL } from "../../../service/serviceConfig";

export default function CancleOrder() {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);

  // state
  const [allOrdes, setAllOrders] = React.useState([]);

  // methods
  const getAllOrders = () => {
    commonService
      .authGetData("CancelOrderList", userInfo.token)
      .then((res) => {
        setAllOrders(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  // side effects
  React.useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      {allOrdes.map((order, pos) => (
        <Accordion key={pos} sx={{ marginLeft: "8px", marginBottom: "5px" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Container>
            <Grid container spacing={1}>
              <Grid  size={{ md: 4, xs: 6 }}>
                <Typography>order# {order.order_id}</Typography>
              </Grid>

              <Grid  size={{ md: 4 }} sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography>
                  {moment(order.invoice_date).format("MMMM Do YYYY")}
                </Typography>
              </Grid>

              <Grid  size={{ md: 4, xs: 6 }}>
                <Typography
                  sx={{
                    background: "#000",
                    color: "#fff",
                    textAlign: "center",
                    marginRight: "5px",
                  }}
                >
                  Canceled
                </Typography>
              </Grid>
            </Grid>
          </Container>
          </AccordionSummary>

          <AccordionDetails>
            <Card variant="outlined">
              <Grid
                container
                spacing={1}
                sx={{ background: "rgba(0,0,0,0.05)" }}
                pl={2}
              >
                <Grid  size={{ md: 2, xs: 12 }}>
                  <p className="marginBottomZero">
                    <b>Ordered Placed</b>
                  </p>
                  {moment(order.invoice_date).format("MMMM Do YYYY")}
                </Grid>

                <Grid  size={{ md: 2, xs: 6 }}>
                  <p className="marginBottomZero">
                    <b>Total</b>
                  </p>
                  Tk {order.grand_total}
                </Grid>

                <Grid size={{sm:2, xs:6}}>
                  <p className="marginBottomZero">
                    <b>Shipped To</b>
                  </p>
                  {order.customer_name}
                </Grid>

                <Grid  size={{sm:2, xs:6}}>
                  {order.delivery_status === "Processing Order" &&
                  order.type !== "Cancel" &&
                  order.cancel_request !== "order" ? (
                    <p>Cancel Order</p>
                  ) : null}

                  {order.cancel_request === "order" &&
                  order.type !== "Cancel" ? (
                    <p>Cancel Request Pending</p>
                  ) : null}

                  {order.type === "Cancel" ? (
                    <p>
                      <small
                        style={{
                          background: "#000",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Order Canceled
                      </small>
                    </p>
                  ) : null}
                </Grid>

                <Grid  size={{sm:2}}>
                  <p className="marginBottomZero">Print Invoice</p>
                  <p className="mrY">#{order.order_id}</p>
                </Grid>
              </Grid>

              <Grid container spacing={1} pl={2} pr={2} pb={2}>
                <Grid  mt={1} size={{sm:12}}>
                  {order.order_details.map((product, pos) => (
                    <Grid container spacing={1} key={pos} mb={2}>
                      <Grid  size={{ md: 2, xs: 12 }}>
                        <Image
                          src={`${IMAGE_URL}m_thumb/${product.p_img}`}
                          alt={product.product_name}
                          width={100}
                          height={100}
                        />
                      </Grid>

                      <Grid  size={{ md: 5, xs: 12 }}>
                        <Box sx={{ padding: "2px 10px" }}>
                          <p className="my-0">{product.product_name}</p>
                          <p className="my-0">sku: {product.sku}</p>
                          <p className="my-0">QTY: {product.qty}</p>
                          <p className="my-0">Unit Price: Tk {product.sales_cost}</p>
                          {product.size && <p>Size: {product.size}</p>}
                          <p className="my-0">
                            <b>Total: {product.sub_total}</b>
                          </p>
                        </Box>
                      </Grid>

                      <Grid size={{ md: 5, xs: 12 }}>
                        {product.cancel_request === "0" &&
                          order.delivery_status === "Processing Order" &&
                          order.type !== "Cancel" &&
                          order.cancel_request !== "order" && (
                            <button>Cancel Item</button>
                          )}

                        {product.cancel_request === "1" &&
                          order.cancel_request !== "order" && (
                            <button>Cancel request pending</button>
                          )}

                        {order.delivery_status === "Done" && (
                          <button>Write a product review</button>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
