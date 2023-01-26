import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import {
  StyledBar,
  StyledButtonContainer,
  StyledContainer,
} from "./Tournaments.styled";
import { StyledSearchFilterBar } from "../../components/SearchFilterBar/SearchFilterBar";
import { Suspense, useCallback, useState } from "react";
import {
  OngoingTournamentList,
  TournamentList,
} from "./TournamentList/TournamentList";
import { TournamentListSkeleton } from "./TournamentList/TournamentList.skeleton";
import { ButtonVariant, ProTFTButton } from "../../components/Button/Button";
import { colors } from "../../design/colors";
import { useIsMobile } from "../../hooks/useIsMobile";

export enum Tabs {
  Upcoming,
  Past,
}

const selectedButtonProperties = {
  variant: ButtonVariant.Primary,
};

const unselectedButtonProperties = {
  variant: ButtonVariant.Transparent,
  buttonColor: colors.blackBackground,
  textColor: colors.white,
};

export const Tournaments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(Tabs.Upcoming);

  const buttonProperties = useCallback(
    (button: Tabs) => {
      if (selectedTab === button) {
        return selectedButtonProperties;
      }
      return unselectedButtonProperties;
    },
    [selectedTab]
  );

  const onSelectTab = useCallback(
    (button: Tabs) => () => {
      setSelectedTab(button);
    },
    []
  );

  useDocumentTitle("Tourneys");

  const isMobile = useIsMobile();

  return (
    <StyledContainer>
      <OngoingTournamentList />
      <StyledBar>
        <StyledSearchFilterBar
          placeholder="Search events"
          setSearchQuery={setSearchQuery}
        />
        <StyledButtonContainer>
          <ProTFTButton
            {...(isMobile && { width: "100%" })}
            onClick={onSelectTab(Tabs.Upcoming)}
            {...buttonProperties(Tabs.Upcoming)}
          >
            Upcoming
          </ProTFTButton>
          <ProTFTButton
            {...(isMobile && { width: "100%" })}
            onClick={onSelectTab(Tabs.Past)}
            {...buttonProperties(Tabs.Past)}
          >
            Past
          </ProTFTButton>
        </StyledButtonContainer>
      </StyledBar>
      <Suspense fallback={<TournamentListSkeleton />}>
        <TournamentList selected={selectedTab} searchQuery={searchQuery} />
      </Suspense>
    </StyledContainer>
  );
};
