import React from "react";
import { Card, Box, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

export default function UserSummary({ defaultAddress }) {
  // hooks
  // const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const route = useRouter();
  return (
    <>
      <Card variant="outlined" sx={{ marginTop: "20px" }}>
        <Box className="parentMarginZero" sx={{ padding: "5px 15px" }}>
          <Box sx={{ display: "flex" }}>
            <p>{userInfo.full_name}</p>
            <IconButton
              aria-label="Go to account"
              size="small"
              onClick={() => route.push("/dashboard/address-book?id=1")}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <p>
            {defaultAddress.defaultBilling.billing_address}-
            {defaultAddress.defaultBilling.billing_zip_code}
          </p>
          <p>Bangladesh</p>
          <p>
            <b>Mobile: {userInfo.phone}</b>
          </p>
        </Box>
      </Card>
    </>
  );
}
