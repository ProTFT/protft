import { Box, Flex, Text, Input, Checkbox, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { getFlagEmoji } from "../../formatter/FlagEmoji";
import { Player } from "../../graphql/schema";
import { StagesQueryResult, STAGES_QUERY } from "../StageWizard/queries";
import { LobbyList, StageList } from "../StageWizard/StageWizard";
import { PlayerList, Section } from "../TournamentWizard/TournamentWizard";
import {
  CreatePlayerLobbyResult,
  CreatePlayerLobbyVariables,
  CREATE_PLAYER_LOBBY,
} from "./queries";

export interface DragAndDropPlayerProps {
  player: Player;
  onClick?: (player: Player) => void;
}

const DragAndDropPlayer = ({
  player,
  onClick = () => {},
}: DragAndDropPlayerProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Player",
    item: player,
    collect: (monitor) => ({
      isDragging: monitor.isDragging,
    }),
  }));
  return (
    <Text onClick={() => onClick(player)} ref={drag}>
      {getFlagEmoji(player.country!)}
      {player.name}
    </Text>
  );
};

const TournamentPlayers = () => {
  const [tournamentPlayers, setTournamentPlayers] = useState<Player[]>([]);
  const [, drop] = useDrop<Player>(() => ({
    accept: "Player",
    drop({ id, name, country, region }, monitor) {
      setTournamentPlayers((players) => [
        ...players,
        { id, name, country, region },
      ]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Section ref={drop}>
      <Text>Tournament Players</Text>
      {tournamentPlayers.map((player) => (
        <DragAndDropPlayer key={player.id} player={player} />
      ))}
    </Section>
  );
};

const LobbyPlayers = ({
  lobbyId,
  stageId,
}: {
  lobbyId: number;
  stageId: number;
}) => {
  const [lobbyPlayers, setLobbyPlayers] = useState<Player[]>([]);
  const [, drop] = useDrop<Player>(() => ({
    accept: "Player",
    drop({ id, name, country, region }, monitor) {
      setLobbyPlayers((players) => [...players, { id, name, country, region }]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [, createPlayerLobby] = useMutation<
    CreatePlayerLobbyResult,
    CreatePlayerLobbyVariables
  >(CREATE_PLAYER_LOBBY);

  const saveLobbyPlayers = () => {
    if (lobbyPlayers.length > 0) {
      createPlayerLobby({
        lobbyId,
        playerIds: lobbyPlayers.map((player) => player.id),
      });
    }
  };

  const removeLobbyPlayer = (player: Player) => {
    setLobbyPlayers((lobbyPlayers) =>
      lobbyPlayers.filter((p) => p.id !== player.id)
    );
  };

  const clearLobby = () => {
    setLobbyPlayers([]);
  };

  return (
    <Section ref={drop}>
      <Text>
        Stage {stageId} - Lobby - {lobbyId} - Players
      </Text>
      <Button onClick={clearLobby}>Clear</Button>
      {lobbyPlayers.map((player) => (
        <DragAndDropPlayer
          key={player.id}
          player={player}
          onClick={removeLobbyPlayer}
        />
      ))}
      <Button onClick={saveLobbyPlayers}>Save</Button>
    </Section>
  );
};

export const LobbiesWizard = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [selectedLobby, setSelectedLobby] = useState<number>(0);

  const [{ data: stages }, fetchStages] = useQuery<StagesQueryResult>({
    query: STAGES_QUERY,
    variables: { tournamentId: Number(tournamentId) },
  });

  const dragAndDropPlayerFactory = (player: Player) => (
    <DragAndDropPlayer key={player.id} player={player} />
  );

  const goNext = () => {
    navigate("../results");
  };

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
          selectedLobby={selectedLobby}
          onSelectLobby={setSelectedLobby}
        />
        <PlayerList listItemFactory={dragAndDropPlayerFactory} />
        <TournamentPlayers />
        <LobbyPlayers stageId={selectedStage} lobbyId={selectedLobby} />
        <Button onClick={goNext}>Next</Button>
      </Flex>
    </Box>
  );
};
