import {
  Suspense,
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import { ProTFTButton } from "../../components/Button/Button";
import { colors } from "../../design/colors";
import { ArrowRightSimpleIcon } from "../../design/icons/ArrowRightSimple";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Filters, SortColumn, SortDirection, SortOption } from "./queries";
import { RegionSelect } from "./RegionSelect/RegionSelect";
import { SetSelect } from "./SetSelect/SetSelect";
import { StatRows } from "./StatRows/StatRows";
import {
  StyledButtonContainer,
  StyledContainer,
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
  [Filters.REGION]: "",
  [Filters.SET]: 0,
  [Filters.TOURNAMENTS]: [],
};

const ITEMS_PER_PAGE = 20;

export const Stats = () => {
  const [page, setPage] = useState(0);
  const paginationArgs = useMemo(
    () => ({
      skip: page * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    [page]
  );

  const [regionFilter, setRegionFilter] = useState(
    defaultFilter[Filters.REGION]
  );
  const [setFilter, setSetFilter] = useState<number>(
    defaultFilter[Filters.SET]
  );
  const [tournamentFilter, setTournamentFilter] = useState<number[]>(
    defaultFilter[Filters.TOURNAMENTS]
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

  const deferredPagination = useDeferredValue(paginationArgs);

  useDocumentTitle("Stats");

  return (
    <StyledContainer>
      <StyledStatsFilters>
        <TournamentSelect
          value={tournamentFilter}
          onValueChange={onValueChange<number[]>(
            setTournamentFilter,
            defaultFilter[Filters.TOURNAMENTS]
          )}
        />
        <SetSelect
          value={setFilter}
          onValueChange={onValueChange<number>(
            setSetFilter,
            defaultFilter[Filters.SET]
          )}
        />
        <RegionSelect
          value={regionFilter}
          onValueChange={onValueChange<string>(
            setRegionFilter,
            defaultFilter[Filters.REGION]
          )}
        />
      </StyledStatsFilters>
      <StyledPlayerTableContainer>
        <StyledPlayerTable>
          <StyledPlayerTableHeader>
            <StyledPlayerTableHeaderRow>
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
            </StyledPlayerTableHeaderRow>
          </StyledPlayerTableHeader>
          <tbody>
            <Suspense fallback={null}>
              <StatRows
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
