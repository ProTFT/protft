import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { BooleanResult, Lobby, Round } from "../../../graphql/schema";
import { StagesQueryResult, STAGES_QUERY } from "../StageWizard/queries";
import { LobbyList, StageList } from "../StageWizard/StageWizard";
import {
  StyledButton,
  StyledContainer,
  StyledInput,
  StyledSection,
  StyledText,
  StyledTitle,
} from "../TournamentWizard/TournamentWizard.styled";
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
    <StyledContainer>
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
      <StyledSection>
        <StyledTitle>Rounds</StyledTitle>
        <StyledSection>
          {stages?.stages
            .find((stage) => stage.id === selectedStage)
            ?.rounds?.map((round) => (
              <div key={round.id}>
                <StyledText>{round.sequence + 1}</StyledText>
                <input
                  key={round.id}
                  name={String(round.id)}
                  onChange={onSelectRound}
                  type="checkbox"
                />
              </div>
            ))}
        </StyledSection>
      </StyledSection>
      <StyledSection>
        <StyledTitle>Players</StyledTitle>
        <table>
          <tbody>
            {stages?.stages
              .find((stage) => stage.id === selectedStage)
              ?.lobbies?.find((lobby) => lobby.id === selectedLobby)
              ?.players?.map((player) => (
                <tr key={player.id}>
                  <td>
                    <StyledText>{player.name}</StyledText>
                  </td>
                  {rounds.map((round) => (
                    <td key={round.id}>
                      <StyledText>{round.sequence + 1}</StyledText>
                      <StyledInput
                        key={round.id}
                        name={`${selectedLobby}-${player.id}-${round.id}`}
                        onChange={onChangePosition}
                        disabled={!availableRounds[round.id]}
                        maxLength={1}
                        width={12}
                      />
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        <StyledButton onClick={saveResults}>Save</StyledButton>
        <StyledText>{saveStatus}</StyledText>
      </StyledSection>
    </StyledContainer>
  );
};
