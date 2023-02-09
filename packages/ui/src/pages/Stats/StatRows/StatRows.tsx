import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { TextIconHorizontalContainer } from "../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { CountryIndicator } from "../../../components/RegionIndicator/RegionIndicator";
import {
  SortOption,
  PlayersStatsQueryResult,
  PlayerStatsQueryVariables,
  PLAYER_STATS_QUERY,
} from "../queries";
import { StyledPlayerRowData } from "./StatRows.styled";

interface Props {
  regionFilter: string;
  setFilter: number;
  tournamentFilter: number[];
  paginationArgs: object;
  sort: SortOption;
}

export const StatRows = ({
  regionFilter,
  setFilter,
  tournamentFilter,
  paginationArgs,
  sort,
}: Props) => {
  const [{ data: stats }] = useQuery<
    PlayersStatsQueryResult,
    PlayerStatsQueryVariables
  >({
    query: PLAYER_STATS_QUERY,
    variables: {
      region: regionFilter,
      setId: Number(setFilter),
      tournamentIds: tournamentFilter,
      sort,
      ...paginationArgs,
    },
  });

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
              <Link to={`/player/${player.slug}`}>
                <TextIconHorizontalContainer>
                  <CountryIndicator countryCode={player.country} />
                  {player.name}
                </TextIconHorizontalContainer>
              </Link>
            </StyledPlayerRowData>
            <StyledPlayerRowData>{averagePosition}</StyledPlayerRowData>
            <StyledPlayerRowData>{topOneCount}%</StyledPlayerRowData>
            <StyledPlayerRowData>{topFourCount}%</StyledPlayerRowData>
            <StyledPlayerRowData>{totalGames}</StyledPlayerRowData>
          </tr>
        )
      )}
    </>
  );
};
