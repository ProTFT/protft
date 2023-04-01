import { useQuery } from "urql";
import { LiveIndicator } from "../../../../components/LiveIndicator/LiveIndicator";
import { colors } from "../../../../design/colors";
import { TournamentVodsQueryResponse, TOURNAMENT_VODS_QUERY } from "./queries";
import {
  StyledDrawerTitle,
  StyledStreamName,
  StyledStreamContainer,
} from "./StreamDrawer.styled";
import { getStreamLogo, getStreamLanguage } from "./StreamDrawer.utils";

interface Props {
  tournamentId?: number;
}

export const VodsSection = ({ tournamentId }: Props) => {
  const [{ data }] = useQuery<TournamentVodsQueryResponse>({
    query: TOURNAMENT_VODS_QUERY,
    variables: { tournamentId: Number(tournamentId) },
  });

  if (data?.vodsOfTournament.length === 0) {
    return null;
  }

  return (
    <>
      <StyledDrawerTitle>VODS</StyledDrawerTitle>
      {data?.vodsOfTournament.map(
        ({ link: url, name, platform, language, isLive }) => (
          <a href={url} key={name} target="blank">
            <StyledStreamContainer>
              {getStreamLogo(platform)({
                color: colors.yellow,
              })}
              <StyledStreamName>{name}</StyledStreamName>
              {getStreamLanguage(language)}
              {isLive && <LiveIndicator />}
            </StyledStreamContainer>
          </a>
        )
      )}
    </>
  );
};
