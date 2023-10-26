import { PageWrapperContainer } from "./PageWrapper.styled";

export const PageWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return <PageWrapperContainer>{children}</PageWrapperContainer>;
};
