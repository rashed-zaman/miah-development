import React from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export function CashPayment() {
  return (
    <>
      {/* <LocalShippingIcon  /> Cash On Delivery */}
      Cash On Delivery
    </>
  )
}

export function DigitalPayment() {
  return (
    <>
      {/* <CreditCardIcon  /> Digiltal Payment (Debit/credit card) */}
      Card/Mobile Banking
    </>
  )
}
