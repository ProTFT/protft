import { useMemo, useState } from "react";
import { useQuery } from "urql";
import { ComingSoon } from "../../components/ComingSoon/ComingSoon";
import {
  PlayersQueryWithStatsArgs,
  PlayersQueryWithStatsResult,
  PLAYERS_QUERY_WITH_STATS,
} from "./queries";
// import { SuspenseElement } from "../../components/SuspendedPage";

export const Stats = () => {
  const [page, setPage] = useState(0);
  const paginationArgs = useMemo(
    () => ({
      skip: page * 10,
      take: 10,
    }),
    [page]
  );

  const [regionInput, setRegionInput] = useState("");
  const [setInput, setSetInput] = useState("");

  const [{ data: stats }] = useQuery<
    PlayersQueryWithStatsResult,
    PlayersQueryWithStatsArgs
  >({
    query: PLAYERS_QUERY_WITH_STATS,
    variables: {
      region: regionInput,
      setId: Number(setInput),
      ...paginationArgs,
    },
  });

  return <ComingSoon />;
};
