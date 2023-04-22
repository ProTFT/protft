import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { Player, StagePlayerInfo } from "../../../../../graphql/schema";
import { ProTFTButton } from "../../../../../components/Button/Button";
import { SearchInput } from "../../../../../components/SearchInput/SearchInput";
import { useBulkPlayerListDialog } from "../../../Components/Dialogs/BulkPlayerListDialog/BulkPlayerListDialog";
import { DroppableContainer } from "../../../Components/DroppableContainer/DroppableContainer";
import {
  StyledLeftSide,
  StyledRightSide,
} from "../../../Components/Layout/TwoSided.styled";
import { DraggablePlayer } from "../../../Components/PlayerItem/PlayerItem";
import { StyledTitle } from "../../../Components/Title/Title.styled";
import { useToast } from "../../../Components/Toast/Toast";
import {
  CreateStagePlayerByNameVariables,
  CreateStagePlayerResult,
  CreateStagePlayerVariables,
  CREATE_STAGE_PLAYER,
  CREATE_STAGE_PLAYER_BY_NAME,
  GetStagePlayerResult,
  GetStagePlayerVariables,
  GET_STAGE_PLAYER_QUERY,
  StagePlayersResponse,
  STAGE_PLAYERS_QUERY,
  TournamentPlayersResponse,
  TOURNAMENT_PLAYERS_QUERY,
  UpdateStagePlayerResult,
  UpdateStagePlayerVariables,
  UPDATE_STAGE_PLAYER_MUTATION,
} from "./queries";
import {
  StyledBar,
  StyledButtonContainer,
  StyledContainer,
} from "./StagePlayers.styled";
import { useStagePlayerInfoDialog } from "../../../Components/Dialogs/StagePlayerInfoDialog/StagePlayerInfoDialog";
import { useSyncedState } from "../../../../../hooks/useSyncedState";

