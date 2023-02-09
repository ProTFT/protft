import React, { Suspense } from "react";
import { Tabs } from "../Tournaments";
import { UpcomingTournamentList } from "./TournamentStateList";

const PastTournamentList = React.lazy(() =>
  import("./TournamentStateList").then((m) => ({
    default: m.PastTournamentList,
  }))
);

interface Props {
  searchQuery: string;
  selected: Tabs;
}

export const TournamentList = ({ searchQuery, selected }: Props) => {
  return selected === Tabs.Upcoming ? (
    <UpcomingTournamentList searchQuery={searchQuery} />
  ) : (
    <Suspense fallback={null}>
      <PastTournamentList searchQuery={searchQuery} />
    </Suspense>
  );
};
