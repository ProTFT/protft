import { PropsWithChildren } from "react";
import { useAuth } from "../../hooks/useAuth";

export const OnlyWebmaster = ({ children }: PropsWithChildren<{}>) => {
  const { isWebmaster } = useAuth();
  if (isWebmaster) {
    return <>{children}</>;
  }

  return null;
};
