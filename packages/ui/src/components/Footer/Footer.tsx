import { StyledVerticalContainer } from "../Layout/VerticalContainer/VerticalContainer.styled";
import {
  StyledContainer,
  StyledDivider,
  StyledFooterText,
} from "./Footer.styled";
import { DiscordLogo, TwitterLogo } from "./TwitterLogo";

export const Footer = () => {
  return (
    <>
      <StyledDivider />
      <StyledContainer>
        <StyledVerticalContainer>
          <StyledFooterText>
            © {new Date().getFullYear()} Pro TFT, all rights reserved
          </StyledFooterText>
          <StyledFooterText>
            Pro TFT was created under Riot Games' "Legal Jibber Jabber" policy
            using assets owned by Riot Games. Riot Games does not endorse or
            sponsor this project.
          </StyledFooterText>
        </StyledVerticalContainer>
        <div style={{ display: "flex", gap: "2rem" }}>
          <TwitterLogo />
          <DiscordLogo />
        </div>
      </StyledContainer>
    </>
  );
};
