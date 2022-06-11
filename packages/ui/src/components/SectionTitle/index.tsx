import { Heading } from "@chakra-ui/react";

interface SectionTitleProps {
  text: string;
}

export const SectionTitle = ({ text }: SectionTitleProps) => (
  <Heading fontSize="3xl" textAlign="start">
    {text}
  </Heading>
);
