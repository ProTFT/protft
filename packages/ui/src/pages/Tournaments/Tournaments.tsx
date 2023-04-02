import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { StyledBar, StyledContainer } from "./Tournaments.styled";
import { StyledSearchFilterBar } from "../../components/SearchFilterBar/SearchFilterBar";
import { Suspense, useCallback, useState } from "react";
import { TournamentList } from "./TournamentList/TournamentList";
import { TournamentListSkeleton } from "./TournamentList/TournamentList.skeleton";
import { SegmentedButton } from "../../components/SegmentedButton/SegmentedButton";
import React from "react";

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

export interface TournamentFilters {
  region: string[];
  setId: number[];
}

export const Tournaments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<TournamentFilters>({
    region: [],
    setId: [],
  });
  const [selectedTab, setSelectedTab] = useState(Tabs.Upcoming);

  useDocumentTitle("Tourneys");

  const onChangeSelection = useCallback(
    (selected: Tabs) => setSelectedTab(selected),
    []
  );

  return (
    <StyledContainer>
      <OngoingTournamentList />
      <StyledBar>
        <StyledSearchFilterBar
          placeholder="Search events"
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
        />
        <SegmentedButton<Tabs>
          buttons={buttons}
          onChangeSelectedButton={onChangeSelection}
        />
      </StyledBar>
      <Suspense fallback={<TournamentListSkeleton />}>
        <TournamentList
          selected={selectedTab}
          searchQuery={searchQuery}
          filters={filters}
        />
      </Suspense>
    </StyledContainer>
  );
};
