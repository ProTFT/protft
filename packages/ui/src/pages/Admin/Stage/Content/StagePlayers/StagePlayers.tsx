import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { Player, StagePlayerInfo } from "../../../../../graphql/schema";
import { ProTFTButton } from "../../../../../components/Button/Button";
import { SearchInput } from "../../../../../components/SearchInput/SearchInput";
import { BulkPlayerTournamentDialog } from "../../../Components/BulkPlayerTournamentDialog/BulkPlayerTournamentDialog";
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
import { StagePlayerDialog } from "../../../Components/StagePlayerDialog/StagePlayerDialog";

export const StagePlayers = () => {
  const { id: tournamentId, stageId } = useParams();

  const [searchQuery, setSearchQuery] = useState("");

  const [editedPlayerId, setEditedPlayerId] = useState(0);
  const { show } = useToast();
  const bulkPlayerDialogRef = useRef<HTMLDialogElement>(null);
  const bulkPlayerFormRef = useRef<HTMLFormElement>(null);
  const editStagePlayerDialogRef = useRef<HTMLDialogElement>(null);
  const editStagePlayerFormRef = useRef<HTMLFormElement>(null);

  const [{ data }] = useQuery<TournamentPlayersResponse>({
    query: TOURNAMENT_PLAYERS_QUERY,
    variables: { id: Number(tournamentId) },
  });

  const [{ data: stagePlayersData }] = useQuery<StagePlayersResponse>({
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

  const [stagePlayers, setStagePlayers] = useState<Player[]>(() => {
    const stagePlayerInfo = stagePlayersData?.stage?.players;
    return stagePlayerInfo?.map((spi) => spi.player) || [];
  });

  const playersCount = useMemo(() => stagePlayers.length, [stagePlayers]);

  const onAdd = useCallback(({ id, name, region, slug }: Player) => {
    setStagePlayers((players) => {
      const allPlayers = [...players, { id, name, region, slug }];
      const allPlayerIds = allPlayers.map((i) => i.id);
      const uniqueIds = new Set(allPlayerIds);
      return Array.from(uniqueIds)
        .map((id) => allPlayers.find((p) => p.id === id)!)
        .sort((a, b) => a.name.localeCompare(b.name));
    });
  }, []);

  const onSave = useCallback(async () => {
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
  }, [data?.tournament.players]);

  // const onCopyLast = useCallback(async () => {}, []);

  const onSubmitBulkPlayer = useCallback(
    async ({ playerNames }: { playerNames: string }) => {
      const result = await createStagePlayersByName({
        stageId: Number(stageId),
        playerNames,
      });

      if (result.error) {
        return alert(result.error);
      }
      show();
      bulkPlayerFormRef.current?.reset();
      bulkPlayerDialogRef.current?.close();
    },
    [createStagePlayersByName, show, stageId]
  );

  const onSubmitStagePlayer = useCallback(
    async ({
      tiebreakerRanking,
      extraPoints,
    }: Pick<StagePlayerInfo, "tiebreakerRanking" | "extraPoints">) => {
      const result = await updateStagePlayer({
        stageId: Number(stageId),
        playerId: editedPlayerId,
        tiebreakerRanking,
        extraPoints,
      });

      if (result.error) {
        return alert(result.error);
      }
      show();
      editStagePlayerFormRef.current?.reset();
      editStagePlayerDialogRef.current?.close();
    },
    [editedPlayerId, show, stageId, updateStagePlayer]
  );

  const onBulkAdd = useCallback(() => {
    bulkPlayerDialogRef.current?.showModal();
  }, []);

  const onEditClick = useCallback(async (player: Player) => {
    setEditedPlayerId(player.id);
    editStagePlayerDialogRef.current?.showModal();
  }, []);

  return (
    <StyledContainer>
      <BulkPlayerTournamentDialog
        dialogRef={bulkPlayerDialogRef}
        formRef={bulkPlayerFormRef}
        onSubmit={onSubmitBulkPlayer}
      />
      <StagePlayerDialog
        dialogRef={editStagePlayerDialogRef}
        formRef={editStagePlayerFormRef}
        onSubmit={onSubmitStagePlayer}
        stagePlayerInfo={stagePlayerData?.stagePlayer}
      />
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
            <ProTFTButton onClick={onBulkAdd}>Add bulk</ProTFTButton>
            <ProTFTButton onClick={onSave}>Save</ProTFTButton>
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
