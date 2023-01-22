import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../../../components/Button/Button";
import { TextIconHorizontalContainer } from "../../../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { RegionsIndicator } from "../../../../../components/RegionIndicator/RegionIndicator";
import { SearchInput } from "../../../../../components/SearchInput/SearchInput";
import { Player } from "../../../../../graphql/schema";
import { useToast } from "../../../Components/Toast/Toast";
import {
  StyledLeftSide,
  StyledRightSide,
  StyledTitle,
} from "../../../Tournament/Content/Content.styled";
import {
  StyledContainer,
  StyledDeleteButton,
  StyledPlayerContentContainer,
  StyledPlayerName,
  StyledTournamentPlayerList,
  StyledTournamentPlayerListColumn,
} from "../../../Tournament/Content/TournamentPlayers/TournamentPlayers.styled";
import {
  CreateStagePlayerResult,
  CreateStagePlayerVariables,
  CREATE_STAGE_PLAYER,
  StagePlayersResponse,
  STAGE_PLAYERS_QUERY,
  TournamentPlayersResponse,
  TOURNAMENT_PLAYERS_QUERY,
} from "./queries";
import { StyledBar, StyledButtonContainer } from "./StagePlayers.styled";

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

export const StagePlayers = () => {
  const { id: tournamentId, stageId } = useParams();
  const [, setSearchQuery] = useState("");
  let timeout = useRef<ReturnType<typeof setTimeout>>();

  const [{ data }] = useQuery<TournamentPlayersResponse>({
    query: TOURNAMENT_PLAYERS_QUERY,
    variables: { id: Number(tournamentId) },
  });

  const [{ data: stagePlayersData }] = useQuery<StagePlayersResponse>({
    query: STAGE_PLAYERS_QUERY,
    variables: { id: Number(stageId) },
  });

  const [, createStagePlayers] = useMutation<
    CreateStagePlayerResult,
    CreateStagePlayerVariables
  >(CREATE_STAGE_PLAYER);

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

  const { show } = useToast();

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

  return (
    <StyledContainer>
      <StyledLeftSide>
        <StyledBar>
          <SearchInput
            placeholder="Search Players"
            onChange={onChangeSearchInput}
          />
        </StyledBar>
        {data?.tournament?.players?.map((player) => (
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
            <ProTFTButton onClick={onSave}>Save</ProTFTButton>
          </StyledButtonContainer>
        </StyledBar>
        <DroppableContainer
          content={stagePlayers}
          setContent={setStagePlayers}
          onAdd={onAdd}
        />
      </StyledRightSide>
    </StyledContainer>
  );
};
