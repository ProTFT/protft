import { Suspense, useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { LobbyGroup as GqlLobbyGroup } from "../../../../../graphql/schema";
import { LobbyGroup } from "./LobbyGroup/LobbyGroup";
import {
  LobbyGroupsQueryResult,
  LobbyGroupsQueryVariables,
  LOBBY_GROUPS_QUERY,
} from "./queries";
import { StyledContainer } from "./StageResults.styled";

export const StageResults = () => {
  const { stageId } = useParams();

  const [{ data: lobbyGroupsData }] = useQuery<
    LobbyGroupsQueryResult,
    LobbyGroupsQueryVariables
  >({
    query: LOBBY_GROUPS_QUERY,
    variables: { id: Number(stageId) },
  });

  const [selectedLobbyGroup, setSelectedLobbyGroup] = useState<
    GqlLobbyGroup | undefined
  >(() => lobbyGroupsData?.stage.lobbyGroups[0]);

  const onChangeLobbyGroup = useCallback(
    (direction: number) => {
      const allLobbyGroups = lobbyGroupsData?.stage.lobbyGroups!;
      const currentLobbyGroupIndex = allLobbyGroups.findIndex(
        (lg) => lg.id === selectedLobbyGroup?.id
      )!;
      if (
        direction > 0 &&
        currentLobbyGroupIndex !== allLobbyGroups.length - 1
      ) {
        const nextLobbyGroup = allLobbyGroups[currentLobbyGroupIndex + 1];
        setSelectedLobbyGroup(nextLobbyGroup);
      } else if (direction < 0 && currentLobbyGroupIndex !== 0) {
        const nextLobbyGroup = allLobbyGroups[currentLobbyGroupIndex - 1];
        setSelectedLobbyGroup(nextLobbyGroup);
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

  return (
    <StyledContainer>
      <Suspense fallback={null}>
        <LobbyGroup
          hasLobbieGroups={hasLobbieGroups}
          selectedLobbyGroup={selectedLobbyGroup}
          onChangeLobbyGroup={onChangeLobbyGroup}
        />
      </Suspense>
    </StyledContainer>
  );
};
