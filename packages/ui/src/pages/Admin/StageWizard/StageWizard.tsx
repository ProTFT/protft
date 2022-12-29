import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { Stage } from "../../../graphql/schema";
import {
  StyledButton,
  StyledContainer,
  StyledInput,
  StyledSection,
  StyledText,
  StyledTitle,
} from "../TournamentWizard/TournamentWizard.styled";
import {
  CreateLobbyResult,
  CreateLobbyVariables,
  CreateRoundResult,
  CreateRoundVariables,
  CreateStageResult,
  CreateStageVariables,
  CREATE_LOBBY_QUERY,
  CREATE_ROUND_QUERY,
  CREATE_STAGE_QUERY,
  StagesQueryResult,
  STAGES_QUERY,
} from "./queries";

interface StageListProps {
  stages?: Stage[];
  selectedStage: number;
  onSelectStage: (selectedId: number, stage?: Stage) => void;
}

export const StageList = ({
  stages,
  selectedStage,
  onSelectStage,
}: StageListProps) => {
  return (
    <StyledSection>
      <StyledTitle>Current Stages</StyledTitle>
      {stages?.map((stage) => (
        <StyledText
          key={stage.id}
          highlighted={stage.id === selectedStage}
          onClick={() => onSelectStage(stage.id, stage)}
        >
          {stage.name}
        </StyledText>
      ))}
    </StyledSection>
  );
};

interface LobbyListProps {
  stages?: Stage[];
  selectedStage: number;
  selectedLobby: number;
  onSelectLobby: (selectedId: number) => void;
}

export const LobbyList = ({
  selectedStage,
  stages,
  selectedLobby,
  onSelectLobby,
}: LobbyListProps) => {
  return (
    <StyledSection>
      <StyledTitle>Current Lobbies</StyledTitle>
      {stages
        ?.find((stage) => stage.id === selectedStage)
        ?.lobbies?.map((lobby) => (
          <StyledText
            key={lobby.id}
            highlighted={lobby.id === selectedLobby}
            onClick={() => onSelectLobby(lobby.id)}
          >
            {lobby.name}
          </StyledText>
        ))}
    </StyledSection>
  );
};

export const StageWizard = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [saveStageStatus, setSaveStageStatus] = useState<string>("waiting");
  const [stageInput, setStageInput] = useState<Partial<CreateStageVariables>>(
    {}
  );
  const [lobbyInput, setLobbyInput] = useState<Partial<CreateLobbyVariables>>(
    {}
  );

  const [roundInput, setRoundInput] = useState<Partial<CreateRoundVariables>>(
    {}
  );

  const [{ data: stages }, fetchStages] = useQuery<StagesQueryResult>({
    query: STAGES_QUERY,
    variables: { tournamentId: Number(tournamentId) },
    requestPolicy: "cache-and-network",
  });

  const [, createStage] = useMutation<CreateStageResult, CreateStageVariables>(
    CREATE_STAGE_QUERY
  );
  const [, createLobby] = useMutation<CreateLobbyResult, CreateLobbyVariables>(
    CREATE_LOBBY_QUERY
  );

  const [, createRound] = useMutation<CreateRoundResult, CreateRoundVariables>(
    CREATE_ROUND_QUERY
  );

  const saveStage = async () => {
    const { name, sequence, pointSchemaId, isFinal } = stageInput;
    if (name && sequence && pointSchemaId) {
      const payload = {
        tournamentId: Number(tournamentId),
        name,
        sequence: Number(sequence),
        pointSchemaId: Number(pointSchemaId),
        isFinal: isFinal || false,
        lobbies: [],
      };
      setSaveStageStatus("saving");
      const result = await createStage(payload);
      if (result.error) {
        setSaveStageStatus("error");
        console.log(result.error);
      } else {
        setSaveStageStatus("saved");
        fetchStages();
      }
    }
  };

  const saveLobby = async () => {
    const { name, sequence } = lobbyInput;
    if (name && sequence) {
      const payload = {
        stageId: Number(selectedStage),
        name,
        sequence: Number(sequence),
      };
      await createLobby(payload);
      fetchStages();
    }
  };

  const saveRound = async () => {
    const { sequence } = roundInput;
    if (sequence) {
      const payload = {
        stageId: Number(selectedStage),
        sequence: Number(sequence),
      };
      await createRound(payload);
      fetchStages();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStageInput({
      ...stageInput,
      [event.target.name]: event.target.value || event.target.checked,
    });
  };

  const handleLobbyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLobbyInput({
      ...lobbyInput,
      [event.target.name]: event.target.value || event.target.checked,
    });
  };

  const handleRoundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoundInput({
      ...roundInput,
      [event.target.name]: event.target.value || event.target.checked,
    });
  };

  const goNext = () => {
    navigate(`lobbies`);
  };

  return (
    <StyledContainer>
      <StageList
        stages={stages?.stages}
        selectedStage={selectedStage}
        onSelectStage={setSelectedStage}
      />
      <StyledSection>
        <StyledTitle>Current Lobbies</StyledTitle>
        {stages?.stages
          .find((stage) => stage.id === selectedStage)
          ?.lobbies?.map((lobby) => (
            <StyledText key={lobby.id}>{lobby.name}</StyledText>
          ))}
      </StyledSection>
      <StyledSection>
        <StyledTitle>Current Rounds</StyledTitle>
        {stages?.stages
          .find((stage) => stage.id === selectedStage)
          ?.rounds?.map((round) => (
            <StyledText key={round.id}>{round.sequence}</StyledText>
          ))}
      </StyledSection>
      <StyledSection>
        <StyledTitle>Add Stage</StyledTitle>
        <StyledText>Name</StyledText>
        <StyledInput name="name" onChange={handleChange} />
        <StyledText>Sequence</StyledText>
        <StyledInput name="sequence" onChange={handleChange} />
        <StyledText>is final?</StyledText>
        <input type="checkbox" name="isFinal" onChange={handleChange} />
        <StyledText>Point Schema Id</StyledText>
        <StyledInput name="pointSchemaId" onChange={handleChange} />
        <StyledButton onClick={saveStage}>Save</StyledButton>
        <StyledText>{saveStageStatus}</StyledText>
      </StyledSection>
      <StyledSection>
        <StyledTitle>Add Lobby</StyledTitle>
        <StyledText>Name</StyledText>
        <StyledInput name="name" onChange={handleLobbyChange} />
        <StyledText>Sequence</StyledText>
        <StyledInput name="sequence" onChange={handleLobbyChange} />
        <StyledButton onClick={saveLobby}>Save</StyledButton>
      </StyledSection>
      <StyledSection>
        <StyledTitle>Add Round</StyledTitle>
        <StyledText>Sequence</StyledText>
        <StyledInput name="sequence" onChange={handleRoundChange} />
        <StyledButton onClick={saveRound}>Save</StyledButton>
      </StyledSection>
      <StyledButton onClick={goNext}>Next</StyledButton>
    </StyledContainer>
  );
};
