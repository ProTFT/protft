import React, { Suspense } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { Tabs } from "../Tournaments";
import { useTournamentsContext } from "../TournamentsContext";
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

const ITEMS_PER_PAGE = 20;

export const TournamentList = ({ searchQuery, selected }: Props) => {
  const { filters, page, loadMore } = useTournamentsContext();
  const { paginationArgs } = usePagination(page, ITEMS_PER_PAGE);

  return selected === Tabs.Upcoming ? (
    <UpcomingTournamentList
      searchQuery={searchQuery}
      filters={filters}
      pagination={paginationArgs}
      onLoadMore={loadMore}
    />
  ) : (
    <Suspense fallback={null}>
      <PastTournamentList
        searchQuery={searchQuery}
        filters={filters}
        pagination={paginationArgs}
        onLoadMore={loadMore}
      />
    </Suspense>
  );
};
