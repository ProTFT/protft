import { Suspense, useCallback, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { colors } from "../../design/colors";
import { ArrowRightSimpleIcon } from "../../design/icons/ArrowRightSimple";
import { usePagination } from "../../hooks/usePagination";
import { Filters, SortColumn, SortDirection, SortOption } from "./queries";
import { RegionSelect } from "./RegionSelect/RegionSelect";
import { SetSelect } from "./SetSelect/SetSelect";
import { StatRows } from "./StatRows/StatRows";
import {
  StyledContainer,
  StyledFilterContainer,
  StyledFilterLabel,
  StyledInput,
  StyledPlayerTable,
  StyledPlayerTableContainer,
  StyledPlayerTableHeader,
  StyledPlayerTableHeaderData,
  StyledPlayerTableHeaderRow,
  StyledStatsFilters,
  StyledTitleContainer,
} from "./Stats.styled";
import { TournamentSelect } from "./TournamentSelect/TournamentSelect";

const defaultSorting: { [key in SortColumn]: boolean } = {
  [SortColumn.AVERAGE_POSITION]: SortDirection.ASC,
  [SortColumn.TOP_1]: SortDirection.DESC,
  [SortColumn.TOP_4]: SortDirection.DESC,
  [SortColumn.TOTAL_GAMES]: SortDirection.DESC,
};

const defaultFilter: { [key in Filters]: any } = {
  [Filters.REGION]: [],
  [Filters.SET]: [],
  [Filters.TOURNAMENTS]: [],
  [Filters.MINIMUM_GAMES]: 1,
};

const ITEMS_PER_PAGE = 20;

export const Stats = () => {
  const [page, setPage] = useState(0);

  const [regionFilter, setRegionFilter] = useState(
    defaultFilter[Filters.REGION]
  );
  const [setFilter, setSetFilter] = useState<number[]>(
    defaultFilter[Filters.SET]
  );
  const [tournamentFilter, setTournamentFilter] = useState<number[]>(
    defaultFilter[Filters.TOURNAMENTS]
  );
  const [minimumGamesFilter, setMinimumGamesFilter] = useState<number>(
    defaultFilter[Filters.MINIMUM_GAMES]
  );
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

  const isSetSelectDisabled = useMemo(
    () => Boolean(!setFilter.length && tournamentFilter.length),
    [setFilter.length, tournamentFilter.length]
  );

  const { paginationArgs } = usePagination(page, ITEMS_PER_PAGE);

  return (
    <StyledContainer>
      <Helmet>
        <title>Stats</title>
        <meta
          name="description"
          content="Check out competitive stats for professional tournaments of Teamfight
          Tactics (TFT)"
        />
      </Helmet>
      <StyledStatsFilters>
        <StyledFilterContainer>
          <StyledFilterLabel>Set</StyledFilterLabel>
          <SetSelect
            value={setFilter}
            onValueChange={onValueChange<number[]>(
              setSetFilter,
              defaultFilter[Filters.SET]
            )}
            isDisabled={isSetSelectDisabled}
          />
        </StyledFilterContainer>
        <StyledFilterContainer>
          <StyledFilterLabel>Tournaments</StyledFilterLabel>
          <Suspense>
            <TournamentSelect
              value={tournamentFilter}
              onValueChange={onValueChange<number[]>(
                setTournamentFilter,
                defaultFilter[Filters.TOURNAMENTS]
              )}
              setIds={setFilter}
            />
          </Suspense>
        </StyledFilterContainer>
        <StyledFilterContainer>
          <StyledFilterLabel>Player region</StyledFilterLabel>
          <RegionSelect
            value={regionFilter}
            onValueChange={onValueChange<string[]>(
              setRegionFilter,
              defaultFilter[Filters.REGION]
            )}
          />
        </StyledFilterContainer>
        <StyledFilterContainer>
          <StyledFilterLabel>Minimum games</StyledFilterLabel>
          <StyledInput
            type="number"
            value={minimumGamesFilter}
            onChange={(event) =>
              onValueChange<number>(
                setMinimumGamesFilter,
                defaultFilter[Filters.MINIMUM_GAMES]
              )(Number(event.target.value))
            }
          />
        </StyledFilterContainer>
      </StyledStatsFilters>
      <StyledPlayerTableContainer>
        <StyledPlayerTable>
          <StyledPlayerTableHeader>
            <StyledPlayerTableHeaderRow>
              <StyledPlayerTableHeaderData alignment={"left"}>
                Player
              </StyledPlayerTableHeaderData>
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
            </StyledPlayerTableHeaderRow>
          </StyledPlayerTableHeader>
          <tbody>
            <Suspense fallback={null}>
              <StatRows
                tournamentFilter={tournamentFilter}
                paginationArgs={paginationArgs}
                regionFilter={regionFilter}
                setFilter={setFilter}
                minimumGamesFilter={minimumGamesFilter}
                sort={sorting}
                onLoadMore={onLoadMore}
              />
            </Suspense>
          </tbody>
        </StyledPlayerTable>
      </StyledPlayerTableContainer>
    </StyledContainer>
  );
};
