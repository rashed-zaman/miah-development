import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function ShareContent({ text }) {
  // state
  const [show, setshow] = useState(true);

  // methods
  const handleShare = (platform) => {
    const encodedText = encodeURIComponent(text);

    if (platform === "whatsapp") {
      const appUrl = `whatsapp://send?text=${text}`;
      const fallbackUrl = `https://wa.me/?text=${text}`;

      // Attempt to open WhatsApp app
      window.location.href = appUrl;

      // Fallback to WhatsApp Web after 1 second if app doesn't open
      // setTimeout(() => {
      //   window.open(fallbackUrl, "_blank");
      // }, 1000);

    } else if (platform === "messenger") {
      const messengerUrl = `fb-messenger://share?link=${text}`;
      const fallbackUrl = `https://www.facebook.com/dialog/send?link=${text}&app_id=3659681794077514&redirect_uri=${encodeURIComponent(
        window.location.href
      )}`;
      // Attempt to open Messenger app
      window.location.href = messengerUrl;

      // Fallback to Messenger Web after 1 second if app doesn't open
      // setTimeout(() => {
      //   window.open(fallbackUrl, "_blank");
      // }, 1000);
    }
    setshow(true)
  };

  return (
    <span>
      {show ? (
        <IconButton onClick={() => setshow(false)} size="small">
          <ShareIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => setshow(true)} size="small">
          <CloseIcon />
        </IconButton>
      )}

      {!show && (
        <span>
          <IconButton onClick={() => handleShare("whatsapp")} size="small">
            <WhatsAppIcon sx={{ color: '#25d366' }}  />
          </IconButton>
          <IconButton onClick={() => handleShare("messenger")} size="small">
            <FacebookIcon sx={{ color: '#1877F2' }} />
          </IconButton>
        </span>
      )}
    </span>
  );
}
