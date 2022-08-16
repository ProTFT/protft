import { Box, Flex, List, ListItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { PageTitle } from "../../components/PageTitle";
import { SectionTitle } from "../../components/SectionTitle";
import { TournamentStageSection } from "../../components/TournamentStageSection";
import { TournamentQueryResponse, TOURNAMENT_QUERY } from "./queries";

export const Tournament = () => {
  const { tournamentId } = useParams();
  const [{ data }] = useQuery<TournamentQueryResponse>({
    query: TOURNAMENT_QUERY,
    variables: { id: Number(tournamentId) },
  });
  return (
    <Box textAlign="center" fontSize="xl" display="flex">
      <Flex
        flex={10}
        flexGrow={0}
        flexDirection="column"
        boxSize="100%"
        position="initial"
        gap={10}
        scrollBehavior="auto"
        paddingLeft="20%"
        paddingRight="20%"
      >
        <PageTitle text={data?.tournament.name} />
        <List width="80%" alignSelf="center">
          <ListItem display="flex">
            <Box width="50%" textAlign="start">
              Set
            </Box>
            <Box width="50%" textAlign="start">
              {data?.tournament.set.id} - {data?.tournament.set.name}
            </Box>
          </ListItem>
          <ListItem
            borderTop="1px"
            borderColor="rgba(255, 255, 255, 50%)"
            display="flex"
          >
            <Box width="50%" textAlign="start">
              Region
            </Box>
            <Box width="50%" textAlign="start">
              {data?.tournament.region}
            </Box>
          </ListItem>
          <ListItem
            borderTop="1px"
            borderColor="rgba(255, 255, 255, 50%)"
            display="flex"
          >
            <Box width="50%" textAlign="start">
              Host
            </Box>
            <Box width="50%" textAlign="start">
              {data?.tournament.host}
            </Box>
          </ListItem>
          <ListItem
            borderTop="1px"
            borderColor="rgba(255, 255, 255, 50%)"
            display="flex"
          >
            <Box width="50%" textAlign="start">
              Participants
            </Box>
            <Box width="50%" textAlign="start">
              {data?.tournament.participantsNumber}
            </Box>
          </ListItem>
          <ListItem
            borderTop="1px"
            borderColor="rgba(255, 255, 255, 50%)"
            display="flex"
          >
            <Box width="50%" textAlign="start">
              Prize pool
            </Box>
            <Box width="50%" textAlign="start">
              ${data?.tournament.prizePool}
            </Box>
          </ListItem>
          <ListItem
            borderTop="1px"
            borderColor="rgba(255, 255, 255, 50%)"
            display="flex"
          >
            <Box width="50%" textAlign="start">
              Date
            </Box>
            <Box width="50%" textAlign="start">
              {new Date(data?.tournament.startDate).toLocaleDateString()} -{" "}
              {new Date(data?.tournament.endDate).toLocaleDateString()}
            </Box>
          </ListItem>
        </List>
        <SectionTitle text="Stages" />
        <TournamentStageSection stages={data?.tournament.stages} />
      </Flex>
    </Box>
  );
};
