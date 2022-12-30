import { StyledTournamentImage } from "../../components/TournamentContent/TournamentContent.styled";
import { useIsMobile } from "../../hooks/useIsMobile";
import {
  StyledContainer,
  StyledHeader,
  StyledHeaderContent,
  StyledLink,
  StyledSubtitle,
  StyledText,
  StyledTextSection,
  StyledTitle,
} from "./About.styled";

export const About = () => {
  const isMobile = useIsMobile();
  return (
    <StyledContainer>
      <StyledHeader>
        {!isMobile && (
          <StyledTournamentImage src={`/sets/7.webp`} alt={"TFT"} />
        )}
        <StyledHeaderContent>
          <StyledTitle>A hub for TFT Esports</StyledTitle>
          <StyledText>
            Pro TFT was born from the need to streamline information about the
            competitive scene of Teamfight Tactics and provide a central place
            for tournament information and stats.
          </StyledText>
        </StyledHeaderContent>
      </StyledHeader>

      <StyledTextSection>
        <a id="WhoRunsProTFT" href="#WhoRunsProTFT">
          <StyledSubtitle>Who runs Pro TFT?</StyledSubtitle>
        </a>
        <StyledText>
          I'm{" "}
          <StyledLink href="https://twitter.com/lucas_heim" target="_blank">
            Lucas Heim
          </StyledLink>{" "}
          and, as of now, I'm the only developer and maintainer of the website.
          I have a full-time job, so I need to squeeze some time here and there
          to do it.
        </StyledText>
      </StyledTextSection>

      <StyledTextSection>
        <a id="Support" href="#Support">
          <StyledSubtitle>How can I support Pro TFT?</StyledSubtitle>
        </a>
        <StyledText>
          Pro TFT is just a hobby for now and I pay for all the infrastructure
          myself. Honestly maybe it will just flop or maybe it will get big, but
          if you want to show your support I have a{" "}
          <StyledLink href="https://ko-fi.com/protft" target={"_blank"}>
            Ko-fi.
          </StyledLink>
        </StyledText>
      </StyledTextSection>

      <StyledTextSection>
        <a id="WhereData" href="#WhereData">
          <StyledSubtitle>Where do you get the data from?</StyledSubtitle>
        </a>
        <StyledText>
          Unfortunately, tournament data is not easily available as of now. The
          data present here has been gathered through news articles, VODs,
          tweets and tournament spreadsheets. Everything is double-checked, but
          it's still a manual input, so feel free to{" "}
          <StyledLink
            href="https://twitter.com/messages/compose?recipient_id=1531252635193458688"
            target={"_blank"}
          >
            give any feedback
          </StyledLink>{" "}
          if you see something wrong.
        </StyledText>
      </StyledTextSection>

      <StyledTextSection>
        <a id="WhyNotAdded" href="#WhyNotAdded">
          <StyledSubtitle>
            Why isn't tournament/stage X added/updated?
          </StyledSubtitle>
        </a>
        <StyledText>
          As stated before, this website is still a one person show, so there's
          very limited resources. If a tournament stage has more than 64
          players, it takes a lot of time to input all data, so these ones are
          not priorities and will only be added on the future.
          <br />
          For tournaments, the focus are the ones that are part of "Road to
          Worlds", being regional qualifiers or others that can take someone to
          the highest stage. I have a ongoing list of tournaments I plan to add{" "}
          <StyledLink
            href="https://github.com/ProTFT/protft/issues/2"
            target={"_blank"}
          >
            here
          </StyledLink>
          .
        </StyledText>
      </StyledTextSection>

      <StyledTextSection>
        <a id="WhyNotLiquipedia" href="#WhyNotLiquipedia">
          <StyledSubtitle>
            Why don't you just add the data to Liquipedia?
          </StyledSubtitle>
        </a>
        <StyledText>
          I absolutely love Liquipedia. As a fan, I spent countless hours going
          through information there and have contributed myself a few times. The
          goal of Pro TFT is not to eclipse Liquipedia, but to enable crossing
          data and generating information from that. Wikis are made of static
          content pages, which makes it easier to visualize but hard to
          manipulate data.
          <br />
          If I get enough time, I plan to create scripts to export data and
          update Liquipedia pages. As some information was taken from there, I
          might as well give it back.
        </StyledText>
      </StyledTextSection>
    </StyledContainer>
  );
};
