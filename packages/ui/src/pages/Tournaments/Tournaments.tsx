import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { StyledBar, StyledContainer } from "./Tournaments.styled";
import { TournamentSearchFilterBar } from "../../components/SearchFilterBar/TournamentSearchFilterBar";
import { Suspense, useCallback, useState } from "react";
import { TournamentList } from "./TournamentList/TournamentList";
import { TournamentListSkeleton } from "./TournamentList/TournamentList.skeleton";
import { SegmentedButton } from "../../components/SegmentedButton/SegmentedButton";
import React from "react";
import { useTournamentsContext } from "./TournamentsContext";

const OngoingTournamentList = React.lazy(() =>
  import("./TournamentList/TournamentStateList").then((m) => ({
    default: m.OngoingTournamentList,
  }))
);

export enum Tabs {
  Upcoming,
  Past,
}

const buttons = [
  {
    key: Tabs.Upcoming,
    text: "Upcoming",
  },
  {
    key: Tabs.Past,
    text: "Past",
  },
];

export const Tournaments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(Tabs.Upcoming);
  const { resetPagination } = useTournamentsContext();

  useDocumentTitle("Tourneys");

  const onChangeSelection = useCallback(
    (selected: Tabs) => {
      setSelectedTab(selected);
      resetPagination();
    },
    [resetPagination]
  );

  return (
    <StyledContainer>
      <OngoingTournamentList />
      <StyledBar>
        <TournamentSearchFilterBar
          placeholder="Search events"
          setSearchQuery={setSearchQuery}
        />
        <SegmentedButton<Tabs>
          buttons={buttons}
          onChangeSelectedButton={onChangeSelection}
        />
      </StyledBar>
      <Suspense fallback={<TournamentListSkeleton />}>
        <TournamentList selected={selectedTab} searchQuery={searchQuery} />
      </Suspense>
    </StyledContainer>
  );
};
