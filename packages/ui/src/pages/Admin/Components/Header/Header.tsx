import { Container, HeaderImage, InfoContainer } from "./Header.styled";

interface Props {
  src: string;
  alt: string;
}

export const Header = ({
  children,
  src,
  alt,
}: React.PropsWithChildren<Props>) => (
  <Container>
    <HeaderImage src={src} alt={alt} />
    <InfoContainer>{children}</InfoContainer>
  </Container>
);
