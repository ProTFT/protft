import { ReactElement } from "react";
import {
  CardBadgeContainer,
  CardBody,
  CardContainer,
  CardHeader,
  CardTitle,
} from "./Card.styled";

interface CardProps {
  title: string;
  extraControl?: ReactElement;
}

export const Card = ({
  title,
  children,
  extraControl,
}: React.PropsWithChildren<CardProps>) => {
  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardBadgeContainer>{extraControl}</CardBadgeContainer>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </CardContainer>
  );
};
