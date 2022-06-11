import { Heading } from "@chakra-ui/react";

interface PageTitleProps {
  text?: string;
}

export const PageTitle = ({ text }: PageTitleProps) => {
  return (
    <Heading marginTop={10} fontSize="6xl">
      {text}
    </Heading>
  );
};
