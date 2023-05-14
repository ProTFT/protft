import { useCallback } from "react";
import { useClient, useQuery } from "urql";
import { Tournament } from "../../../graphql/schema";
import { AsyncDataSelect } from "../DataSelect/AsyncDataSelect";
import {
  TournamentsQueryResponse,
  TOURNAMENTS_WITH_STATS_AND_FILTER_QUERY,
  TOURNAMENTS_WITH_STATS_QUERY,
} from "../DataSelect/queries";

interface Props {
  value: number[];
  onValueChange: (newValue: number[] | undefined) => void;
}

type SelectTournament = Pick<Tournament, "id" | "name" | "set">;

export const TournamentSelect = ({ value, onValueChange }: Props) => {
  const [{ data, fetching }] = useQuery<TournamentsQueryResponse>({
    query: TOURNAMENTS_WITH_STATS_QUERY,
  });

  const { query } = useClient();

  const loadOptions = useCallback(
    async (input: string): Promise<SelectTournament[]> => {
      const response = await query<TournamentsQueryResponse>(
        TOURNAMENTS_WITH_STATS_AND_FILTER_QUERY,
        {
          searchQuery: input,
        }
      ).toPromise();
      return response.data?.tournamentsWithStats || [];
    },
    [query]
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
      placeholder="Golden Spatula Cup #1, Mid-set Finale"
      isMulti
      loadOptions={loadOptions}
    />
  );
};
