import { useQuery } from "urql";
import { createContext, useContext } from "react";
import { QueryTournamentBySlugArgs, TournamentQuery } from "../../gql/graphql";
import { TOURNAMENT_BY_SLUG_QUERY } from "../Tournament/queries";

type TournamentContext = TournamentQuery["tournamentBySlug"] | undefined;

const tournamentContext = createContext<TournamentContext>(
  {} as TournamentContext
);

export function TournamentProvider({
  children,
  slug,
}: React.PropsWithChildren<{
  slug?: string;
}>) {
  const tournament = useProvideTournament(slug);
  return (
    <tournamentContext.Provider value={tournament}>
      {children}
    </tournamentContext.Provider>
  );
}

export const useTournamentContext = () => {
  return useContext(tournamentContext);
};

export const useProvideTournament = (slug?: string): TournamentContext => {
  const [{ data: tournamentData }] = useQuery<
    TournamentQuery,
    QueryTournamentBySlugArgs
  >({
    query: TOURNAMENT_BY_SLUG_QUERY,
    variables: { slug: slug! },
    pause: !slug,
  });

  return tournamentData?.tournamentBySlug;
};
