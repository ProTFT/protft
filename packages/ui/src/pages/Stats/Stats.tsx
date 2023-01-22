import { Suspense, useCallback, useMemo, useState } from "react";
import { useQuery } from "urql";
import { TextIconHorizontalContainer } from "../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { RegionsIndicator } from "../../components/RegionIndicator/RegionIndicator";
import {
  PlayersStatsQueryResult,
  PlayerStatsQueryVariables,
  PLAYER_STATS_QUERY,
  SortColumn,
  SortOption,
} from "./queries";
import { RegionSelect } from "./RegionSelect/RegionSelect";
import { SetSelect } from "./SetSelect/SetSelect";
import {
  StyledContainer,
  StyledPlayerRowData,
  StyledPlayerTable,
  StyledPlayerTableContainer,
  StyledPlayerTableHeader,
  StyledPlayerTableHeaderData,
  StyledStatsFilters,
} from "./Stats.styled";
import { TournamentSelect } from "./TournamentSelect/TournamentSelect";

interface Props {
  regionFilter: string;
  setFilter: number;
  tournamentFilter: number;
  paginationArgs: object;
  sort: SortOption;
}

const StatsRows = ({
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
      tournamentId: Number(tournamentFilter),
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
              <TextIconHorizontalContainer>
                <RegionsIndicator
                  showName={false}
                  regionCodes={[player.region!]}
                />
                {player.name}
              </TextIconHorizontalContainer>
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

export const Stats = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(0);
  const paginationArgs = useMemo(
    () => ({
      skip: page * 20,
      take: 20,
    }),
    [page]
  );

  // const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [setFilter, setSetFilter] = useState<number>(0);
  const [tournamentFilter, setTournamentFilter] = useState<number>(0);
  const [sorting, setSorting] = useState<SortOption>({
    column: SortColumn.AVERAGE_POSITION,
    asc: true,
  });

  const onValueChange = useCallback(
    <T extends unknown>(
        changeFunction: React.Dispatch<React.SetStateAction<T>>,
        defaultValue: T
      ) =>
      (newValue?: T) => {
        changeFunction(newValue || defaultValue);
      },
    []
  );

  const changeSorting = useCallback(
    (column: SortColumn) => () => {
      setSorting((curr) => {
        const isAlreadySelected = column === curr.column;
        return {
          column,
          asc: isAlreadySelected ? !curr.asc : true,
        };
      });
    },
    []
  );

  // let timeout = useRef<ReturnType<typeof setTimeout>>();
  // const onChangeSearchInput = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     if (timeout.current) {
  //       clearTimeout(timeout.current);
  //     }
  //     timeout.current = setTimeout(() => {
  //       setSearchQuery!(event.target.value);
  //     }, 1000);
  //   },
  //   [setSearchQuery]
  // );

  return (
    <StyledContainer>
      {/* <SearchInput placeholder="Search player" onChange={onChangeSearchInput} /> */}
      <StyledStatsFilters>
        <TournamentSelect
          value={tournamentFilter}
          onValueChange={onValueChange<number>(setTournamentFilter, 0)}
        />
        <SetSelect
          value={setFilter}
          onValueChange={onValueChange<number>(setSetFilter, 0)}
        />
        <RegionSelect
          value={regionFilter}
          onValueChange={onValueChange<string>(setRegionFilter, "")}
        />
      </StyledStatsFilters>
      <StyledPlayerTableContainer>
        <StyledPlayerTable>
          <StyledPlayerTableHeader>
            <StyledPlayerTableHeaderData>Player</StyledPlayerTableHeaderData>
            <StyledPlayerTableHeaderData
              onClick={changeSorting(SortColumn.AVERAGE_POSITION)}
            >
              Average Position
            </StyledPlayerTableHeaderData>
            <StyledPlayerTableHeaderData
              onClick={changeSorting(SortColumn.TOP_1)}
            >
              Top 1
            </StyledPlayerTableHeaderData>
            <StyledPlayerTableHeaderData
              onClick={changeSorting(SortColumn.TOP_4)}
            >
              Top 4
            </StyledPlayerTableHeaderData>
            <StyledPlayerTableHeaderData
              onClick={changeSorting(SortColumn.TOTAL_GAMES)}
            >
              Total Games
            </StyledPlayerTableHeaderData>
          </StyledPlayerTableHeader>
          <tbody>
            <Suspense fallback={null}>
              <StatsRows
                tournamentFilter={tournamentFilter}
                paginationArgs={paginationArgs}
                regionFilter={regionFilter}
                setFilter={setFilter}
                // playerFilter={searchQuery}
                sort={sorting}
              />
            </Suspense>
          </tbody>
        </StyledPlayerTable>
      </StyledPlayerTableContainer>
    </StyledContainer>
  );

  // return <ComingSoon />;
};
