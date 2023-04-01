import { lazy, Suspense } from "react";
import { useQuery } from "urql";
import { Drawer } from "../../../../components/Drawer/Drawer";
import { LiveIndicator } from "../../../../components/LiveIndicator/LiveIndicator";
import { colors } from "../../../../design/colors";
import {
  TournamentStreamQueryResponse,
  TOURNAMENT_STREAM_QUERY,
} from "./queries";
import {
  StyledDrawerTitle,
  StyledStreamContainer,
  StyledStreamName,
} from "./StreamDrawer.styled";
import { getStreamLanguage, getStreamLogo } from "./StreamDrawer.utils";

const VodsSection = lazy(() =>
  import("./VodsSection").then((m) => ({
    default: m.VodsSection,
  }))
);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tournamentId?: number;
}

export const StreamDrawer = ({ isOpen, onClose, tournamentId }: Props) => {
  const [{ data }] = useQuery<TournamentStreamQueryResponse>({
    query: TOURNAMENT_STREAM_QUERY,
    variables: { tournamentId: Number(tournamentId) },
  });

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <StyledDrawerTitle>Streams</StyledDrawerTitle>
      {data?.streamsOfTournament.map(
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
      <Suspense>
        <VodsSection tournamentId={tournamentId} />
      </Suspense>
    </Drawer>
  );
};
