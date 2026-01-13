import React from 'react';
import OrderHistory from "@/components/route/dashboard/OrderHistory";
import CancleOrder from "@/components/route/dashboard/CancleOrder";
import { Accordion, Box, Card } from '@mui/material';
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export default function ShowOrderHistory() {
  return (
     <>
      <Card sx={{boxShadow: 'none', mt:'60px'}}>
        <Typography variant='h5' sx={{ p: '20px 0px 0px 20px'}}>Order History</Typography>
        <Box sx={{ padding: "50px 20px" }}>
          <Accordion sx={{mt:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Grid item sm={4} xs={6}>
                <Typography variant='h5' sx={{fontSize:{sm:'1.5rem',xs:'1rem'}}}>Order Deliveried</Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "50px 10px", boxShadow:'none'}}>
              <Grid container spacing={1}>
                <Grid>
                  <OrderHistory />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{mt:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Grid item sm={4} xs={6}>
                <Typography variant='h5' sx={{fontSize:{sm:'1.5rem',xs:'1rem'}}}>Order Canceled</Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "50px 10px",boxShadow:'none',}}>
              <Grid container spacing={1}>
                <Grid sx={{ width: '100%'}}>
                  <CancleOrder />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

        </Box>
      </Card>
    </>
  )
}
