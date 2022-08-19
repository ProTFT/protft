import { Box, Flex, List, ListItem, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { PageTitle } from "../../components/PageTitle";
import { SectionTitle } from "../../components/SectionTitle";
import { TournamentStageSection } from "../../components/TournamentStageSection";
import { TournamentQueryResponse, TOURNAMENT_QUERY } from "./queries";

const TournamentInfoRow = ({
  info,
  title,
}: {
  title: string;
  info: string;
}) => {
  const borderColor = useColorModeValue(
    "rgba(0, 0, 0, 50%)",
    "rgba(255, 255, 255, 50%)"
  );
  return (
    <ListItem borderTop="1px" borderColor={borderColor} display="flex">
      <Box width="50%" textAlign="start">
        {title}
      </Box>
      <Box width="50%" textAlign="start">
        {info}
      </Box>
    </ListItem>
  );
};

export const Tournament = () => {
  const { tournamentId } = useParams();
  const [{ data }] = useQuery<TournamentQueryResponse>({
    query: TOURNAMENT_QUERY,
    variables: { id: Number(tournamentId) },
  });
  useEffect(() => {
    document.title = `${data?.tournament.name}`;
  }, [data?.tournament.name]);

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
          <TournamentInfoRow
            title="Set"
            info={`${data?.tournament.set.id} - ${data?.tournament.set.name}`}
          />
          <TournamentInfoRow
            title="Region"
            info={`${data?.tournament.region}`}
          />
          <TournamentInfoRow title="Host" info={`${data?.tournament.host}`} />
          <TournamentInfoRow
            title="Participants"
            info={`${data?.tournament.participantsNumber}`}
          />
          <TournamentInfoRow
            title="Prize pool"
            info={`$${data?.tournament.prizePool}`}
          />
          <TournamentInfoRow
            title="Date"
            info={`${new Date(
              data?.tournament.startDate
            ).toLocaleDateString()} -${" "}
            ${new Date(data?.tournament.endDate).toLocaleDateString()}`}
          />
        </List>
        <SectionTitle text="Stages" />
        <TournamentStageSection stages={data?.tournament.stages} />
      </Flex>
    </Box>
  );
};
