import React, { useState, useEffect, useRef } from "react";
import PrismaZoom from "react-prismazoom";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PinchIcon from "@mui/icons-material/Pinch";

export default function ZoomSlider({ zoomImage, setZoom, goToNext }) {
  // hook
  const zoomRef = useRef();

  // local state
  const [clickToZoom, setClickToZoom] = useState(true);

  // methods
  const closeZoom = () => {
    setZoom(false);
  };
  const handleNext = () => {
    goToNext();
    zoomRef.current.reset();
  };

  // side effects
  useEffect(() => {
    setTimeout(() => {
      setClickToZoom(false);
    }, 2000);

    return () => {
      setClickToZoom(false);
    };
  }, []);

  return (
    <div className="my-prismazoom">
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <span
          className={
            clickToZoom ? "clickToZoom clickFadein" : "clickToZoom clickFadeout"
          }
        >
          <ZoomInIcon fontSize="large" />
          <Typography variant="p" gutterBottom component="div">
            Double Click / Scroll to zoom
          </Typography>
        </span>
      </Box>

      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <span
          className={
            clickToZoom ? "clickToZoom clickFadein" : "clickToZoom clickFadeout"
          }
        >
          <PinchIcon fontSize="large" />
          <Typography variant="p" gutterBottom component="div">
            Pinch to zoom
          </Typography>
        </span>
      </Box>
      <IconButton
        aria-label="delete"
        size="large"
        onClick={closeZoom}
        className="closeButton"
      >
        <CloseIcon fontSize="medium" />
      </IconButton>

      <div className="prismazoom-inner">
        <PrismaZoom maxZoom={3} animDuration={0.5} ref={zoomRef}>
          <img
            src={zoomImage}
            alt="alt"
          />
        </PrismaZoom>
      </div>

      <IconButton
        sx={{
          position: "absolute",
          left: 0,
        }}
        onClick={handleNext}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          right: 0,
        }}
        onClick={handleNext}
      >
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
}
