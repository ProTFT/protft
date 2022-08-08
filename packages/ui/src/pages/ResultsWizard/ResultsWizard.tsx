import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import {
  BooleanResult,
  Lobby,
  PlayerLobbyResultInput,
  PositionResultInput,
  Round,
} from "../../graphql/schema";
import { StagesQueryResult, STAGES_QUERY } from "../StageWizard/queries";
import { LobbyList, StageList } from "../StageWizard/StageWizard";
import { Section } from "../TournamentWizard/TournamentWizard";
import { CreateResultVariables, CREATE_RESULT_QUERY } from "./queries";

interface Lala {
  [key: number]: PositionResult;
}

interface PositionResult {
  [key: number]: number;
}

export const ResultsWizard = () => {
  const { tournamentId } = useParams();
  const [{ data: stages }, fetchStages] = useQuery<StagesQueryResult>({
    query: STAGES_QUERY,
    variables: { tournamentId: Number(tournamentId) },
  });
  const [, createResults] = useMutation<BooleanResult, CreateResultVariables>(
    CREATE_RESULT_QUERY
  );
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [selectedLobby, setSelectedLobby] = useState<number>(0);
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [playerResultInput, setPlayerResultInput] = useState<Lala>({});

  const onChangePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const [, playerId, roundId] = name.split("-").map(Number);
    const position = Number(event.target.value);
    setPlayerResultInput((currentResult) => {
      currentResult[playerId] = currentResult[playerId] || {};
      currentResult[playerId][roundId] = position;
      return currentResult;
    });
  };

  const saveResults = async () => {
    const playerIds = Object.keys(playerResultInput).map(Number);
    const positionInput = playerIds.map((playerId: number) => {
      const playerResultMap = playerResultInput[playerId];
      const roundIds = Object.keys(playerResultMap).map(Number);
      const positionMaps = roundIds.map((roundId) => ({
        roundId,
        position: playerResultInput[playerId][roundId],
      }));
      return {
        playerId,
        positions: positionMaps,
      };
    });
    const result = {
      lobbyId: selectedLobby,
      players: positionInput,
    };
    await createResults(result);
    setPlayerResultInput(() => ({}));
  };

  return (
    <Box display="flex" px="15%" pt={3} flexDir="column">
      <Flex gap={3}>
        <StageList
          stages={stages?.stages}
          selectedStage={selectedStage}
          onSelectStage={(id, stage) => {
            setLobbies(stage?.lobbies || []);
            setRounds(stage?.rounds || []);
            setSelectedStage(id);
          }}
        />
        <LobbyList
          stages={stages?.stages}
          selectedStage={selectedStage}
          onSelectLobby={(id) => {
            setSelectedLobby(id);
            setPlayerResultInput({});
          }}
          selectedLobby={selectedLobby}
        />
        <Section>
          <Text>Rounds</Text>
          {stages?.stages
            .find((stage) => stage.id === selectedStage)
            ?.rounds?.map((round) => (
              <Text key={round.id}>{round.sequence}</Text>
            ))}
        </Section>
        <Section>
          <Text>Players</Text>
          {stages?.stages
            .find((stage) => stage.id === selectedStage)
            ?.lobbies?.find((lobby) => lobby.id === selectedLobby)
            ?.players.map((player) => (
              <Flex key={player.id} flexDirection="row">
                <Text>{player.name}</Text>
                {rounds.map((round) => (
                  <div key={round.id}>
                    <Text>{round.sequence}</Text>
                    <Input
                      key={round.id}
                      name={`${selectedLobby}-${player.id}-${round.id}`}
                      onChange={onChangePosition}
                      maxLength={1}
                      width={12}
                    />
                  </div>
                ))}
              </Flex>
            ))}
          <Button onClick={saveResults}>Save</Button>
        </Section>
      </Flex>
    </Box>
  );
};
