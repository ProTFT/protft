import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../../../../components/Button/Button";
import { BigArrowLeft } from "../../../../../../design/icons/BigArrowLeft";
import { BigArrowRight } from "../../../../../../design/icons/BigArrowRight";
import {
  LobbyGroup as GqlLobbyGroup,
  Player,
  RoundResult,
} from "../../../../../../graphql/schema";
import { client } from "../../../../../../hooks/useAuth";
import { BulkPlayerDialog } from "../../../../Components/BulkPlayerDialog/BulkPlayerDialog";
import { StyledTitle } from "../../../../Components/Title/Title.styled";
import { useToast } from "../../../../Components/Toast/Toast";
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
  stageId: number;
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
  stageId,
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
    RoundResult[],
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

  const onBulkAdd = useCallback(
    async (file: FileList) => {
      if (!file?.item(0)) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file.item(0)!);
      formData.append("stageId", String(stageId));
      const response = await client.postForm(
        "/roundResults/uploadBulk",
        formData
      );
      return response;
    },
    [stageId]
  );

  const onSubmit = useCallback(
    async ({ file }: { file: FileList }) => {
      const result = await onBulkAdd(file);
      if (result?.status !== 201) {
        return alert(result?.statusText);
      }
      show();
      formRef.current?.reset();
      dialogRef.current?.close();
    },
    [onBulkAdd, show]
  );

  const onClickAddBulkPlayer = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <StyledLobbyGroupContainer>
      <BulkPlayerDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
      />
      <StyledBar>
        <StyledTitleContainer>
          <BigArrowLeft onClick={onGoToPreviousLobbyGroup} />
          <StyledTitle>{`Lobby Group ${selectedLobbyGroup?.sequence}`}</StyledTitle>
          <BigArrowRight onClick={onGoToNextLobbyGroup} />
        </StyledTitleContainer>
        <StyledButtonContainer>
          <ProTFTButton onClick={onClickAddBulkPlayer}>Bulk add</ProTFTButton>
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
