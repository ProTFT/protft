import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { Stage } from "../../graphql/schema";
import { Section } from "../TournamentWizard/TournamentWizard";
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
    <p>aa</p>
    // <Section>
    //   <Text>Current Stages</Text>
    //   {stages?.map((stage) => (
    //     <Text
    //       textColor={stage.id === selectedStage ? "red" : "white"}
    //       key={stage.id}
    //       onClick={() => onSelectStage(stage.id, stage)}
    //     >
    //       {stage.name}
    //     </Text>
    //   ))}
    // </Section>
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
    <Section>
      <p>Current Lobbies</p>
      {stages
        ?.find((stage) => stage.id === selectedStage)
        ?.lobbies?.map((lobby) => (
          <p>aa</p>
          // <Text
          //   key={lobby.id}
          //   textColor={lobby.id === selectedLobby ? "red" : "white"}
          //   onClick={() => onSelectLobby(lobby.id)}
          // >
          //   {lobby.name}
          // </Text>
        ))}
    </Section>
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
    <p>aa</p>
    // <Box display="flex" px="15%" pt={3} flexDir="column">
    //   <Flex gap={3}>
    //     <StageList
    //       stages={stages?.stages}
    //       selectedStage={selectedStage}
    //       onSelectStage={setSelectedStage}
    //     />
    //     <Section>
    //       <Text>Current Lobbies</Text>
    //       {stages?.stages
    //         .find((stage) => stage.id === selectedStage)
    //         ?.lobbies?.map((lobby) => (
    //           <Text key={lobby.id}>{lobby.name}</Text>
    //         ))}
    //     </Section>
    //     <Section>
    //       <Text>Current Rounds</Text>
    //       {stages?.stages
    //         .find((stage) => stage.id === selectedStage)
    //         ?.rounds?.map((round) => (
    //           <Text key={round.id}>{round.sequence}</Text>
    //         ))}
    //     </Section>
    //     <Section>
    //       <Text>Add Stage</Text>
    //       <Text>Name</Text>
    //       <Input name="name" onChange={handleChange} />
    //       <Text>Sequence</Text>
    //       <Input name="sequence" onChange={handleChange} />
    //       <Text>is final?</Text>
    //       <Checkbox name="isFinal" onChange={handleChange}></Checkbox>
    //       <Text>Point Schema Id</Text>
    //       <Input name="pointSchemaId" onChange={handleChange} />
    //       <Button onClick={saveStage}>Save</Button>
    //       <Text>{saveStageStatus}</Text>
    //     </Section>
    //     <Section>
    //       <Text>Add Lobby</Text>
    //       <Text>Name</Text>
    //       <Input name="name" onChange={handleLobbyChange} />
    //       <Text>Sequence</Text>
    //       <Input name="sequence" onChange={handleLobbyChange} />
    //       <Button onClick={saveLobby}>Save</Button>
    //     </Section>
    //     <Section>
    //       <Text>Add Round</Text>
    //       <Text>Sequence</Text>
    //       <Input name="sequence" onChange={handleRoundChange} />
    //       <Button onClick={saveRound}>Save</Button>
    //     </Section>
    //     <Button onClick={goNext}>Next</Button>
    //   </Flex>
    // </Box>
  );
};
