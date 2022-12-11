import { Text } from "@chakra-ui/react";
import styled from "styled-components";
import { ButtonProps } from "./Button";

type StyledButtonProps = Pick<ButtonProps, "buttonColor">;

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => props.buttonColor};
  padding: 8px 26px;
`;

type StyledButtonTextProps = Pick<ButtonProps, "textColor">;

export const StyledButtonText = styled(Text)<StyledButtonTextProps>`
  font-family: Roboto;
  font-weight: 800;
  size: 10px;
  line-height: 24px;
  letter-spacing: 0.25em;
  text-color: ${(props) => props.textColor};
  text-transform: uppercase;
`;
