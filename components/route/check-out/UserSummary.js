import React from "react";
import { Card, Box} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

export default function UserSummary() {
  
    // hooks
    // const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <>
      <Card variant="outlined" sx={{ marginTop: "20px" }}>
        <Box className="parentMarginZero" sx={{ padding: "5px 15px" }}>
          <p>{userInfo.full_name}</p>             
          <p>{userInfo.billingAddress.billing_address}-{userInfo.billingAddress.billing_zip_code}</p>             
          <p>Bangladesh</p>
          <p>
            <b>Mobile: {userInfo.phone}</b>
          </p>
        </Box>
      </Card>
    </>
  )
}
