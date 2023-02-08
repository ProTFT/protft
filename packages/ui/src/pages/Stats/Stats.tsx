import {
  Suspense,
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import { useQuery } from "urql";
import { ProTFTButton } from "../../components/Button/Button";
import { TextIconHorizontalContainer } from "../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { CountryIndicator } from "../../components/RegionIndicator/RegionIndicator";
import { colors } from "../../design/colors";
import { ArrowRightSimpleIcon } from "../../design/icons/ArrowRightSimple";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import {
  PlayersStatsQueryResult,
  PlayerStatsQueryVariables,
  PLAYER_STATS_QUERY,
  SortColumn,
  SortDirection,
  SortOption,
} from "./queries";
import { RegionSelect } from "./RegionSelect/RegionSelect";
import { SetSelect } from "./SetSelect/SetSelect";
import {
  StyledButtonContainer,
  StyledContainer,
  StyledPlayerRowData,
  StyledPlayerTable,
  StyledPlayerTableContainer,
  StyledPlayerTableHeader,
  StyledPlayerTableHeaderData,
  StyledStatsFilters,
  StyledTitleContainer,
} from "./Stats.styled";
import { TournamentSelect } from "./TournamentSelect/TournamentSelect";

interface Props {
  regionFilter: string;
  setFilter: number;
  tournamentFilter: number[];
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
              <TextIconHorizontalContainer>
                <CountryIndicator countryCode={player.country} />
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

const defaultSorting: { [key in SortColumn]: boolean } = {
  [SortColumn.AVERAGE_POSITION]: SortDirection.ASC,
  [SortColumn.TOP_1]: SortDirection.DESC,
  [SortColumn.TOP_4]: SortDirection.DESC,
  [SortColumn.TOTAL_GAMES]: SortDirection.DESC,
};

export const Stats = () => {
  const [page, setPage] = useState(0);
  const paginationArgs = useMemo(
    () => ({
      skip: page * 20,
      take: 20,
    }),
    [page]
  );

  const [regionFilter, setRegionFilter] = useState("");
  const [setFilter, setSetFilter] = useState<number>(0);
  const [tournamentFilter, setTournamentFilter] = useState<number[]>([]);
  const [sorting, setSorting] = useState<SortOption>({
    column: SortColumn.AVERAGE_POSITION,
    asc: SortDirection.ASC,
  });

  const onValueChange = useCallback(
    <T extends unknown>(
        changeFunction: React.Dispatch<React.SetStateAction<T>>,
        defaultValue: T
      ) =>
      (newValue?: T) => {
        changeFunction(newValue || defaultValue);
        setPage(0);
      },
    []
  );

  const changeSorting = useCallback(
    (column: SortColumn) => () => {
      setSorting((curr) => {
        const isAlreadySelected = column === curr.column;
        return {
          column,
          asc: isAlreadySelected
            ? !curr.asc
            : defaultSorting[column as SortColumn],
        };
      });
    },
    []
  );

  const onLoadMore = useCallback(() => {
    setPage((curr) => curr + 1);
  }, []);

  const deferredPagination = useDeferredValue(paginationArgs);

  useDocumentTitle("Stats");

  return (
    <StyledContainer>
      <StyledStatsFilters>
        <TournamentSelect
          value={tournamentFilter}
          onValueChange={onValueChange<number[]>(setTournamentFilter, [])}
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
              <StyledTitleContainer>
                Average Position
                <ArrowRightSimpleIcon
                  color={colors.blackBackground}
                  visible={sorting.column === SortColumn.AVERAGE_POSITION}
                  inverted={sorting.asc}
                />
              </StyledTitleContainer>
            </StyledPlayerTableHeaderData>
            <StyledPlayerTableHeaderData
              onClick={changeSorting(SortColumn.TOP_1)}
            >
              <StyledTitleContainer>
                Top 1
                <ArrowRightSimpleIcon
                  color={colors.blackBackground}
                  visible={sorting.column === SortColumn.TOP_1}
                  inverted={sorting.asc}
                />
              </StyledTitleContainer>
            </StyledPlayerTableHeaderData>
            <StyledPlayerTableHeaderData
              onClick={changeSorting(SortColumn.TOP_4)}
            >
              <StyledTitleContainer>
                Top 4
                <ArrowRightSimpleIcon
                  color={colors.blackBackground}
                  visible={sorting.column === SortColumn.TOP_4}
                  inverted={sorting.asc}
                />
              </StyledTitleContainer>
            </StyledPlayerTableHeaderData>
            <StyledPlayerTableHeaderData
              onClick={changeSorting(SortColumn.TOTAL_GAMES)}
            >
              <StyledTitleContainer>
                Total Games
                <ArrowRightSimpleIcon
                  color={colors.blackBackground}
                  visible={sorting.column === SortColumn.TOTAL_GAMES}
                  inverted={sorting.asc}
                />
              </StyledTitleContainer>
            </StyledPlayerTableHeaderData>
          </StyledPlayerTableHeader>
          <tbody>
            <Suspense fallback={null}>
              <StatsRows
                tournamentFilter={tournamentFilter}
                paginationArgs={deferredPagination}
                regionFilter={regionFilter}
                setFilter={setFilter}
                sort={sorting}
              />
            </Suspense>
          </tbody>
        </StyledPlayerTable>
        <StyledButtonContainer>
          <ProTFTButton onClick={onLoadMore}>Load more</ProTFTButton>
        </StyledButtonContainer>
      </StyledPlayerTableContainer>
    </StyledContainer>
  );
};
