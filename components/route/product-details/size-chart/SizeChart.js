import React, { useState } from "react";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import StraightenIcon from "@mui/icons-material/Straighten";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";

export default function SizeChart({ responseData }) {
  // ================== local state =============
  const [open, setOpen] = useState(false);

  //  =============== methods ==============
  const handleDialog = () => {
    setOpen(!open);
  };
  return (
    <>
      {responseData.sizeChart && (
        <div onClick={handleDialog}>
          <IconButton aria-label="delete">
            <StraightenIcon />
          </IconButton>
          <span className="cursor-pointer"> <u> Size Chart </u> </span>
        </div>
      )}

      <Dialog onClose={handleDialog} open={open}>
        <DialogTitle>Size Chart</DialogTitle>
        <DialogContent>
          <div dangerouslySetInnerHTML={{ __html: responseData.sizeChart }} />
        </DialogContent>
      </Dialog>
    </>
  );
}
