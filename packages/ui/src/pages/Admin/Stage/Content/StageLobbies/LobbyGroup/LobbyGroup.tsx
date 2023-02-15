import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../../../../components/Button/Button";
import { BigArrowLeft } from "../../../../../../design/icons/BigArrowLeft";
import { BigArrowRight } from "../../../../../../design/icons/BigArrowRight";
import {
  Lobby,
  LobbyGroup as LobbyGroupEntity,
  Player,
} from "../../../../../../graphql/schema";
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
  CreateLobbyGroupResult,
  CreateLobbyGroupVariables,
  CreateLobbyResult,
  CreateLobbyVariables,
  CreatePlayerLobbyGroupResult,
  CreatePlayerLobbyGroupVariables,
  CREATE_LOBBY_GROUP_MUTATION,
  CREATE_LOBBY_MUTATION,
  CREATE_LOBBY_PLAYERS_MUTATION,
} from "./queries";
import { useToast } from "../../../../Components/Toast/Toast";
import { StyledTitle } from "../../../../Components/Title/Title.styled";
import { LobbyGroupDialog } from "../../../../Components/LobbyGroupDialog/LobbyGroupDialog";
import { LobbyDialog } from "../../../../Components/LobbyDialog/LobbyDialog";

interface Props {
  hasLobbieGroups: boolean;
  stageId: number;
  selectedLobbyGroup?: number;
  lobbyGroupName?: number;
  onChangeLobbyGroup: any;
  onChangeSelectedPlayers: any;
  refetchLobbyGroups: () => void;
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
  refetchLobbyGroups,
}: Props) => {
  const { show } = useToast();
  const [isManual, setIsManual] = useState(false);
  const addLobbyGroupDialogRef = useRef<HTMLDialogElement>(null);
  const addLobbyGroupFormRef = useRef<HTMLFormElement>(null);
  const addLobbyDialogRef = useRef<HTMLDialogElement>(null);
  const addLobbyFormRef = useRef<HTMLFormElement>(null);

  const [{ data: lobbyPlayersData }, refetch] = useQuery<
    LobbyPlayersQueryResult,
    LobbyPlayersQueryVariables
  >({
    query: LOBBY_PLAYERS_QUERY,
    variables: { lobbyGroupId: Number(selectedLobbyGroup) },
    pause: !hasLobbieGroups && !isManual,
  });

  const [, createPlayerLobbyGroup] = useMutation<
    CreatePlayerLobbyGroupResult,
    CreatePlayerLobbyGroupVariables
  >(CREATE_LOBBY_PLAYERS_MUTATION);

  const [, createLobbyGroup] = useMutation<
    CreateLobbyGroupResult,
    CreateLobbyGroupVariables
  >(CREATE_LOBBY_GROUP_MUTATION);

  const [, createLobby] = useMutation<CreateLobbyResult, CreateLobbyVariables>(
    CREATE_LOBBY_MUTATION
  );

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

  const onCreateLobbyGroup = useCallback(async () => {
    addLobbyGroupDialogRef.current?.showModal();
  }, []);

  const onSubmitCreateLobbyGroup = useCallback(
    async ({
      sequence,
      roundsPlayed,
    }: Pick<LobbyGroupEntity, "roundsPlayed" | "sequence">) => {
      const result = await createLobbyGroup({
        roundsPlayed,
        sequence,
        stageId,
      });
      if (result.error) {
        return alert(result.error);
      }
      show();
      refetchLobbyGroups();
      addLobbyGroupFormRef.current?.reset();
      addLobbyGroupDialogRef.current?.close();
    },
    [createLobbyGroup, show, stageId, refetchLobbyGroups]
  );

  const onCreateLobby = useCallback(async () => {
    addLobbyDialogRef.current?.showModal();
  }, []);

  const onSubmitCreateLobby = useCallback(
    async ({ sequence }: Pick<Lobby, "sequence">) => {
      const result = await createLobby({
        lobbyGroupId: selectedLobbyGroup!,
        sequence,
        stageId,
      });
      if (result.error) {
        return alert(result.error);
      }
      show();
      refetch();
      addLobbyFormRef.current?.reset();
      addLobbyDialogRef.current?.close();
    },
    [createLobby, selectedLobbyGroup, show, stageId, refetch]
  );

  const onSave = useCallback(async () => {
    const result = await createPlayerLobbyGroup({
      lobbies: allLobbiesWithPlayers.map((l) => ({
        lobbyId: l.lobbyId,
        playerIds: l.players.map((p) => p.id),
      })),
    });
    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [allLobbiesWithPlayers, createPlayerLobbyGroup, show]);

  const onAdd = useCallback(
    ({ lobbyId, name: lobbyName }: AllLobbyPlayers) =>
      ({ id, name, region, slug }: Player) => {
        setAllLobbiesWithPlayers((curr) => {
          const currentLobbyPlayers = curr.find(
            (l) => l.lobbyId === lobbyId
          )!.players;
          const allPlayers = [
            ...currentLobbyPlayers,
            { id, name, region, slug },
          ];
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

  const setModeToManual = useCallback(() => {
    setIsManual(true);
  }, []);

  if (!hasLobbieGroups && !isManual) {
    return (
      <>
        <StyledTitle>Lobby Groups</StyledTitle>
        <GenerateLobbies
          stageId={stageId}
          refetchLobbyGroups={refetchLobbyGroups}
          onSetManual={setModeToManual}
        />
      </>
    );
  }

  return (
    <StyledLobbyGroupContainer>
      <LobbyGroupDialog
        dialogRef={addLobbyGroupDialogRef}
        formRef={addLobbyGroupFormRef}
        onSubmit={onSubmitCreateLobbyGroup}
        lobbyGroup={{} as LobbyGroupEntity}
      />
      <LobbyDialog
        dialogRef={addLobbyDialogRef}
        formRef={addLobbyFormRef}
        onSubmit={onSubmitCreateLobby}
        lobby={{} as Lobby}
      />
      <StyledBar>
        <StyledTitleContainer>
          <BigArrowLeft onClick={onGoToPreviousLobbyGroup} />
          <StyledTitle>{`Lobby Group ${lobbyGroupName}`}</StyledTitle>
          <BigArrowRight onClick={onGoToNextLobbyGroup} />
        </StyledTitleContainer>
        <StyledButtonContainer>
          <ProTFTButton onClick={onSave}>Save</ProTFTButton>
          <ProTFTButton onClick={onCreateLobbyGroup}>
            Create Lobby Group
          </ProTFTButton>
          {selectedLobbyGroup && (
            <ProTFTButton onClick={onCreateLobby}>Create Lobby</ProTFTButton>
          )}
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
