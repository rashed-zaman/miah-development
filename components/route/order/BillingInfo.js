import React from "react";

function BillingInfo({ orderDetails }) {
  return (
    <>
      {orderDetails ? (
        <div style={{ padding: "0 15px" }}>
          <p>
            <b>Billing Address</b>
          </p>
          <div>
            <h5 className="mb-0">{orderDetails.customer_name}</h5>
            <h5 className="mb-0">{orderDetails.phone}</h5>
            <h5 dangerouslySetInnerHTML={{ __html: orderDetails.b_address }} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default BillingInfo;
