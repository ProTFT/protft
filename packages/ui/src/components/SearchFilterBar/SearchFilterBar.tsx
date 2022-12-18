import { useCallback, useState } from "react";
import { Drawer } from "../Drawer/Drawer";
import { TextIconHorizontalContainer } from "../Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { SearchInput } from "../SearchInput/SearchInput";
import {
  StyledAppliedFilter,
  StyledAppliedFilterContainer,
  StyledContainer,
  StyledFilterBar,
  StyledFilterText,
} from "./SearchFilterBar.styled";

export const StyledSearchFilterBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((current) => !current);
  }, []);

  return (
    <StyledContainer>
      <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <SearchInput placeholder="Search events" />
      <StyledFilterBar>
        <TextIconHorizontalContainer onClick={toggleDrawer}>
          <img src="./filter.png" alt="filter" />
          <StyledFilterText>Filter</StyledFilterText>
        </TextIconHorizontalContainer>
        <StyledAppliedFilterContainer>
          <StyledAppliedFilter>Brazil</StyledAppliedFilter>
          <StyledAppliedFilter>Brazil</StyledAppliedFilter>
        </StyledAppliedFilterContainer>
      </StyledFilterBar>
    </StyledContainer>
  );
};
