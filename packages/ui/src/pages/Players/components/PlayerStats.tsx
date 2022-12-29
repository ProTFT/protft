import { Stat } from "../../../components/Stat/Stat";
import { PlayerStats } from "../../../graphql/schema";

interface Props {
  playerStats?: PlayerStats | null;
}

export const PlayerCardStats = ({ playerStats }: Props) => {
  return (
    <>
      <Stat title="Matches" value={playerStats?.totalGames} />
      <Stat
        title="Avg Pos"
        value={playerStats?.averagePosition.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
      />
      <Stat
        title="Top 4 %"
        value={playerStats?.topFourCount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          minimumIntegerDigits: 2,
        })}
      />
    </>
  );
};
