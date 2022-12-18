import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { BooleanResult, Lobby, Round } from "../../graphql/schema";
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
  const [{ data: stages }] = useQuery<StagesQueryResult>({
    query: STAGES_QUERY,
    variables: { tournamentId: Number(tournamentId) },
  });
  const [, createResults] = useMutation<BooleanResult, CreateResultVariables>(
    CREATE_RESULT_QUERY
  );
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [selectedLobby, setSelectedLobby] = useState<number>(0);
  const [, setLobbies] = useState<Lobby[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [playerResultInput, setPlayerResultInput] = useState<Lala>({});
  const [availableRounds, setAvailableRounds] = useState<{
    [key: string]: boolean;
  }>({});

  const onChangePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const [, playerId, roundId] = name.split("-").map(Number);
    const position = Number(event.target.value);
    setPlayerResultInput((currentResult) => {
      currentResult[playerId] = currentResult[playerId] || {};
      if (position === 0) {
        delete currentResult[playerId][roundId];
      } else {
        currentResult[playerId][roundId] = position;
      }
      return currentResult;
    });
  };

  const onSelectRound = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roundId = event.target.name;
    const checked = event.target.checked;
    setAvailableRounds((currentRounds) => {
      return {
        ...currentRounds,
        [roundId]: checked,
      };
    });
  };

  const saveResults = async () => {
    setSaveStatus("saving");
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
    const response = await createResults(result);
    if (response.error) {
      setSaveStatus(response.error.message);
    } else {
      setSaveStatus("saved");
    }
    setPlayerResultInput(() => ({}));
  };

  const [saveStatus, setSaveStatus] = useState<string>("waiting");

  return (
    <div>aa</div>
    // <Box display="flex" px="15%" pt={3} flexDir="column">
    //   <Flex gap={3}>
    //     <StageList
    //       stages={stages?.stages}
    //       selectedStage={selectedStage}
    //       onSelectStage={(id, stage) => {
    //         setLobbies(stage?.lobbies || []);
    //         setRounds(stage?.rounds || []);
    //         setSelectedStage(id);
    //       }}
    //     />
    //     <LobbyList
    //       stages={stages?.stages}
    //       selectedStage={selectedStage}
    //       onSelectLobby={(id) => {
    //         setSelectedLobby(id);
    //         setPlayerResultInput({});
    //       }}
    //       selectedLobby={selectedLobby}
    //     />
    //     <Section>
    //       <Text>Rounds</Text>
    //       <Flex flexDirection="column">
    //         {stages?.stages
    //           .find((stage) => stage.id === selectedStage)
    //           ?.rounds?.map((round) => (
    //             <Checkbox
    //               key={round.id}
    //               name={String(round.id)}
    //               onChange={onSelectRound}
    //             >
    //               {round.sequence + 1}
    //             </Checkbox>
    //           ))}
    //       </Flex>
    //     </Section>
    //     <Section>
    //       <Text>Players</Text>
    //       <TableContainer>
    //         <Table>
    //           <Tbody>
    //             {stages?.stages
    //               .find((stage) => stage.id === selectedStage)
    //               ?.lobbies?.find((lobby) => lobby.id === selectedLobby)
    //               ?.players?.map((player) => (
    //                 <Tr key={player.id} flexDirection="row">
    //                   <Td>{player.name}</Td>
    //                   {rounds.map((round) => (
    //                     <Td key={round.id}>
    //                       <Text>{round.sequence + 1}</Text>
    //                       <Input
    //                         key={round.id}
    //                         name={`${selectedLobby}-${player.id}-${round.id}`}
    //                         onChange={onChangePosition}
    //                         disabled={!availableRounds[round.id]}
    //                         maxLength={1}
    //                         width={12}
    //                       />
    //                     </Td>
    //                   ))}
    //                 </Tr>
    //               ))}
    //           </Tbody>
    //         </Table>
    //       </TableContainer>
    //       <Button onClick={saveResults}>Save</Button>
    //       <Text>{saveStatus}</Text>
    //     </Section>
    //   </Flex>
    // </Box>
  );
};
