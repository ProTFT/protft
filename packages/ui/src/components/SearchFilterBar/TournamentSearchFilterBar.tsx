import React, { Suspense, useCallback, useState } from "react";
import { useTournamentsContext } from "../../pages/Tournaments/TournamentsContext";
import { FilterButton } from "./FilterButton";
import { SearchField } from "./SearchField";
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
}

export const TournamentSearchFilterBar = ({
  placeholder,
  setSearchQuery,
}: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { filters, setFilters, resetPagination } = useTournamentsContext();

  const applySetFilter = useCallback(
    (selectedSets: number[]) => {
      setFilters((current) => ({
        ...current,
        setId: selectedSets,
      }));
      resetPagination();
    },
    [resetPagination, setFilters]
  );

  const applyRegionFilter = useCallback(
    (selectedRegions: string[]) => {
      setFilters((current) => ({
        ...current,
        region: selectedRegions,
      }));
      resetPagination();
    },
    [resetPagination, setFilters]
  );

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((current) => !current);
  }, []);

  const onSubmitFilter = useCallback(
    (selectedRegions: string[], selectedSets: number[]) => {
      resetPagination();
      applySetFilter(selectedSets);
      applyRegionFilter(selectedRegions);
      toggleDrawer();
    },
    [applyRegionFilter, applySetFilter, resetPagination, toggleDrawer]
  );

  const onClearFilters = useCallback(() => {
    resetPagination();
    applySetFilter([]);
    applyRegionFilter([]);
    toggleDrawer();
  }, [applyRegionFilter, applySetFilter, resetPagination, toggleDrawer]);

  return (
    <StyledContainer>
      {isDrawerOpen && (
        <Suspense>
          <FilterDrawer
            isOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
            selectedRegions={filters.region}
            selectedSets={filters.setId}
            onSubmitFilter={onSubmitFilter}
            onClearFilters={onClearFilters}
          />
        </Suspense>
      )}
      <SearchField placeholder={placeholder} setSearchQuery={setSearchQuery} />
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
