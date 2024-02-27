import styled from "styled-components";
import { StyledVerticalContainer } from "../../../../components/Layout/VerticalContainer/VerticalContainer.styled";

export const Container = styled.header(({ theme }) => ({
  display: "flex",
  width: "100%",
  backgroundColor: theme.colors.otherBlack,
  boxShadow: "0px 12px 9px rgba(0, 0, 0, 0.25)",
}));

export const HeaderImage = styled.img((_) => ({
  width: "30%",
  borderRadius: "8px 0 0 8px",
  objectFit: "cover",

  // TODO: find out how to do it without hardcoding
  "@media (min-width: 768px)": {
    width: "20%",
  },

  "@media (min-width: 1024px)": {
    width: "10%",
  },
}));

export const InfoContainer = styled(StyledVerticalContainer)((_) => ({
  padding: "0.5rem 1rem 0.5rem 1rem",
  alignItems: "start",
  justifyContent: "space-between",
  width: "100%",
  position: "relative",

  "@media (min-width: 768px)": {
    padding: "1.5rem",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
  },
}));
