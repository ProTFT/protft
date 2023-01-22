import { pixelsBreakpoints } from "../design/breakpoints";
import { useWindowSize } from "./useWindowSize";

export const useIsDesktop = () => {
  const { width } = useWindowSize();
  return (width || 0) >= pixelsBreakpoints.desktop;
};
