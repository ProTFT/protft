import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../../../components/Button/Button";
import { Player } from "../../../../../graphql/schema";
import { useBulkPlayerListDialog } from "../../../Components/Dialogs/BulkPlayerListDialog/BulkPlayerListDialog";
import { useToast } from "../../../Components/Toast/Toast";
import {
  CreatePlayerResult,
  CreatePlayerVariables,
  CreateTournamentPlayerByNameVariables,
  CreateTournamentPlayerResult,
  CreateTournamentPlayerVariables,
  CREATE_PLAYER_QUERY,
  CREATE_TOURNAMENT_PLAYER,
  CREATE_TOURNAMENT_PLAYER_BY_NAME,
  PlayersQueryResult,
  PlayersQueryVariables,
  PLAYERS_QUERY,
  TournamentQueryResponse,
  TOURNAMENT_PLAYERS_QUERY,
} from "./queries";
import { PlayerSearchList } from "../../../Components/PlayerSearchList/PlayerSearchList";
import { BoardPlayerList } from "../../../Components/BoardPlayerList/BoardPlayerList";
import { usePlayerDialog } from "../../../Components/Dialogs/PlayerDialog/PlayerDialog";
import {
  GridContainer,
  GridLeftSide,
  GridRightSide,
} from "../../../Components/PlayerSelectionGrid/PlayerSelectionGrid.styled";

export const TournamentPlayers = () => {
  const { id: tournamentId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  let timeout = useRef<ReturnType<typeof setTimeout>>();
  const { show } = useToast();

  const [{ data: tournamentPlayersData }, refetchTournamentPlayers] =
    useQuery<TournamentQueryResponse>({
      query: TOURNAMENT_PLAYERS_QUERY,
      variables: { id: Number(tournamentId) },
    });

  const [{ data: allPlayersData }, refetchPlayers] = useQuery<
    PlayersQueryResult,
    PlayersQueryVariables
  >({
    query: PLAYERS_QUERY,
    variables: { searchQuery },
  });

  const [tournamentPlayers, setTournamentPlayers] = useState<Player[]>(
    () => tournamentPlayersData?.tournament.players ?? []
  );

  useEffect(() => {
    setTournamentPlayers(tournamentPlayersData?.tournament.players ?? []);
  }, [tournamentPlayersData?.tournament.players]);

  const playersCount = useMemo(
    () => tournamentPlayers.length,
    [tournamentPlayers]
  );

  const [, createTournamentPlayers] = useMutation<
    CreateTournamentPlayerResult,
    CreateTournamentPlayerVariables
  >(CREATE_TOURNAMENT_PLAYER);

  const [, createTournamentPlayersByName] = useMutation<
    CreateTournamentPlayerResult,
    CreateTournamentPlayerByNameVariables
  >(CREATE_TOURNAMENT_PLAYER_BY_NAME);

  const [, createPlayer] = useMutation<
    CreatePlayerResult,
    CreatePlayerVariables
  >(CREATE_PLAYER_QUERY);

  const onChangeSearchInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        setSearchQuery!(event.target.value);
      }, 1000);
    },
    [setSearchQuery]
  );

  const onAdd = useCallback((newPlayer: Player) => {
    setTournamentPlayers((players) => {
      const allPlayers = [...players, newPlayer];
      const allPlayerIds = allPlayers.map((i) => i.id);
      const uniqueIds = new Set(allPlayerIds);
      return Array.from(uniqueIds)
        .map((id) => allPlayers.find((p) => p.id === id)!)
        .sort((a, b) => a.name.localeCompare(b.name));
    });
  }, []);

  const onSave = useCallback(async () => {
    const result = await createTournamentPlayers({
      tournamentId: Number(tournamentId!),
      playerIds: tournamentPlayers.map((p) => p.id),
    });
    if (result.error) {
      return alert(result.error);
    }
    show();
    refetchTournamentPlayers();
  }, [
    createTournamentPlayers,
    tournamentId,
    tournamentPlayers,
    show,
    refetchTournamentPlayers,
  ]);

  const onSubmitPlayerCreation = useCallback(
    (player: Pick<Player, "name" | "alias" | "country" | "region">) =>
      createPlayer(player),
    [createPlayer]
  );

  const onSubmitBulkPlayer = useCallback(
    async ({ playerNames }: { playerNames: string }) =>
      createTournamentPlayersByName({
        tournamentId: Number(tournamentId),
        playerNames,
      }),
    [createTournamentPlayersByName, tournamentId]
  );

  const { dialog: newPlayerDialog, openDialog: openNewPlayerDialog } =
    usePlayerDialog({
      onSubmit: onSubmitPlayerCreation,
      onSuccess: refetchPlayers,
    });

  const {
    dialog: bulkPlayerTournamentDialog,
    openDialog: openBulkPlayerTournamentDialog,
  } = useBulkPlayerListDialog({
    onSubmit: onSubmitBulkPlayer,
    onSuccess: refetchTournamentPlayers,
  });

  return (
    <GridContainer>
      {newPlayerDialog}
      {bulkPlayerTournamentDialog}
      <GridLeftSide>
        <PlayerSearchList
          showButton
          buttonText={"New Player"}
          onClickButton={openNewPlayerDialog}
          onChangeSearch={onChangeSearchInput}
          players={allPlayersData?.players}
          onClickPlayer={onAdd}
        />
      </GridLeftSide>
      <GridRightSide>
        <BoardPlayerList
          title={`Tournament Players (${playersCount})`}
          players={tournamentPlayers}
          onAddPlayer={onAdd}
          setPlayers={setTournamentPlayers}
        >
          <ProTFTButton onClick={openBulkPlayerTournamentDialog}>
            Add list
          </ProTFTButton>
          <ProTFTButton onClick={onSave}>Save</ProTFTButton>
        </BoardPlayerList>
      </GridRightSide>
    </GridContainer>
  );
};
