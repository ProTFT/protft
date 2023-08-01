import { useCallback } from "react";
import { useClient, useQuery } from "urql";
import {
  ListTournamentsWithStatsAndFilterQuery,
  ListTournamentsWithStatsAndFilterQueryVariables,
  ListTournamentsWithStatsQuery,
  ListTournamentsWithStatsQueryVariables,
} from "../../../gql/graphql";
import { Tournament } from "../../../graphql/schema";
import { AsyncDataSelect } from "../DataSelect/AsyncDataSelect";
import {
  TOURNAMENTS_WITH_STATS_AND_FILTER_QUERY,
  TOURNAMENTS_WITH_STATS_QUERY,
} from "../DataSelect/queries";

interface Props {
  value: number[];
  onValueChange: (newValue: number[] | undefined) => void;
  setIds?: number[];
}

type SelectTournament = Pick<Tournament, "id" | "name" | "set">;

export const TournamentSelect = ({ value, onValueChange, setIds }: Props) => {
  const [{ data, fetching }] = useQuery<
    ListTournamentsWithStatsQuery,
    ListTournamentsWithStatsQueryVariables
  >({
    query: TOURNAMENTS_WITH_STATS_QUERY,
    variables: {
      setIds,
    },
  });

  const { query } = useClient();

  const loadOptions = useCallback(
    async (input: string): Promise<SelectTournament[]> => {
      const response = await query<
        ListTournamentsWithStatsAndFilterQuery,
        ListTournamentsWithStatsAndFilterQueryVariables
      >(TOURNAMENTS_WITH_STATS_AND_FILTER_QUERY, {
        searchQuery: input,
        setIds,
      }).toPromise();
      return response.data?.tournamentsWithStats || [];
    },
    [query, setIds]
  );

  const getPrefix = useCallback((data: SelectTournament) => data.set.name, []);

  return (
    <AsyncDataSelect<number[], SelectTournament>
      data={data?.tournamentsWithStats}
      valueKey="id"
      labelKey="name"
      value={value}
      onValueChange={onValueChange}
      isLoading={fetching}
      prefix={getPrefix}
      placeholder="Type to search"
      isMulti
      loadOptions={loadOptions}
    />
  );
};
