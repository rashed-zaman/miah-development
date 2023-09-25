import React, { useState } from "react";
import { Box } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { MiahCupponButton } from "../../core/button/MiahButton";
import commonService from "../../../service/menu/commonService";
import { useDispatch, useSelector } from "react-redux";
import { setCoupon, setCredit } from "../../../redux/checkout/checkoutActions";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import { axiosCredential } from "../../../service/serviceConfig";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { Button } from "@mui/material";


export default function CouponCard() {
  // =============hooks===============
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const couponDiscountObj = useSelector((state) => state.checkout.coupon);
  const credit = useSelector((state) => state.checkout.credit);
  const totalAmount = useSelector((state) =>
    state.shoppingBag.shoppingCart.reduce((a, b) => a + (b.amount || 0), 0)
  );
  // console.log(credit);
  // ==============state===============
  const [couponCode, setCouponCode] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [couponError, setCouponError] = useState("");
  const [creditError, setCreditError] = useState("");
  const [avilableCreditAmount, setAvilableCreditAmount] = useState(0);

  // ==============methods============

  const handleDelete = () => {
    dispatch(
      setCoupon({
        code: "",
        discountAmount: 0,
      }) 
    );
    setCouponError("");
  };

  const handleOnChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleCreditAmount = (event) => {
    setCreditAmount(event.target.value);
  };

  const handleDeleteCredit = () => {
    dispatch(
      setCredit({
        amount: 0,
        creditAmountApply: false,
      })
    );
  };

  const submitCoupon = () => {
    if (couponCode !== "") {
      setCouponError("");
      const body = {
        subTotal: totalAmount,
        couponCode: couponCode,
      };

      axiosCredential.get("sanctum/csrf-cookie").then((res) => {
        commonService
          .postAuthData("couponDiscount", body, userInfo.token)
          .then((response) => {
            if (response.data.status === 1) {
              dispatch(
                setCoupon({
                  code: couponCode,
                  discountAmount: response.data.discount,
                })
              );
              setCouponCode("");
            } else {
              dispatch(setCoupon({ code: "", discountAmount: 0 }));
              setCouponError(response.data.msg);
              setCouponCode("");
            }
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };

  const submitCredit = () => {
    setCreditError("");
    const body = {
      amount: creditAmount,
      creditAmountApply: true,
    };

    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      commonService
        .postAuthData("check_creditAmount", body, userInfo.token)
        .then((response) => {
          if (response.data.status === 1) {
            dispatch(
              setCredit({
                amount: creditAmount,
                creditAmountApply: true,
              })
            );
            setCreditAmount("");
          } else {
            console.log(response.data);
            dispatch(setCredit({ amount: 0, creditAmountApply: false }));
            setCreditError(response.data.msg);
            setCreditAmount("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
  };

  const getRewards = () => {
    commonService
      .authGetData("rewardPoint", userInfo.token)
      .then((res) => {
        setAvilableCreditAmount(res.data.credit_amount);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userInfo?.token && getRewards();
  }, []);

  useEffect(() => {
    dispatch(
      setCredit({
        amount: 0,
        creditAmountApply: false,
      })
    );
  }, []);
  return (
    <>
     <Box sx={{boxShadow:{sm:'none', xs:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}, p:{xs:1,sm:'none', borderRadius:{sm:'none',xs:'5px'}}}}>
        <Accordion sx={{boxShadow:'none',"& .Mui-expanded":{
          margin:'0px 0'
        },"& .MuiAccordion-root.Mui-expanded": {
          m:0,
          minHeight:'62px'
        }}}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{minHeight:21,"& .MuiAccordionSummary-contentGutters" :{
              margin:'0px 0' 
            },'& .Mui-expanded':{
              margin:'0px 0 !important' 
            }}}
          >  
            <small style={{ margin: "0px"}} >
              {/* Apply Points/Credits/Gift Card */}
              <Grid item xs={12} sm={12}>
                <LoyaltyIcon/>
                 Have a cupon?
              </Grid>
            </small>
          </AccordionSummary>
          <AccordionDetails sx={{padding:'0 16px 0'}}>
            <Box sx={{border: 'none', margin: "0px"}}>
                <b>
                  <small>Coupon</small>
                </b>
              <p style={{ margin: "0px", marginBottom: "0px" }}>
              </p>
              <Grid container justifyContent="center" spacing={1}>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      value={couponCode}
                      onChange={handleOnChange}
                      fullWidth
                      size="small"
                      label="Enter Coupon"
                      variant="outlined"
                    />
                    <div>
                      <p className="textCenter text-danger">{couponError}</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    
                    <MiahCupponButton methodFromParent={submitCoupon}>Submit</MiahCupponButton>
                    {/* <Button variant="contained" methodFromParent={submitCoupon}>Submit</Button> */}
                  </Grid>
                <Grid item xs={12} sm={6}>
                  {couponDiscountObj.code.length ? (
                    <Chip
                      label={couponDiscountObj.code + " is applyed"}
                      onDelete={handleDelete}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
          {
            userInfo.token?(
              <Accordion sx={{boxShadow:'none', '&:before': {
                display: 'none',
            }, "& .Mui-expanded":{
              margin:'0px 0'
            },"& .MuiAccordion-root.Mui-expanded": {
              m:0,
              minHeight:'62px'
            }}} >
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{minHeight:21,"& .MuiAccordionSummary-contentGutters" :{
                margin:'0px 0' 
              },'& .Mui-expanded':{
                margin:'0px 0 !important' 
              }}}
            >
              <small style={{ margin: "0px" }}>
                <Grid item xs={12} sm={12}>
                  <CreditScoreIcon/>
                 Apply your credit?
                </Grid>
              </small>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <p style={{ margin: "0px", marginBottom: "0px" }}>
                  <b>
                    <small>Credit</small>
                  </b>
                </p>
                <Grid container justifyContent="center" spacing={1}>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      value={creditAmount}
                      onChange={handleCreditAmount}
                      fullWidth
                      type="number"
                      size="small"
                      label="Enter Credit Amount"
                      variant="outlined"
                    />
                    <div>
                      <p className="textCenter text-danger">{creditError}</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <MiahCupponButton methodFromParent={submitCredit}>Apply Credit</MiahCupponButton>
                    {/* <MiahCupponButton methodFromParent={submitCredit}>Apply Credit</MiahCupponButton> */}
                    {/* <MiahButton methodFromParent={submitCredit}>
                      Apply Credit
                    </MiahButton> */}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {credit.creditAmountApply && (
                      <Chip
                        label={credit.amount + " Tk Applied"}
                        onDelete={handleDeleteCredit}
                      />
                    )}
                    {/* {credit.amount} Credit is Applied */}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    *Available Credit Amount is {avilableCreditAmount} Tk
                  </Grid>
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
            ):null
          }
     </Box>
    </>
  );
}
