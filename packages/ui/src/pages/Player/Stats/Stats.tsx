import { Stat } from "../../../components/Stat/Stat";
import { Player } from "../../../graphql/schema";
import { StyledStatsContainer } from "./Stats.styled";

interface Props {
  player?: Pick<Player, "playerStats">;
}

export const Stats = ({ player }: Props) => {
  return (
    <StyledStatsContainer>
      <Stat title="Matches" value={player?.playerStats?.totalGames} />
      <Stat title="Avg Pos" value={player?.playerStats?.averagePosition} />
      <Stat title="Top 4 %" value={player?.playerStats?.topFourCount} />
      <Stat title="Top 1 %" value={player?.playerStats?.topOneCount} />
    </StyledStatsContainer>
  );
};
