import { PropsWithChildren } from "react";

interface Props {
  link: string;
}

export const ExternalLink = ({ link, children }: PropsWithChildren<Props>) => {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};
