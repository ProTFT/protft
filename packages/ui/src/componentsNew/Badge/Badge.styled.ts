import styled from "styled-components";
import { AltText500Props } from "../../design/fonts/NewFonts";

export const BadgeContainer = styled.div<{ color?: string }>(
  ({ theme, color }) => ({
    padding: `${theme.spacing(1)} ${theme.spacing(6)}`,
    backgroundColor: color ?? theme.colors.newDesign.grayScale[90],
    display: "flex",
    maxWidth: "fit-content",
    alignItems: "center",
    gap: theme.spacing(5),
    borderRadius: theme.spacing(3),
    height: theme.spacing(20),
  })
);

export const BadgeIcon = styled.div(({ theme }) => ({}));

export const BadgeText = styled.p<{ textColor?: string }>(
  ({ theme, textColor }) => ({
    ...AltText500Props(theme),
    color: textColor ?? theme.colors.newDesign.grayScale[30],
  })
);
