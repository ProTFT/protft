import React, { Suspense } from "react";
import { Tabs, TournamentFilters } from "../Tournaments";
import { UpcomingTournamentList } from "./TournamentStateList";

const PastTournamentList = React.lazy(() =>
  import("./TournamentStateList").then((m) => ({
    default: m.PastTournamentList,
  }))
);

interface Props {
  searchQuery: string;
  selected: Tabs;
  filters: TournamentFilters;
}

export const TournamentList = ({ searchQuery, selected, filters }: Props) => {
  return selected === Tabs.Upcoming ? (
    <UpcomingTournamentList searchQuery={searchQuery} filters={filters} />
  ) : (
    <Suspense fallback={null}>
      <PastTournamentList searchQuery={searchQuery} filters={filters} />
    </Suspense>
  );
};
