import {
  Box,
  Divider,
  Flex,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Tournament } from "../../graphql/schema";
import {
  TournamentOverviewResult,
  TOURNAMENTS_OVERVIEW_QUERY,
} from "./queries";
import { useQuery } from "urql";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const TournamentContainer = ({
  title,
  items,
}: {
  color: string;
  title: string;
  items?: Tournament[];
}) => {
  const backgroundColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Box
      bgColor={backgroundColor}
      padding={3}
      borderWidth="3px"
      borderRadius="10px"
      borderColor="white"
    >
      <Text fontWeight="bold">{title}</Text>
      <Divider />
      <List spacing={3}>
        {items?.map((tournament) => (
          <ListItem key={tournament.id} maxWidth="25ch" overflow="auto">
            <Link to={`/tournaments/${tournament.id}`}>
              <Text textAlign="start" textDecor="underline">
                {tournament.name}
              </Text>
            </Link>
            <Flex justifyContent="space-between">
              <Text fontSize="md" textAlign="start">
                {new Date(tournament.startDate).toLocaleDateString() +
                  " - " +
                  new Date(tournament.endDate).toLocaleDateString()}
              </Text>
              <Text fontSize="md">{tournament.region}</Text>
            </Flex>
            <Divider />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export const Home = () => {
  const [{ data }] = useQuery<TournamentOverviewResult>({
    query: TOURNAMENTS_OVERVIEW_QUERY,
  });

  useEffect(() => {
    document.title = "TFTourney";
  }, []);

  return (
    <Box
      textAlign="center"
      fontSize="xl"
      height="100%"
      verticalAlign="center"
      px="5%"
      display="flex"
      flexDir="column"
      gap={100}
    >
      <Text fontSize="6xl">Your hub for TFT Esports</Text>
      <Flex gap={10} justifyContent="center">
        <TournamentContainer
          color="red"
          title="Past tournaments"
          items={data?.tournamentOverview.pastTournaments}
        />
        <TournamentContainer
          color="green"
          title="Live tournaments"
          items={data?.tournamentOverview.liveTournaments}
        />
        <TournamentContainer
          color="blue"
          title="Upcoming tournaments"
          items={data?.tournamentOverview.upcomingTournaments}
        />
      </Flex>
    </Box>
  );
};
