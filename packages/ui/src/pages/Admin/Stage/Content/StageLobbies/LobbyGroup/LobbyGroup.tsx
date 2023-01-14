import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../../../../components/Button/Button";
import { BigArrowLeft } from "../../../../../../design/icons/BigArrowLeft";
import { BigArrowRight } from "../../../../../../design/icons/BigArrowRight";
import { Player } from "../../../../../../graphql/schema";
import { StyledTitle } from "../../../../Tournament/Content/Content.styled";
import { LobbyContainer } from "../LobbyContainer/LobbyContainer";
import { GenerateLobbies } from "./GenerateLobbies";
import {
  LobbyPlayersQueryResult,
  LobbyPlayersQueryVariables,
  LOBBY_PLAYERS_QUERY,
} from "../queries";
import {
  StyledBar,
  StyledButtonContainer,
  StyledLobbyContainer,
  StyledLobbyGroupContainer,
  StyledTitleContainer,
} from "./LobbyGroup.styled";
import {
  CreatePlayerLobbyGroupResult,
  CreatePlayerLobbyGroupVariables,
  CREATE_PLAYER_LOBBY_GROUP,
} from "./queries";

interface Props {
  hasLobbieGroups: boolean;
  stageId: number;
  selectedLobbyGroup?: number;
  lobbyGroupName?: number;
  onChangeLobbyGroup: any;
  onChangeSelectedPlayers: any;
}

interface AllLobbyPlayers {
  lobbyId: number;
  name: string;
  players: Player[];
}

export const LobbyGroup = ({
  hasLobbieGroups,
  selectedLobbyGroup,
  stageId,
  onChangeLobbyGroup,
  onChangeSelectedPlayers,
  lobbyGroupName,
}: Props) => {
  const [{ data: lobbyPlayersData }] = useQuery<
    LobbyPlayersQueryResult,
    LobbyPlayersQueryVariables
  >({
    query: LOBBY_PLAYERS_QUERY,
    variables: { lobbyGroupId: Number(selectedLobbyGroup) },
    pause: !hasLobbieGroups,
  });

  const [, createPlayerLobbyGroup] = useMutation<
    CreatePlayerLobbyGroupResult,
    CreatePlayerLobbyGroupVariables
  >(CREATE_PLAYER_LOBBY_GROUP);

  const [allLobbiesWithPlayers, setAllLobbiesWithPlayers] = useState<
    AllLobbyPlayers[]
  >(
    () =>
      lobbyPlayersData?.lobbies?.map((lobbyPlayers) => ({
        lobbyId: lobbyPlayers.id,
        name: lobbyPlayers.name,
        players: lobbyPlayers.players,
      })) || []
  );

  useEffect(() => {
    setAllLobbiesWithPlayers(
      () =>
        lobbyPlayersData?.lobbies?.map((lobbyPlayers) => ({
          lobbyId: lobbyPlayers.id,
          name: lobbyPlayers.name,
          players: lobbyPlayers.players,
        })) || []
    );
  }, [selectedLobbyGroup, lobbyPlayersData?.lobbies]);

  useEffect(() => {
    const playerIds = allLobbiesWithPlayers
      .flatMap((l) => l.players)
      .map((p) => p.id);
    onChangeSelectedPlayers(playerIds);
  }, [allLobbiesWithPlayers, onChangeSelectedPlayers]);

  const onSave = useCallback(async () => {
    const result = await createPlayerLobbyGroup({
      lobbyGroupId: selectedLobbyGroup!,
      players: allLobbiesWithPlayers.map((l) => ({
        lobbyId: l.lobbyId,
        playerIds: l.players.map((p) => p.id),
      })),
    });
    if (result.error) {
      alert(result.error);
    }
  }, [allLobbiesWithPlayers, createPlayerLobbyGroup, selectedLobbyGroup]);

  const onAdd = useCallback(
    ({ lobbyId, name: lobbyName }: AllLobbyPlayers) =>
      ({ id, name, region }: Player) => {
        setAllLobbiesWithPlayers((curr) => {
          const currentLobbyPlayers = curr.find(
            (l) => l.lobbyId === lobbyId
          )!.players;
          const allPlayers = [...currentLobbyPlayers, { id, name, region }];
          const allPlayerIds = allPlayers.map((i) => i.id);
          const uniqueIds = new Set(allPlayerIds);
          const newLobbyPlayers = Array.from(uniqueIds)
            .map((id) => allPlayers.find((p) => p.id === id)!)
            .sort((a, b) => a.name.localeCompare(b.name));
          return [
            ...curr.filter((l) => l.lobbyId !== lobbyId),
            {
              lobbyId,
              name: lobbyName,
              players: newLobbyPlayers,
            },
          ];
        });
      },
    []
  );

  const onSetContent = useCallback(
    ({ lobbyId, name }: AllLobbyPlayers) =>
      (callback: (players: Player[]) => Player[]) => {
        setAllLobbiesWithPlayers((curr) => [
          ...curr.filter((l) => l.lobbyId !== lobbyId),
          {
            lobbyId: lobbyId,
            name: name,
            players: callback(curr.find((l) => l.lobbyId === lobbyId)!.players),
          },
        ]);
      },
    []
  );

  const onGoToNextLobbyGroup = useCallback(() => {
    onChangeLobbyGroup(1);
  }, [onChangeLobbyGroup]);

  const onGoToPreviousLobbyGroup = useCallback(() => {
    onChangeLobbyGroup(-1);
  }, [onChangeLobbyGroup]);

  if (!hasLobbieGroups) {
    return (
      <>
        <StyledTitle>Lobby Groups</StyledTitle>
        <GenerateLobbies stageId={stageId} />
      </>
    );
  }

  return (
    <StyledLobbyGroupContainer>
      <StyledBar>
        <StyledTitleContainer>
          <BigArrowLeft onClick={onGoToPreviousLobbyGroup} />
          <StyledTitle>{`Lobby Group ${lobbyGroupName}`}</StyledTitle>
          <BigArrowRight onClick={onGoToNextLobbyGroup} />
        </StyledTitleContainer>
        <StyledButtonContainer>
          <ProTFTButton onClick={onSave}>Save</ProTFTButton>
        </StyledButtonContainer>
      </StyledBar>
      <StyledLobbyContainer>
        {[...allLobbiesWithPlayers]
          .sort((a, b) => a.lobbyId - b.lobbyId)
          .map((lobbyWithPlayers) => (
            <LobbyContainer
              key={lobbyWithPlayers.lobbyId}
              name={lobbyWithPlayers.name}
              content={lobbyWithPlayers.players}
              setContent={onSetContent(lobbyWithPlayers)}
              onAdd={onAdd(lobbyWithPlayers)}
            />
          ))}
      </StyledLobbyContainer>
    </StyledLobbyGroupContainer>
  );
};
