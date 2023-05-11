import { useState } from "react";
import { useQuery } from "urql";
import { Stat } from "../../../components/Stat/Stat";
import { useIsDesktop } from "../../../hooks/useIsDesktop";
import { PlayerStatsBySlugQueryResult, PLAYER_STATS_QUERY } from "../queries";
import { SetDropdown } from "./SetDropdown";
import {
  SetFilterContainer,
  StyledStatsContainer,
  StyledStatsSection,
} from "./Stats.styled";

interface Props {
  playerId?: number;
}

export const Stats = ({ playerId }: Props) => {
  const [setFilter, setSetFilter] = useState<number>(0);

  const [{ data }] = useQuery<PlayerStatsBySlugQueryResult>({
    query: PLAYER_STATS_QUERY,
    variables: { id: playerId, setId: setFilter },
  });

  const isDesktop = useIsDesktop();

  return (
    <StyledStatsSection>
      {!isDesktop && (
        <SetFilterContainer>
          <SetDropdown
            onSelectOption={setSetFilter}
            selectedOption={setFilter}
          />
        </SetFilterContainer>
      )}
      <StyledStatsContainer>
        <Stat title="Matches" value={data?.player?.playerStats?.totalGames} />
        <Stat
          title="Avg Pos"
          value={data?.player?.playerStats?.averagePosition}
        />
        <Stat title="Top 4 %" value={data?.player?.playerStats?.topFourCount} />
        <Stat title="Top 1 %" value={data?.player?.playerStats?.topOneCount} />
        {isDesktop && (
          <SetDropdown
            onSelectOption={setSetFilter}
            selectedOption={setFilter}
          />
        )}
      </StyledStatsContainer>
    </StyledStatsSection>
  );
};
