import { Flex, VStack, Box } from "@chakra-ui/react";
import { Tournament } from "../../graphql/schema";

interface TournamentListProps {
  tournament: Tournament;
}

export const TournamentListItem = ({ tournament }: TournamentListProps) => (
  <Flex boxShadow="5px 5px 10px 1px rgb(0 0 0 / 50%)" marginTop="10px">
    <Box p={5} flex={1} alignSelf="center">
      <VStack alignItems="start">
        <Box fontWeight="bold" textTransform="uppercase">
          {tournament.name}
        </Box>
      </VStack>
    </Box>
    <Box p={5} flex={1} alignSelf="center">
      <VStack height="100%">
        <Box>Participants</Box>
        <Box>{tournament.participantsNumber}</Box>
      </VStack>
    </Box>
    <Box p={5} flex={1} alignSelf="center">
      <VStack>
        <Box>Prize</Box>
        <Box>${tournament.prizePool}</Box>
      </VStack>
    </Box>
  </Flex>
);