export const StagePlayers = () => {
  const { id: tournamentId, stageId } = useParams();

  const [searchQuery, setSearchQuery] = useState("");

  const [editedPlayerId, setEditedPlayerId] = useState(0);
  const { show } = useToast();

  const [{ data }] = useQuery<TournamentPlayersResponse>({
    query: TOURNAMENT_PLAYERS_QUERY,
    variables: { id: Number(tournamentId) },
  });

  const [{ data: stagePlayersData }, refetchStagePlayers] =
    useQuery<StagePlayersResponse>({
      query: STAGE_PLAYERS_QUERY,
      variables: { id: Number(stageId) },
    });

  const [{ data: stagePlayerData }] = useQuery<
    GetStagePlayerResult,
    GetStagePlayerVariables
  >({
    query: GET_STAGE_PLAYER_QUERY,
    variables: { stageId: Number(stageId), playerId: editedPlayerId },
    pause: !Boolean(editedPlayerId),
  });

  const [, createStagePlayers] = useMutation<
    CreateStagePlayerResult,
    CreateStagePlayerVariables
  >(CREATE_STAGE_PLAYER);

  const [, createStagePlayersByName] = useMutation<
    CreateStagePlayerResult,
    CreateStagePlayerByNameVariables
  >(CREATE_STAGE_PLAYER_BY_NAME);

  const [, updateStagePlayer] = useMutation<
    UpdateStagePlayerResult,
    UpdateStagePlayerVariables
  >(UPDATE_STAGE_PLAYER_MUTATION);

  const onChangeSearchInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery!(event.target.value);
    },
    [setSearchQuery]
  );

  const transformerCallback = useCallback(
    (players?: StagePlayerInfo[]) => players?.map((p) => p.player) ?? [],
    []
  );

  const [stagePlayers, setStagePlayers] = useSyncedState<
    Player[],
    StagePlayerInfo[] | undefined
  >(stagePlayersData?.stage?.players, transformerCallback);

  const playersCount = useMemo(() => stagePlayers.length, [stagePlayers]);

  const onAdd = useCallback(
    (newPlayer: Player) => {
      setStagePlayers((players) => {
        const allPlayers = [...players, newPlayer];
        const allPlayerIds = allPlayers.map((i) => i.id);
        const uniqueIds = new Set(allPlayerIds);
        return Array.from(uniqueIds)
          .map((id) => allPlayers.find((p) => p.id === id)!)
          .sort((a, b) => a.name.localeCompare(b.name));
      });
    },
    [setStagePlayers]
  );

  const onSaveStagePlayers = useCallback(async () => {
    const result = await createStagePlayers({
      stageId: Number(stageId!),
      playerIds: stagePlayers.map((p) => p.id),
    });
    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [createStagePlayers, stageId, stagePlayers, show]);

  const onAddAll = useCallback(async () => {
    setStagePlayers((players) => {
      const tournamentPlayers = [
        ...players,
        ...(data?.tournament.players || []),
      ];
      const tournamentPlayerIds = tournamentPlayers?.map((i) => i.id);
      const uniqueIds = new Set(tournamentPlayerIds);
      return Array.from(uniqueIds)
        .map((id) => tournamentPlayers?.find((p) => p.id === id)!)
        .sort((a, b) => a.name.localeCompare(b.name));
    });
  }, [data?.tournament.players, setStagePlayers]);

  // const onCopyLast = useCallback(async () => {}, []);

  const onSubmitBulkPlayer = useCallback(
    async ({ playerNames }: { playerNames: string }) =>
      createStagePlayersByName({
        stageId: Number(stageId),
        playerNames,
      }),
    [createStagePlayersByName, stageId]
  );

  const onSubmitStagePlayerInfo = useCallback(
    async ({
      tiebreakerRanking,
      extraPoints,
    }: Pick<StagePlayerInfo, "tiebreakerRanking" | "extraPoints">) =>
      updateStagePlayer({
        stageId: Number(stageId),
        playerId: editedPlayerId,
        tiebreakerRanking,
        extraPoints,
      }),
    [editedPlayerId, stageId, updateStagePlayer]
  );

  const { dialog: bulkPlayerDialog, openDialog: openBulkPlayerDialog } =
    useBulkPlayerListDialog({
      onSubmit: onSubmitBulkPlayer,
      onSuccess: refetchStagePlayers,
    });

  const {
    dialog: stagePlayerInfoDialog,
    openDialog: openStagePlayerInfoDialog,
  } = useStagePlayerInfoDialog({
    stagePlayerInfo: stagePlayerData?.stagePlayer,
    onSubmit: onSubmitStagePlayerInfo,
  });

  const onEditClick = useCallback(
    async (player: Player) => {
      setEditedPlayerId(player.id);
      openStagePlayerInfoDialog();
    },
    [openStagePlayerInfoDialog]
  );

  return (
    <StyledContainer>
      {bulkPlayerDialog}
      {stagePlayerInfoDialog}
      <StyledLeftSide>
        <StyledBar>
          <SearchInput
            placeholder="Search Players"
            onChange={onChangeSearchInput}
          />
        </StyledBar>
        {data?.tournament?.players
          ?.filter((player) => player?.name.toLowerCase().includes(searchQuery))
          .map((player) => (
            <DraggablePlayer
              key={player.id}
              player={player}
              onClick={() => onAdd(player)}
            />
          ))}
      </StyledLeftSide>
      <StyledRightSide>
        <StyledBar>
          <StyledTitle>{`Stage Players (${playersCount})`}</StyledTitle>
          <StyledButtonContainer>
            {/* <ProTFTButton onClick={onCopyLast}>Copy last stage</ProTFTButton> */}
            <ProTFTButton onClick={onAddAll}>Add all</ProTFTButton>
            <ProTFTButton onClick={openBulkPlayerDialog}>Add bulk</ProTFTButton>
            <ProTFTButton onClick={onSaveStagePlayers}>Save</ProTFTButton>
          </StyledButtonContainer>
        </StyledBar>
        <DroppableContainer
          content={stagePlayers}
          setContent={setStagePlayers}
          onAdd={onAdd}
          editable
          onEditClick={onEditClick}
        />
      </StyledRightSide>
    </StyledContainer>
  );
};
