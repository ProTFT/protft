import { Box, List } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TournamentListItem } from "../../components/TournamentListItem";
import { Tournament } from "../../graphql/schema";
import { useQuery } from "urql";
import { TournamentsQueryResult, TOURNAMENTS_QUERY } from "./queries";
import { useEffect } from "react";

export const Tournaments = () => {
  const [{ data }] = useQuery<TournamentsQueryResult>({
    query: TOURNAMENTS_QUERY,
  });
  useEffect(() => {
    document.title = "ProTFT";
  }, []);
  return (
    <Box textAlign="center" display="flex" px="15%" pt={3}>
      <List width="100%">
        {data?.tournaments.map((tournament: Tournament) => (
          <Link key={tournament.id} to={String(tournament.id)}>
            <TournamentListItem tournament={tournament} />
          </Link>
        ))}
      </List>
    </Box>
  );
};
