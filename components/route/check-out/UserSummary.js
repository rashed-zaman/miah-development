import React from "react";
import { Card, Box, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

export default function UserSummary() {
  // hooks
  // const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const route = useRouter()

  return (
    <>
      {userInfo.billingAddress && (
        <Card variant="outlined" sx={{ marginTop: "20px" }}>
          <Box className="parentMarginZero" sx={{ padding: "5px 15px" }}>
            <Box sx={{ display: "flex" }}>
              <p>{userInfo.full_name}</p>
              <IconButton aria-label="Go to account" size="small" onClick={()=>route.push("/dashboard/address-book?id=1")}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
            <p>
              {userInfo.billingAddress.billing_address}-
              {userInfo.billingAddress.billing_zip_code}
            </p>
            <p>Bangladesh</p>
            <p>
              <b>Mobile: {userInfo.phone}</b>
            </p>
          </Box>
        </Card>
      )}
    </>
  );
}
