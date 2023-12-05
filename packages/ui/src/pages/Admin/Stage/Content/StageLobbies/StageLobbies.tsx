import {
  ChangeEvent,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { Player } from "../../../../../graphql/schema";
import { PlayerSearchList } from "../../../Components/PlayerSearchList/PlayerSearchList";
import {
  GridContainer,
  GridLeftSide,
  GridRightSide,
} from "../../../Components/PlayerSelectionGrid/PlayerSelectionGrid.styled";
import { LobbyGroup } from "./LobbyGroup/LobbyGroup";
import {
  LobbyGroupsQueryResult,
  LobbyGroupsQueryVariables,
  LOBBY_GROUPS_QUERY,
  StagePlayersResponse,
  STAGE_PLAYERS_QUERY,
} from "./queries";

export const StageLobbies = () => {
  const { stageId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const [{ data: lobbyGroupsData }, refetch] = useQuery<
    LobbyGroupsQueryResult,
    LobbyGroupsQueryVariables
  >({
    query: LOBBY_GROUPS_QUERY,
    variables: { id: Number(stageId) },
    requestPolicy: "network-only",
  });

  const [{ data: stagePlayersData }] = useQuery<StagePlayersResponse>({
    query: STAGE_PLAYERS_QUERY,
    variables: { id: Number(stageId) },
  });

  const [selectedLobbyGroup, setSelectedLobbyGroup] = useState(
    () => lobbyGroupsData?.stage.lobbyGroups[0]?.id
  );

  const [selectedLobbyGroupName, setSelectedLobbyGroupName] = useState(
    () => lobbyGroupsData?.stage.lobbyGroups[0]?.sequence
  );

  useEffect(() => {
    setSelectedLobbyGroup(lobbyGroupsData?.stage.lobbyGroups[0]?.id);
    setSelectedLobbyGroupName(lobbyGroupsData?.stage.lobbyGroups[0]?.sequence);
  }, [lobbyGroupsData?.stage.lobbyGroups]);

  const onChangeLobbyGroup = useCallback(
    (direction: number) => {
      const allLobbyGroups = lobbyGroupsData?.stage.lobbyGroups!;
      const currentLobbyGroupIndex = allLobbyGroups.findIndex(
        (lg) => lg.id === selectedLobbyGroup
      )!;
      if (
        direction > 0 &&
        currentLobbyGroupIndex !== allLobbyGroups.length - 1
      ) {
        const nextLobbyGroup = allLobbyGroups[currentLobbyGroupIndex + 1];
        setSelectedLobbyGroupName(nextLobbyGroup.sequence);
        setSelectedLobbyGroup(nextLobbyGroup.id);
      } else if (direction < 0 && currentLobbyGroupIndex !== 0) {
        const nextLobbyGroup = allLobbyGroups[currentLobbyGroupIndex - 1];
        setSelectedLobbyGroupName(nextLobbyGroup.sequence);
        setSelectedLobbyGroup(nextLobbyGroup.id);
      }
    },
    [
      setSelectedLobbyGroup,
      lobbyGroupsData?.stage.lobbyGroups,
      selectedLobbyGroup,
    ]
  );

  const hasLobbieGroups = useMemo(
    () => !!lobbyGroupsData?.stage.lobbyGroups.length,
    [lobbyGroupsData?.stage.lobbyGroups]
  );

  const [remainingPlayers, setRemainingPlayers] = useState<Player[]>(
    () => stagePlayersData?.stage.players.map((p) => p.player) || []
  );

  const onChangeSearchInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const onChangeSelectedPlayers = useCallback(
    (playerIds: number[]) => {
      const playersLeft =
        stagePlayersData?.stage.players
          .map((p) => p.player)
          .filter((p) => !playerIds.includes(p.id)) || [];
      setRemainingPlayers(playersLeft);
    },
    [stagePlayersData?.stage.players]
  );

  const refetchLobbyGroups = useCallback(() => {
    refetch({});
  }, [refetch]);

  return (
    <GridContainer>
      <GridLeftSide>
        <PlayerSearchList
          showButton={false}
          onChangeSearch={onChangeSearchInput}
          players={remainingPlayers.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
        />
      </GridLeftSide>
      <GridRightSide>
        <Suspense fallback={null}>
          <LobbyGroup
            hasLobbieGroups={hasLobbieGroups}
            selectedLobbyGroup={selectedLobbyGroup}
            lobbyGroupName={selectedLobbyGroupName}
            stageId={Number(stageId)}
            onChangeLobbyGroup={onChangeLobbyGroup}
            onChangeSelectedPlayers={onChangeSelectedPlayers}
            refetchLobbyGroups={refetchLobbyGroups}
          />
        </Suspense>
      </GridRightSide>
    </GridContainer>
  );
};
