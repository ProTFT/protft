import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../../../../components/Button/Button";
import { BigArrowLeft } from "../../../../../../design/icons/BigArrowLeft";
import { BigArrowRight } from "../../../../../../design/icons/BigArrowRight";
import {
  BooleanResult,
  LobbyGroup as GqlLobbyGroup,
  Player,
} from "../../../../../../graphql/schema";
import { useToast } from "../../../../Components/Toast/Toast";
import { StyledTitle } from "../../../../Tournament/Content/Content.styled";
import { LobbyContainer } from "../LobbyContainer/LobbyContainer";
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
  CreateResultsByLobbyGroupMutationVariables,
  CREATE_RESULTS_BY_LOBBY_GROUP_MUTATION,
  ResultsByLobbyGroupQueryResult,
  ResultsByLobbyGroupQueryVariables,
  RESULTS_BY_LOBBY_GROUP_QUERY,
} from "./queries";

interface Props {
  hasLobbieGroups: boolean;
  selectedLobbyGroup?: GqlLobbyGroup;
  onChangeLobbyGroup: any;
}

interface AllLobbyPlayers {
  lobbyId: number;
  name: string;
  players: Player[];
}

export interface Results {
  [playerId: number]: {
    positions: number[];
    lobbyPlayerId: number;
  };
}

export const LobbyGroup = ({
  hasLobbieGroups,
  selectedLobbyGroup,
  onChangeLobbyGroup,
}: Props) => {
  const [{ data: lobbyPlayersData }] = useQuery<
    LobbyPlayersQueryResult,
    LobbyPlayersQueryVariables
  >({
    query: LOBBY_PLAYERS_QUERY,
    variables: { lobbyGroupId: Number(selectedLobbyGroup?.id) },
    pause: !hasLobbieGroups,
  });

  const [{ data: lobbyGroupResultsData }] = useQuery<
    ResultsByLobbyGroupQueryResult,
    ResultsByLobbyGroupQueryVariables
  >({
    query: RESULTS_BY_LOBBY_GROUP_QUERY,
    variables: { lobbyGroupId: Number(selectedLobbyGroup?.id) },
    pause: !hasLobbieGroups,
  });

  const [, createLobbyGroupResults] = useMutation<
    BooleanResult,
    CreateResultsByLobbyGroupMutationVariables
  >(CREATE_RESULTS_BY_LOBBY_GROUP_MUTATION);

  const [lobbyGroupResults, setLobbyGroupResults] = useState<Results>(() => {
    return lobbyGroupResultsData?.resultsByLobbyGroup.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.player.id]: {
          positions: curr.positions,
          lobbyPlayerId: curr.lobbyPlayerId,
        },
      }),
      {}
    ) as Results;
  });

  useEffect(() => {
    setLobbyGroupResults(
      lobbyGroupResultsData?.resultsByLobbyGroup.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.player.id]: {
            positions: curr.positions,
            lobbyPlayerId: curr.lobbyPlayerId,
          },
        }),
        {}
      ) as Results
    );
  }, [lobbyGroupResultsData?.resultsByLobbyGroup]);

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

  const { show } = useToast();

  const onSave = useCallback(async () => {
    const result = await createLobbyGroupResults({
      lobbyGroupId: selectedLobbyGroup!.id,
      results: Object.values(lobbyGroupResults),
    });
    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [createLobbyGroupResults, lobbyGroupResults, selectedLobbyGroup, show]);

  const onGoToNextLobbyGroup = useCallback(() => {
    onChangeLobbyGroup(1);
  }, [onChangeLobbyGroup]);

  const onGoToPreviousLobbyGroup = useCallback(() => {
    onChangeLobbyGroup(-1);
  }, [onChangeLobbyGroup]);

  const onChangeResult = useCallback(
    (playerId: number, index: number, value: number) => {
      setLobbyGroupResults((curr) => {
        const currentPositions = curr[playerId].positions;
        return {
          ...curr,
          [playerId]: {
            ...curr[playerId],
            positions: [
              ...currentPositions.slice(0, index),
              value,
              ...currentPositions.slice(index + 1, currentPositions.length),
            ],
          },
        };
      });
    },
    []
  );

  return (
    <StyledLobbyGroupContainer>
      <StyledBar>
        <StyledTitleContainer>
          <BigArrowLeft onClick={onGoToPreviousLobbyGroup} />
          <StyledTitle>{`Lobby Group ${selectedLobbyGroup?.sequence}`}</StyledTitle>
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
              roundsPlayed={selectedLobbyGroup?.roundsPlayed}
              results={lobbyGroupResults}
              onChangeResult={onChangeResult}
            />
          ))}
      </StyledLobbyContainer>
    </StyledLobbyGroupContainer>
  );
};
