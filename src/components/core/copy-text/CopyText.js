import { useState } from "react";
import {Tooltip, IconButton} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CopyText({ text }) {
  const [copied, setCopied] = useState(false);

  const handleTooltipClose = () => {
    setCopied(false);
  };

  const handleTooltipOpen = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("123456");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        onClose={handleTooltipClose}
        placement="right-start"
        open={copied}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="Copied!"
        slotprops={{
          popper: {
            disablePortal: true,
          },
        }}
      >
        <IconButton onClick={handleTooltipOpen}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </ClickAwayListener>
  );
}
