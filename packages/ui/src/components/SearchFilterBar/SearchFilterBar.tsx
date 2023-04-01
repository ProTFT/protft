import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { TextIconHorizontalContainer } from "../Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { SearchInput } from "../SearchInput/SearchInput";
import {
  StyledAppliedFilter,
  StyledAppliedFilterContainer,
  StyledContainer,
  StyledFilterBar,
  StyledFilterText,
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

export const StyledSearchFilterBar = ({
  placeholder,
  setSearchQuery,
}: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let timeout = useRef<ReturnType<typeof setTimeout>>();
  const isDrawerAvailable = false;

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
      <FilterDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <SearchInput placeholder={placeholder} onChange={onChangeSearchInput} />
      {isDrawerAvailable ?? (
        <StyledFilterBar>
          <TextIconHorizontalContainer onClick={toggleDrawer}>
            <img src="/filter.png" alt="filter" />
            <StyledFilterText>Filter</StyledFilterText>
          </TextIconHorizontalContainer>
          <StyledAppliedFilterContainer>
            <StyledAppliedFilter>Brazil</StyledAppliedFilter>
            <StyledAppliedFilter>Brazil</StyledAppliedFilter>
          </StyledAppliedFilterContainer>
        </StyledFilterBar>
      )}
    </StyledContainer>
  );
};
