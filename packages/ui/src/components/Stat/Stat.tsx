import React from "react";
import { StyledStat, StyledStatTitle, StyledStatValue } from "./Stat.styled";

interface Props {
  title: string;
  value?: string | number;
}

export const Stat = ({ title, value }: Props) => {
  return (
    <StyledStat>
      <StyledStatTitle>{title}</StyledStatTitle>
      <StyledStatValue>{value}</StyledStatValue>
    </StyledStat>
  );
};
