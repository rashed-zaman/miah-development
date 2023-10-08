import React from "react";
import { useSelector } from "react-redux";
import commonService from "../../../service/menu/commonService";
import Moment from "react-moment";
import Accordion from "@mui/material/Accordion";
import { Card, Box } from "@mui/material";
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
      .catch((err) => {
        if (err.response.status == 401 || "401") {
          localStorage.clear();
          location.reload();
          console.log(err);
        }
      });
  };
  // sideeffects
  React.useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <>
      <h3>Your Canceled Order</h3>
      {allOrdes.map((order, pos) => {
        return (
          <Accordion key={pos}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Grid container spacing={1}>
                <Grid item sm={4} xs={6}>
                  <Typography>order# {order.order_id} </Typography>
                </Grid>
                <Grid item sm={4} sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography>
                    <Moment format="MMMM Do YYYY">{order.invoice_date}</Moment>
                  </Typography>
                </Grid>
                <Grid item sm={4} xs={6}>
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
            </AccordionSummary>
            <AccordionDetails>
              <Card variant="outlined">
                <Grid
                  container
                  spacing={1}
                  sx={{ background: "rgba(0,0,0,0.05)" }}
                  pl={2}
                >
                  <Grid item sm={2} xs={12}>
                    <p className="marginBottomZero">
                      <b>Ordered Placed</b>
                    </p>
                    <Moment format="MMMM Do YYYY">{order.invoice_date}</Moment>
                  </Grid>
                  <Grid item sm={2} xs={6}>
                    <p className="marginBottomZero">
                      <b>Total</b>
                    </p>
                    Tk {order.grand_total}
                  </Grid>
                  <Grid item sm={2} xs={6}>
                    <p className="marginBottomZero">
                      <b>Shipped To</b>
                    </p>
                    {order.customer_name}
                  </Grid>
                  <Grid item sm={2} xs={6}>
                    {/* <button>Details</button> */}
                    {order.delivery_status == "Processing Order" &&
                    order.type != "Cancel" &&
                    order.cancel_request != "order" ? (
                      <p>Cancle Order</p>
                    ) : null}
                    {order.cancel_request == "order" &&
                    order.type != "Cancel" ? (
                      <p>Cancle Request Pendding</p>
                    ) : null}
                    {order.type == "Cancel" ? (
                      <p>
                        {" "}
                        <small
                          style={{
                            background: "#000",
                            color: "#fff",
                            textAlign: "center",
                          }}
                        >
                          Order Cancled
                        </small>
                      </p>
                    ) : null}
                  </Grid>
                  <Grid item sm={2}>
                    <p className="marginBottomZero">Print Invoice</p>
                    <p className="mrY">#{order.order_id}</p>
                  </Grid>
                </Grid>
                <Grid container spacing={1} pl={2} pr={2} pb={2}>
                  <Grid item sm={12} xs={12} mt={1}>
                    {order.order_details.map((product, pos) => {
                      return (
                        <Grid container spacing={1} key={pos} mb={2}>
                          <Grid item sm={2} xs={12}>
                            <Image
                              src={`${IMAGE_URL}m_thumb/${product.p_img}`}
                              alt="Picture of the author"
                              width={300}
                              height={300}
                              layout="responsive"
                            />
                          </Grid>
                          <Grid item sm={5} xs={12}>
                            <Box
                              className="parentMarginZero"
                              sx={{ padding: "2px 10px" }}
                            >
                              <p>{product.product_name}</p>
                              <p>sku: {product.sku}</p>
                              <p>QTY: {product.qty}</p>
                              <p>Unit Price: Tk {product.sales_cost}</p>
                              {product.size ? (
                                <p>Size: {product.size}</p>
                              ) : null}
                              <p>
                                <b> Total: {product.sub_total}</b>
                              </p>
                            </Box>
                          </Grid>
                          <Grid item sm={5} xs={12}>
                            {product.cancel_request == "0" &&
                              order.delivery_status == "Processing Order" &&
                              order.type != "Cancel" &&
                              order.cancel_request != "order" && (
                                <button>Cancle Item</button>
                              )}
                            {product.cancel_request == "1" &&
                              order.delivery_status != "order" &&
                              order.cancel_request != "order" && (
                                <button>Cancel request pendding</button>
                              )}
                            {product.cancel_request == "1" &&
                              order.delivery_status != "order" &&
                              order.cancel_request != "order" && (
                                <button>Cancel request pendding</button>
                              )}
                            {order.delivery_status === "Done" && (
                              <button> Write a product review</button>
                            )}
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Card>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
