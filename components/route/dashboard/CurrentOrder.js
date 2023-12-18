import React from "react";
import { useSelector } from "react-redux";
import commonService from "../../../service/menu/commonService";
import Moment from "react-moment";
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
import { partialrefundDataLayer, refundDataLayer } from "../../../service/data-layer-creator/dataLayerCreator";
import CurrentOrderStatus from "./CurrentOrderStatus";


export default function CurrentOrder() {
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
    refundDataLayer(allOrdes);
    commonService
      .postAuthData("cancelOrder", body, userInfo.token)
      .then((res) => {
        console.log(res);
        getAllOrders();
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(allOrdes);
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
      .then((res) => {
        console.log(res);
        getAllOrders();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // sideeffects
  React.useEffect(() => {
    getAllOrders();
  }, [userInfo]);
    return (
        <>
            {/* <h3>Your Order</h3> */}
            {allOrdes.map((order, pos) => {
                return (
                    <div key={pos}>
                        {order.delivery_status == 'Done' ? null :
                            <>
                                <Accordion>
                                    <AccordionSummary 
                                        aria-controls="panel1a-content">
                                        <Grid container spacing={1} sx={{ backgroundColor: '#fff', p: '5px 0 15px 0', borderRadius: '5px' }}>
                                            <Grid item sm={4}>
                                                <Typography sx={{ fontWeight: 500 }}>
                                                    <Moment format="MMMM Do YYYY">{order.invoice_date}</Moment> | ৳{order.grand_total}
                                                </Typography>
                                                <Typography>Order number# {order.order_id} </Typography>
                                                <Grid container spacing={1}>
                                                    {order.order_details.map((product, prodIndex) => {
                                                        return (
                                                            <Grid item sm={2} xs={3} key={prodIndex}>
                                                                <Image
                                                                    src={`${IMAGE_URL}m_thumb/${product.p_img}`}
                                                                    alt="Picture of the author"
                                                                    width={100}
                                                                    height={100}
                                                                    layout="responsive"
                                                                />
                                                            </Grid>
                                                        );
                                                    })}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails >
                                        <Card variant="outlined">
                                            <Grid
                                                container
                                                spacing={1}
                                                sx={{ background: "rgba(0,0,0,0.05)" }}
                                                pl={2}
                                                pr={1}
                                                pb={1}
                                            >
                                                <Grid item sm={10} xs={6}>
                                                    <p className="mb-0">
                                                        <b>Shipped To</b>
                                                    </p>
                                                    {order.customer_name}
                                                </Grid>
                                                <Grid item sm={2} xs={6} sx={{ marginTop: { xs: "15px" }}}>
                                                    <Link
                                                        target="_blank"
                                                        href={"/order/order-details?orderid=" + order.order_id}
                                                    >
                                                        <a>
                                                            <Button
                                                                fullWidth
                                                                variant="contained"
                                                                size="small"
                                                                sx={{
                                                                    borderColor: "#000",
                                                                    background: "#000",
                                                                    color: "#fff",
                                                                    marginBottom: '5px',
                                                                    "&:hover": {
                                                                        color: "#000",
                                                                        backgroundColor: "#fff",
                                                                        borderColor: "#fff",
                                                                    },
                                                                }}
                                                            >
                                                                Details
                                                            </Button>
                                                        </a>
                                                    </Link>
                                                    {order.delivery_status == "Processing Order" &&
                                                        order.type != "Cancel" &&
                                                        order.cancel_request != "order" ? (
                                                        <Button
                                                            fullWidth
                                                            onClick={() => cancleOrder(order.order_id)}
                                                            variant="outlined"
                                                            size="small"
                                                        >
                                                            Cancle Order
                                                        </Button>
                                                    ) : null}
                                                    {order.cancel_request == "order" &&
                                                        order.type != "Cancel" ? (
                                                        <Button
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            color="error"
                                                        >
                                                            Cancle Request Pendding
                                                        </Button>
                                                    ) : null}
                                                    {order.type == "Cancel" ? <p>Order Cancled</p> : null}
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1} pl={2} pr={2} pb={2}>
                                                <Grid item sm={12}>
                                                    <p>
                                                        Estimate Delivery Date :
                                                        <Moment add={{ days: 7 }} format="MMMM Do YYYY">
                                                            {order.invoice_date}
                                                        </Moment>
                                                        -
                                                        <Moment add={{ days: 15 }} format="MMMM Do YYYY">
                                                            {order.invoice_date}
                                                        </Moment>
                                                    </p>
                                                </Grid>
                                                <Grid item sm={12}></Grid>
                                                <Grid item sm={12} >
                                                    {order.order_details.map((product, i) => {
                                                        return (
                                                            <Grid container spacing={1} key={i} sx={{padding:'8px 0px' }}>
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
                                                                        sx={{
                                                                            padding: "2px 10px",
                                                                            textAlign: { xs: "center", sm: "left" },
                                                                        }}
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
                                                                        order.cancel_request != "order" ? (
                                                                        <Button
                                                                            onClick={() => cancleItem(product)}
                                                                            fullWidth
                                                                            variant="outlined"
                                                                            size="small"
                                                                        >
                                                                            Cancle Item
                                                                        </Button>
                                                                    ) : null}
                                                                    {product.cancel_request == "1" &&
                                                                        order.delivery_status != "order" &&
                                                                        order.cancel_request != "order" ? (
                                                                        <Button
                                                                            fullWidth
                                                                            variant="outlined"
                                                                            size="small"
                                                                            color="error"
                                                                        >
                                                                            Cancel request pendding
                                                                        </Button>
                                                                    ) : null}
                                                                    {order.delivery_status === "Done" ? (
                                                                        <Button fullWidth variant="outlined" size="small">
                                                                            Write a product review
                                                                        </Button>
                                                                    ) : null}
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    })}
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </AccordionDetails>
                                </Accordion>
                                <Grid item sm={12} mt={2} >
                                    <CurrentOrderStatus status={order.delivery_status} />
                                </Grid>
                            </>}

                    </div>
                );
            })}
        </>
    );
}
