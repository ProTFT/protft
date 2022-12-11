export const pixelsBreakpoints = {
  tablet: 768,
  desktop: 1024,
};

const sizeBreakpoints = {
  tablet: `${pixelsBreakpoints.tablet}px`,
  desktop: `${pixelsBreakpoints.desktop}px`,
};

export const device = {
  tablet: `(min-width: ${sizeBreakpoints.tablet})`,
  desktop: `(min-width: ${sizeBreakpoints.desktop})`,
};
