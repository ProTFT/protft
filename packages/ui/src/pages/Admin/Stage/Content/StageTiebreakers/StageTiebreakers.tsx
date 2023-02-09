import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "urql";
import { ProTFTButton } from "../../../../../components/Button/Button";
import { Tiebreaker } from "../../../../../graphql/schema";
import { DeleteButton } from "../../../Components/DeleteButton/DeleteButton";
import {
  StyledLeftSide,
  StyledRightSide,
} from "../../../Components/Layout/TwoSided.styled";
import { useToast } from "../../../Components/Toast/Toast";
import {
  StageQueryResponse,
  STAGE_QUERY,
  TiebreakersQueryResult,
  TIEBREAKERS_QUERY,
  UpdateStageTiebreakersResult,
  UpdateStageTiebreakersVariables,
  UPDATE_STAGE_TIEBREAKERS_MUTATION,
} from "./queries";
import {
  StyledContainer,
  StyledStageTiebreakerBar,
  StyledStageTiebreakerList,
  StyledTiebreakerListItem,
  StyledTitle,
} from "./StageTiebreakers.styled";

export const StageTiebreakers = () => {
  const { stageId } = useParams();
  const { show } = useToast();

  const [{ data: stageData }] = useQuery<StageQueryResponse>({
    query: STAGE_QUERY,
    variables: {
      id: Number(stageId),
    },
  });

  const [{ data }] = useQuery<TiebreakersQueryResult>({
    query: TIEBREAKERS_QUERY,
  });

  const [, updateTiebreakers] = useMutation<
    UpdateStageTiebreakersResult,
    UpdateStageTiebreakersVariables
  >(UPDATE_STAGE_TIEBREAKERS_MUTATION);

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

  return (
    <StyledContainer>
      <StyledLeftSide>
        {remainingTiebreakers.map((tb) => (
          <StyledTiebreakerListItem
            clickable
            key={tb.id}
            onClick={onAddTiebreaker(tb.id)}
          >
            {tb.description}
          </StyledTiebreakerListItem>
        ))}
      </StyledLeftSide>
      <StyledRightSide>
        <StyledStageTiebreakerBar>
          <StyledTitle>{`Stage Tiebreakers`}</StyledTitle>
          <ProTFTButton onClick={onSave}>Save</ProTFTButton>
        </StyledStageTiebreakerBar>
        <StyledStageTiebreakerList>
          {localStageTiebreakers.map((id) => (
            <StyledTiebreakerListItem key={id}>
              {tiebreakerMapping[id]}
              <DeleteButton onClick={onRemoveTiebreaker(id)} />
            </StyledTiebreakerListItem>
          ))}
        </StyledStageTiebreakerList>
      </StyledRightSide>
    </StyledContainer>
  );
};
