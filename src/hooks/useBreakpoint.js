// hooks/useBreakpoint.js
import { useTheme, useMediaQuery } from "@mui/material";

/**
 * Custom hook to check responsive breakpoints
 * @returns {object} { isXs, isSm, isMd, isLg, isXl, up, down }
 */
const useBreakpoint = () => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  // Utilities for >= or <=
  const up = (key) => useMediaQuery(theme.breakpoints.up(key));
  const down = (key) => useMediaQuery(theme.breakpoints.down(key));

  return { isXs, isSm, isMd, isLg, isXl, up, down };
};

export default useBreakpoint;
