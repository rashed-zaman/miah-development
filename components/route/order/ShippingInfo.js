import React from "react";

function ShippingInfo({ orderDetails }) {
  return (
    <>
      {orderDetails ? (
        <div>
          <p>
            {" "}
            <b>Shipping Address</b>
          </p>
          <div>
            <h5 className="mb-0">{orderDetails.shipping_cust_name}</h5>
            <h5 className="mb-0">{orderDetails.s_phone}</h5>
            <h5 dangerouslySetInnerHTML={{ __html: orderDetails.s_address }} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ShippingInfo;
