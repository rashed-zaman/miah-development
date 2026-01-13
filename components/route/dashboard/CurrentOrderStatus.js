import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

function CurrentOrderStatus({status}) {
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
      <Accordion sx={{ boxShadow: "none", backgroundColor: "transparent", padding:'0px 0px', "&.MuiAccordion-root:before": {
      backgroundColor: "white"
    }}}>
        <AccordionSummary aria-controls="panel1a-content" sx={{padding:'0px 0px'}}>
          <Typography sx={{fontWeight:500}}>
            <u>TRACK THE ORDER</u>
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

export default CurrentOrderStatus;
