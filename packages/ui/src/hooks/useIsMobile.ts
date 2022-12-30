import { pixelsBreakpoints } from "../design/breakpoints";
import { useWindowSize } from "./useWindowSize";

export const useIsMobile = () => {
  const { width } = useWindowSize();
  return (width || 0) < pixelsBreakpoints.tablet;
};
