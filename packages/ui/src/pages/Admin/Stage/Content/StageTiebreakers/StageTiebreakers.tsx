import { useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "urql";
import { ProTFTButton } from "../../../../../components/Button/Button";
import { Tiebreaker } from "../../../../../graphql/schema";
import { client } from "../../../../../hooks/useAuth";
import { BulkPlayerDialog } from "../../../Components/Dialogs/BulkPlayerDialog/BulkPlayerDialog";
import { DeleteButton } from "../../../Components/DeleteButton/DeleteButton";
import { useToast } from "../../../Components/Toast/Toast";
import {
  APPLY_TIEBREAKER_TO_ALL_MUTATION,
  CARRY_OVER_POINTS_MUTATION,
  STAGE_QUERY,
  TIEBREAKERS_QUERY,
  UPDATE_STAGE_TIEBREAKERS_MUTATION,
} from "./queries";
import {
  StyledTiebreakerListItem,
  StyledTitle,
} from "./StageTiebreakers.styled";
import {
  ApplyTiebreakersToAllStagesMutation,
  ApplyTiebreakersToAllStagesMutationVariables,
  CarryOverPointsFromLastStageMutation,
  CarryOverPointsFromLastStageMutationVariables,
  OneStageTiebreakersQuery,
  OneStageTiebreakersQueryVariables,
  TiebreakersQuery,
  TiebreakersQueryVariables,
  UpdateTiebreakersMutation,
  UpdateTiebreakersMutationVariables,
} from "../../../../../gql/graphql";
import {
  GridContainer,
  GridLeftSide,
  GridRightSide,
} from "../../../Components/PlayerSelectionGrid/PlayerSelectionGrid.styled";
import {
  SearchListBody,
  SearchListContainer,
  SearchListEntry,
} from "../../../Components/PlayerSearchList/PlayerSearchList.styled";
import {
  BoardListBody,
  BoardListButtons,
  BoardListContainer,
  BoardListHeader,
} from "../../../Components/BoardPlayerList/BoardPlayerList.styled";
import { PlayerBoard } from "../../../Components/DroppableContainer/DroppableContainer.styled";

export const StageTiebreakers = () => {
  const { stageId } = useParams();
  const { show } = useToast();
  const bulkTiebreakerDialogRef = useRef<HTMLDialogElement>(null);
  const bulkTiebreakerFormRef = useRef<HTMLFormElement>(null);

  const [{ data: stageData }] = useQuery<
    OneStageTiebreakersQuery,
    OneStageTiebreakersQueryVariables
  >({
    query: STAGE_QUERY,
    variables: {
      id: Number(stageId),
    },
  });

  const [{ data }] = useQuery<TiebreakersQuery, TiebreakersQueryVariables>({
    query: TIEBREAKERS_QUERY,
  });

  const [, updateTiebreakers] = useMutation<
    UpdateTiebreakersMutation,
    UpdateTiebreakersMutationVariables
  >(UPDATE_STAGE_TIEBREAKERS_MUTATION);

  const [, carryOverPoints] = useMutation<
    CarryOverPointsFromLastStageMutation,
    CarryOverPointsFromLastStageMutationVariables
  >(CARRY_OVER_POINTS_MUTATION);

  const [, applyTiebreakerToAll] = useMutation<
    ApplyTiebreakersToAllStagesMutation,
    ApplyTiebreakersToAllStagesMutationVariables
  >(APPLY_TIEBREAKER_TO_ALL_MUTATION);

  const [localStageTiebreakers, setLocalStageTiebreakers] = useState<number[]>(
    () => stageData?.stage.tiebreakers || []
  );

  const [remainingTiebreakers, setRemainingTiebreakers] = useState<
    Tiebreaker[]
  >(
    () =>
      data?.tiebreakers.filter(
        ({ id }) => !localStageTiebreakers.includes(id)
      ) || []
  );

  const tiebreakerMapping = useMemo(() => {
    return data?.tiebreakers.reduce(
      (prev, { id, description }) => ({
        ...prev,
        [id]: description,
      }),
      {}
    ) as { [id: number]: string };
  }, [data?.tiebreakers]);

  const onAddTiebreaker = useCallback(
    (id: number) => () => {
      setLocalStageTiebreakers((current) => [...current, id]);
      setRemainingTiebreakers((current) =>
        current.filter((tb) => tb.id !== id)
      );
    },
    []
  );

  const onRemoveTiebreaker = useCallback(
    (id: number) => () => {
      setLocalStageTiebreakers((current) => current.filter((i) => i !== id));
      setRemainingTiebreakers((current) => [
        ...current,
        { id, description: tiebreakerMapping[id] },
      ]);
    },
    [tiebreakerMapping]
  );

  const onSave = useCallback(async () => {
    const result = await updateTiebreakers({
      id: Number(stageId),
      tiebreakers: localStageTiebreakers,
    });
    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [localStageTiebreakers, show, stageId, updateTiebreakers]);

  const onUploadBulk = useCallback(async () => {
    bulkTiebreakerDialogRef.current?.showModal();
  }, []);

  const onCarryOver = useCallback(async () => {
    const result = await carryOverPoints({
      stageId: Number(stageId),
    });
    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [carryOverPoints, show, stageId]);

  const onApplyTiebreakerToAll = useCallback(async () => {
    const result = await applyTiebreakerToAll({
      stageId: Number(stageId),
    });
    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [applyTiebreakerToAll, show, stageId]);

  const onBulkAdd = useCallback(
    async (file: FileList) => {
      if (!file?.item(0)) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file.item(0)!);
      formData.append("stageId", String(stageId));
      const response = await client.postForm(
        "/stagePlayerInfos/uploadTiebreakerListBulk",
        formData
      );
      return response;
    },
    [stageId]
  );

  const onSubmitBulkTiebreaker = useCallback(
    async ({ file }: { file: FileList }) => {
      const result = await onBulkAdd(file);
      if (result?.status !== 201) {
        return alert(result?.statusText);
      }
      show();
      bulkTiebreakerFormRef.current?.reset();
      bulkTiebreakerDialogRef.current?.close();
    },
    [onBulkAdd, show]
  );

  return (
    <GridContainer>
      <BulkPlayerDialog
        dialogRef={bulkTiebreakerDialogRef}
        formRef={bulkTiebreakerFormRef}
        onSubmit={onSubmitBulkTiebreaker}
      />
      <GridLeftSide>
        <SearchListContainer>
          <SearchListBody>
            {remainingTiebreakers.map((tb) => (
              <SearchListEntry key={tb.id}>
                <StyledTiebreakerListItem
                  clickable
                  onClick={onAddTiebreaker(tb.id)}
                >
                  {tb.description}
                </StyledTiebreakerListItem>
              </SearchListEntry>
            ))}
          </SearchListBody>
        </SearchListContainer>
      </GridLeftSide>
      <GridRightSide>
        <BoardListContainer>
          <BoardListHeader>
            <StyledTitle>Stage Tiebreakers</StyledTitle>
            <BoardListButtons>
              <ProTFTButton onClick={onUploadBulk}>Upload Bulk</ProTFTButton>
              <ProTFTButton onClick={onCarryOver}>
                Carry over points
              </ProTFTButton>
              <ProTFTButton onClick={onApplyTiebreakerToAll}>
                Apply TB to all
              </ProTFTButton>
              <ProTFTButton onClick={onSave}>Save</ProTFTButton>
            </BoardListButtons>
          </BoardListHeader>
          <BoardListBody>
            <PlayerBoard>
              {localStageTiebreakers.map((id) => (
                <StyledTiebreakerListItem key={id}>
                  {tiebreakerMapping[id]}
                  <DeleteButton onClick={onRemoveTiebreaker(id)} />
                </StyledTiebreakerListItem>
              ))}
            </PlayerBoard>
          </BoardListBody>
        </BoardListContainer>
      </GridRightSide>
    </GridContainer>
  );
};
