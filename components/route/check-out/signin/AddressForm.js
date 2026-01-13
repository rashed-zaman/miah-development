import React from 'react'
import CardContaier from '../CardContaier';
import Billing from '../Billing';
import {
    Box,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Grid,
    Card
  } from "@mui/material";
import Shipping from '../Shipping';
export default function AddressForm({chekout, handleShippingCharge, hasShipping, handleHasShipping}) {

  return (
    <>
      {chekout ? (
            <Card>
              <CardContaier titleTypographyProps={{fontSize: 122}} title="Billing Details">
                <Billing handleShippingCharge={handleShippingCharge} />
                <Box px={2}>
                  <Grid container spacing={2}>
                    <Grid item sm={7} md={6} xs={12}>
                      <FormGroup>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={hasShipping}
                                onChange={handleHasShipping}
                            />
                            }
                            label="Ship to a different address ?"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Box>
                {hasShipping ? (
                    <Shipping handleShippingCharge={handleShippingCharge} />
                ) : null}
              </CardContaier>
        </Card>
        ):null
      }
    </>
  )
}
