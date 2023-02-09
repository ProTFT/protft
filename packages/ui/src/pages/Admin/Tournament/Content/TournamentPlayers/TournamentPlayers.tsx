import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../../../components/Button/Button";
import { TextIconHorizontalContainer } from "../../../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { SearchInput } from "../../../../../components/SearchInput/SearchInput";
import { Player } from "../../../../../graphql/schema";
import { BulkPlayerTournamentDialog } from "../../../Components/BulkPlayerTournamentDialog/BulkPlayerTournamentDialog";
import { DroppableContainer } from "../../../Components/DroppableContainer/DroppableContainer";
import {
  StyledLeftSide,
  StyledRightSide,
} from "../../../Components/Layout/TwoSided.styled";
import { PlayerDialog } from "../../../Components/PlayerDialog/PlayerDialog";
import { DraggablePlayer } from "../../../Components/PlayerItem/PlayerItem";
import { StyledTitle } from "../../../Components/Title/Title.styled";
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
import { StyledBar, StyledContainer } from "./TournamentPlayers.styled";

export const TournamentPlayers = () => {
  const { id: tournamentId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  let timeout = useRef<ReturnType<typeof setTimeout>>();
  const { show } = useToast();

  const [{ data: tournamentPlayersData }] = useQuery<TournamentQueryResponse>({
    query: TOURNAMENT_PLAYERS_QUERY,
    variables: { id: Number(tournamentId) },
  });

  const [tournamentPlayers, setTournamentPlayers] = useState<Player[]>(
    () => tournamentPlayersData?.tournament.players || []
  );
  const playersCount = useMemo(
    () => tournamentPlayers.length,
    [tournamentPlayers]
  );

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const bulkPlayerDialogRef = useRef<HTMLDialogElement>(null);
  const bulkPlayerFormRef = useRef<HTMLFormElement>(null);

  const [{ data }, refetch] = useQuery<
    PlayersQueryResult,
    PlayersQueryVariables
  >({
    query: PLAYERS_QUERY,
    variables: { searchQuery },
  });

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

  const onAdd = useCallback(({ id, name, region, slug }: Player) => {
    setTournamentPlayers((players) => {
      const allPlayers = [...players, { id, name, region, slug }];
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
  }, [createTournamentPlayers, tournamentId, tournamentPlayers, show]);

  const onSubmit = useCallback(
    async (player: Omit<Player, "id" | "playerStats">) => {
      const result = await createPlayer(player);
      if (result.error) {
        return alert(result.error);
      }
      show();
      formRef.current?.reset();
      dialogRef.current?.close();
      refetch();
    },
    [createPlayer, refetch, show]
  );

  const onSubmitBulkPlayer = useCallback(
    async ({ playerNames }: { playerNames: string }) => {
      const result = await createTournamentPlayersByName({
        tournamentId: Number(tournamentId),
        playerNames,
      });

      if (result.error) {
        return alert(result.error);
      }
      show();
      bulkPlayerFormRef.current?.reset();
      bulkPlayerDialogRef.current?.close();
      refetch();
    },
    [createTournamentPlayersByName, refetch, show, tournamentId]
  );

  const onClickNewPlayer = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const onBulkAdd = useCallback(() => {
    bulkPlayerDialogRef.current?.showModal();
  }, []);

  return (
    <StyledContainer>
      <PlayerDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
      />
      <BulkPlayerTournamentDialog
        dialogRef={bulkPlayerDialogRef}
        formRef={bulkPlayerFormRef}
        onSubmit={onSubmitBulkPlayer}
      />
      <StyledLeftSide>
        <StyledBar>
          <SearchInput
            placeholder="Search players"
            onChange={onChangeSearchInput}
          />
          <ProTFTButton onClick={onClickNewPlayer}>New Player</ProTFTButton>
        </StyledBar>
        {data?.players.map((player) => (
          <DraggablePlayer
            key={player.id}
            player={player}
            onClick={() => onAdd(player)}
          />
        ))}
      </StyledLeftSide>
      <StyledRightSide>
        <StyledBar>
          <StyledTitle>{`Tournament Players (${playersCount})`}</StyledTitle>
          <TextIconHorizontalContainer>
            <ProTFTButton onClick={onBulkAdd}>Bulk Add</ProTFTButton>
            <ProTFTButton onClick={onSave}>Save</ProTFTButton>
          </TextIconHorizontalContainer>
        </StyledBar>
        <DroppableContainer
          content={tournamentPlayers}
          setContent={setTournamentPlayers}
          onAdd={onAdd}
        />
      </StyledRightSide>
    </StyledContainer>
  );
};
