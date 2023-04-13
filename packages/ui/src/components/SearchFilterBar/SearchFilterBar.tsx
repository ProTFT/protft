import React, {
  ChangeEvent,
  Suspense,
  useCallback,
  useRef,
  useState,
} from "react";
import { TournamentFilters } from "../../pages/Tournaments/Tournaments";
import { SearchInput } from "../SearchInput/SearchInput";
import { FilterButton } from "./FilterButton";
import {
  StyledAppliedFilter,
  StyledAppliedFilterContainer,
  StyledContainer,
  StyledFilterBar,
} from "./SearchFilterBar.styled";

const FilterDrawer = React.lazy(() =>
  import("../Drawer/FilterDrawer").then((m) => ({
    default: m.FilterDrawer,
  }))
);

interface Props {
  placeholder: string;
  setSearchQuery?: (query: string) => void;
  filters: TournamentFilters;
  setFilters: React.Dispatch<React.SetStateAction<TournamentFilters>>;
}

export const StyledSearchFilterBar = ({
  placeholder,
  setSearchQuery,
  filters,
  setFilters,
}: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let timeout = useRef<ReturnType<typeof setTimeout>>();

  const handleSetFilter = useCallback(
    (selectedSets: number[]) => {
      setFilters((current) => ({
        ...current,
        setId: selectedSets,
      }));
    },
    [setFilters]
  );

  const handleRegionFilter = useCallback(
    (selectedRegions: string[]) => {
      setFilters((current) => ({
        ...current,
        region: selectedRegions,
      }));
    },
    [setFilters]
  );

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((current) => !current);
  }, []);

  const onChangeSearchInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        setSearchQuery!(event.target.value);
      }, 1000);
    },
    [setSearchQuery]
  );

  return (
    <StyledContainer>
      {isDrawerOpen && (
        <Suspense>
          <FilterDrawer
            isOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
            selectedRegions={filters.region}
            selectedSets={filters.setId}
            setSelectedRegions={handleRegionFilter}
            setSelectedSets={handleSetFilter}
          />
        </Suspense>
      )}
      <SearchInput placeholder={placeholder} onChange={onChangeSearchInput} />
      <StyledFilterBar>
        <FilterButton onClick={toggleDrawer} />
        <StyledAppliedFilterContainer>
          {filters.region.map((selectedFilter) => (
            <StyledAppliedFilter key={selectedFilter}>
              {selectedFilter}
            </StyledAppliedFilter>
          ))}
          {filters.setId.map((selectedFilter) => (
            <StyledAppliedFilter key={selectedFilter}>
              Set {selectedFilter}
            </StyledAppliedFilter>
          ))}
        </StyledAppliedFilterContainer>
      </StyledFilterBar>
    </StyledContainer>
  );
};
