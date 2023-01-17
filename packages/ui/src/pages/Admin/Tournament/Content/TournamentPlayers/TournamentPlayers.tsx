import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../../../components/Button/Button";
import { TextIconHorizontalContainer } from "../../../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { RegionsIndicator } from "../../../../../components/RegionIndicator/RegionIndicator";
import { SearchInput } from "../../../../../components/SearchInput/SearchInput";
import { Player } from "../../../../../graphql/schema";
import { PlayerDialog } from "../../../Components/PlayerDialog/PlayerDialog";
import { useToast } from "../../../Components/Toast/Toast";
import {
  StyledLeftSide,
  StyledRightSide,
  StyledTitle,
} from "../Content.styled";
import {
  CreatePlayerResult,
  CreatePlayerVariables,
  CreateTournamentPlayerResult,
  CreateTournamentPlayerVariables,
  CREATE_PLAYER_QUERY,
  CREATE_TOURNAMENT_PLAYER,
  PlayersQueryResult,
  PlayersQueryVariables,
  PLAYERS_QUERY,
  TournamentQueryResponse,
  TOURNAMENT_PLAYERS_QUERY,
} from "./queries";
import {
  StyledBar,
  StyledContainer,
  StyledDeleteButton,
  StyledPlayerContentContainer,
  StyledPlayerName,
  StyledTournamentPlayerList,
  StyledTournamentPlayerListColumn,
} from "./TournamentPlayers.styled";

interface DragAndDropPlayerProps {
  player: Player;
  onClick?: () => void;
}

const DraggablePlayer = ({
  player,
  onClick = () => {},
}: DragAndDropPlayerProps) => {
  const [, drag] = useDrag(() => ({
    type: "Player",
    item: player,
    collect: (monitor) => ({
      isDragging: monitor.isDragging,
    }),
  }));
  return (
    <TextIconHorizontalContainer onClick={onClick} ref={drag}>
      <PlayerContent player={player} />
    </TextIconHorizontalContainer>
  );
};

const PlayerContent = ({ player: { region, name } }: { player: Player }) => {
  return (
    <StyledPlayerContentContainer>
      <RegionsIndicator regionCodes={[region!]} showName={false} />
      <StyledPlayerName>{name}</StyledPlayerName>
    </StyledPlayerContentContainer>
  );
};

interface DroppableContainerProps {
  content: Player[];
  setContent: React.Dispatch<React.SetStateAction<Player[]>>;
  onAdd: (player: Player) => void;
}

const DroppableContainer = ({
  content,
  setContent,
  onAdd,
}: DroppableContainerProps) => {
  const [, drop] = useDrop<Player>(() => ({
    accept: "Player",
    drop(player) {
      onAdd(player);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const removePlayer = useCallback(
    (id: number) => () => {
      setContent((players) => players.filter((p) => p.id !== id));
    },
    [setContent]
  );

  return (
    <StyledTournamentPlayerList ref={drop}>
      <StyledTournamentPlayerListColumn>
        {content.map((player) => (
          <TextIconHorizontalContainer key={player.id}>
            <PlayerContent key={player.id} player={player} />
            <StyledDeleteButton onClick={removePlayer(player.id)}>
              X
            </StyledDeleteButton>
          </TextIconHorizontalContainer>
        ))}
      </StyledTournamentPlayerListColumn>
    </StyledTournamentPlayerList>
  );
};

export const TournamentPlayers = () => {
  const { id: tournamentId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  let timeout = useRef<ReturnType<typeof setTimeout>>();

  const [{ data }, refetch] = useQuery<
    PlayersQueryResult,
    PlayersQueryVariables
  >({
    query: PLAYERS_QUERY,
    variables: { searchQuery },
  });

  const [{ data: tournamentPlayersData }] = useQuery<TournamentQueryResponse>({
    query: TOURNAMENT_PLAYERS_QUERY,
    variables: { id: Number(tournamentId) },
  });

  const [, createTournamentPlayers] = useMutation<
    CreateTournamentPlayerResult,
    CreateTournamentPlayerVariables
  >(CREATE_TOURNAMENT_PLAYER);

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

  const [tournamentPlayers, setTournamentPlayers] = useState<Player[]>(
    () => tournamentPlayersData?.tournament.players || []
  );
  const playersCount = useMemo(
    () => tournamentPlayers.length,
    [tournamentPlayers]
  );

  const onAdd = useCallback(({ id, name, region }: Player) => {
    setTournamentPlayers((players) => {
      const allPlayers = [...players, { id, name, region }];
      const allPlayerIds = allPlayers.map((i) => i.id);
      const uniqueIds = new Set(allPlayerIds);
      return Array.from(uniqueIds)
        .map((id) => allPlayers.find((p) => p.id === id)!)
        .sort((a, b) => a.name.localeCompare(b.name));
    });
  }, []);
  const { show } = useToast();

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

  const [, createPlayer] = useMutation<
    CreatePlayerResult,
    CreatePlayerVariables
  >(CREATE_PLAYER_QUERY);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (player: Omit<Player, "id" | "playerStats">) => {
    const result = await createPlayer(player);
    if (result.error) {
      return alert(result.error);
    }
    show();
    formRef.current?.reset();
    dialogRef.current?.close();
    refetch();
  };

  const onClickNewPlayer = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <StyledContainer>
      <PlayerDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
      />
      <StyledLeftSide>
        <StyledBar>
          <SearchInput
            placeholder="Search Players"
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
          <ProTFTButton onClick={onSave}>Save</ProTFTButton>
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
