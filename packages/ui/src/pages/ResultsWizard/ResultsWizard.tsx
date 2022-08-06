import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { StagesQueryResult, STAGES_QUERY } from "../StageWizard/queries";
import { LobbyList, StageList } from "../StageWizard/StageWizard";

export const ResultsWizard = () => {
  const { tournamentId } = useParams();
  const [{ data: stages }, fetchStages] = useQuery<StagesQueryResult>({
    query: STAGES_QUERY,
    variables: { tournamentId: Number(tournamentId) },
  });
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [selectedLobby, setSelectedLobby] = useState<number>(0);

  return (
    <Box display="flex" px="15%" pt={3} flexDir="column">
      <Flex gap={3}>
        <StageList
          stages={stages?.stages}
          selectedStage={selectedStage}
          onSelectStage={setSelectedStage}
        />
        <LobbyList
          stages={stages?.stages}
          selectedStage={selectedStage}
          onSelectLobby={setSelectedLobby}
          selectedLobby={selectedLobby}
        />
      </Flex>
    </Box>
  );
};
