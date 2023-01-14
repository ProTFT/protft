import { useCallback, useRef } from "react";
import { useMutation } from "urql";
import { ProTFTButton } from "../../../../../../components/Button/Button";
import { Stage } from "../../../../../../graphql/schema";
import { StageDialog } from "../../../../Components/StageDialog/StageDialog";
import {
  DELETE_STAGE_MUTATION,
  StageDeleteResult,
  UpdateStageResult,
  UpdateStageVariables,
  UPDATE_STAGE_MUTATION,
} from "./queries";
import {
  StyledBar,
  StyledInfo,
  StyledInfoContainer,
  StyledStageCard,
  StyledTitle,
} from "./StageCard.styled";

interface Props {
  tournamentId: number;
  stage: Stage;
  refetch: () => void;
}

export const StageCard = ({ tournamentId, stage, refetch }: Props) => {
  const [, deleteStage] = useMutation<StageDeleteResult, { id: number }>(
    DELETE_STAGE_MUTATION
  );

  const [, updateStage] = useMutation<UpdateStageResult, UpdateStageVariables>(
    UPDATE_STAGE_MUTATION
  );

  const handleDeleteTournament = useCallback(async () => {
    const deleteResult = await deleteStage({ id: stage.id });
    if (deleteResult.error) {
      return alert(deleteResult.error);
    }
    refetch();
  }, [deleteStage, stage.id, refetch]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (
    formStage: Omit<Stage, "id" | "rounds" | "lobbies">
  ) => {
    const result = await updateStage({
      ...formStage,
      id: stage.id,
      tournamentId,
      isFinal: false,
    });
    if (result.error) {
      return alert(result.error);
    }
    formRef.current?.reset();
    dialogRef.current?.close();
    refetch();
  };

  const onClickUpdateStage = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <StyledStageCard>
      <StageDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
        stage={stage}
      />
      <StyledBar>
        <ProTFTButton onClick={onClickUpdateStage}>Update</ProTFTButton>
        <ProTFTButton onClick={handleDeleteTournament}>Delete</ProTFTButton>
      </StyledBar>
      <StyledInfoContainer>
        <StyledTitle>{stage.name}</StyledTitle>
        <StyledInfo>#{stage.sequence}</StyledInfo>
        <StyledInfo>Description: {stage.description}</StyledInfo>
        <StyledInfo>Rounds: {stage.roundCount}</StyledInfo>
        <StyledInfo>Point Schema: {stage.pointSchema.name}</StyledInfo>
      </StyledInfoContainer>
    </StyledStageCard>
  );
};
