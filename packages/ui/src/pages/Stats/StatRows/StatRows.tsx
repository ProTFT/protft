import { useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { TextIconHorizontalContainer } from "../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { CountryIndicator } from "../../../components/RegionIndicator/RegionIndicator";
import { useObserver } from "../../../hooks/useObserver";
import {
  SortOption,
  PlayersStatsQueryResult,
  PlayerStatsQueryVariables,
  PLAYER_STATS_QUERY,
} from "../queries";
import { StyledPlayerRowData } from "./StatRows.styled";

interface Props {
  regionFilter: string[];
  setFilter: number[];
  tournamentFilter: number[];
  minimumGamesFilter: number;
  paginationArgs: object;
  sort: SortOption;
  onLoadMore: () => void;
}

export const StatRows = ({
  regionFilter,
  setFilter,
  tournamentFilter,
  paginationArgs,
  minimumGamesFilter,
  sort,
  onLoadMore,
}: Props) => {
  const [{ data: stats }] = useQuery<
    PlayersStatsQueryResult,
    PlayerStatsQueryVariables
  >({
    query: PLAYER_STATS_QUERY,
    variables: {
      regions: regionFilter,
      setIds: setFilter,
      tournamentIds: tournamentFilter,
      minimumGames: Number(minimumGamesFilter) - 1,
      sort,
      ...paginationArgs,
    },
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useObserver(bottomRef, onLoadMore);

  return (
    <>
      {stats?.playerStats.map(
        ({
          player,
          averagePosition,
          topOneCount,
          topFourCount,
          totalGames,
        }) => (
          <tr key={player.id}>
            <StyledPlayerRowData center={false}>
              <Link to={`/players/${player.slug}`}>
                <TextIconHorizontalContainer>
                  <CountryIndicator countryCode={player.country} />
                  {player.name}
                </TextIconHorizontalContainer>
              </Link>
            </StyledPlayerRowData>
            <StyledPlayerRowData>
              {averagePosition.toFixed(2)}
            </StyledPlayerRowData>
            <StyledPlayerRowData>{topOneCount.toFixed(2)}%</StyledPlayerRowData>
            <StyledPlayerRowData>
              {topFourCount.toFixed(2)}%
            </StyledPlayerRowData>
            <StyledPlayerRowData>{totalGames}</StyledPlayerRowData>
          </tr>
        )
      )}
      <div ref={bottomRef} />
    </>
  );
};
