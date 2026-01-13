"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const DesktopHeader = dynamic(() => import("../parts/DesktopHeader"));
const MobileHeader = dynamic(() => import("../parts/MobileHeader"));

export default function Header() {
  return (
    <>
      <DesktopHeader />
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <MobileHeader />
      </Box>
    </>
  );
}
