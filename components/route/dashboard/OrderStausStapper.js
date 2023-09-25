import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

function OrderStausStapper({status}) {
  // locat state
  const [step, setStep] = React.useState(0)

  // side effet

  React.useEffect(() => {
    // if(status=== 'Pending Shipment' || status === 'Awaiting Delivery' || status === 'Done'){
    //   setStep(2)
    // } else if (status=== 'Awaiting Delivery' || status === 'Done'){
    //   setStep(3)
    // } else if (status === 'Done') {
    //   setStep(4)
    // }

    if(status === 'Done'){
      setStep(4)
    } else if (status=== 'Awaiting Delivery' || status === 'Done'){
      setStep(3)
    } else if (status=== 'Pending Shipment' || status === 'Awaiting Delivery' || status === 'Done') {
      setStep(2)
    }
  }, [status])
  
  return (
    <>
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary aria-controls="panel1a-content">
          <Typography>
            <u>Track Order</u>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stepper activeStep={step} orientation="vertical">
            <Step>
              <StepLabel>PROCESSING ORDER</StepLabel>
            </Step>
            <Step>
              <StepLabel>PENDING SHIPMENT</StepLabel>
            </Step>
            <Step>
              <StepLabel>WAITING FOR DELIVERY</StepLabel>
            </Step>
            <Step>
              <StepLabel>DELIVERED</StepLabel>
            </Step>
          </Stepper>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default OrderStausStapper;
