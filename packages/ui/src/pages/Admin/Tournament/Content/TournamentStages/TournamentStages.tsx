import { Link, useParams } from "react-router-dom";
import {
  CreateStageResult,
  CreateStageVariables,
  CREATE_STAGE_MUTATION,
  TournamentStageQueryResponse,
  TOURNAMENT_STAGES_QUERY,
} from "./queries";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../../../components/Button/Button";
import { useRef, useCallback } from "react";
import { StageDialog } from "../../../Components/Dialogs/StageDialog/StageDialog";
import { Stage } from "../../../../../graphql/schema";
import {
  StyledButtonBar,
  StyledStagesContainer,
} from "./TournamentStages.styled";
import { StageCard } from "./StageCard/StageCard";
import { useToast } from "../../../Components/Toast/Toast";
import { StyledVerticalContainer } from "../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";

export const TournamentStages = () => {
  const { id: tournamentId } = useParams();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { show } = useToast();

  const [{ data }, refetch] = useQuery<TournamentStageQueryResponse>({
    query: TOURNAMENT_STAGES_QUERY,
    variables: { id: Number(tournamentId) },
  });

  const [, createStage] = useMutation<CreateStageResult, CreateStageVariables>(
    CREATE_STAGE_MUTATION
  );

  const networkRefetch = useCallback(() => refetch(), [refetch]);

  const onSubmit = useCallback(
    async (stage: Omit<Stage, "id" | "rounds" | "lobbies">) => {
      const result = await createStage({
        ...stage,
        startDateTime: stage.startDateTime ?? undefined,
        tournamentId: Number(tournamentId),
      });
      if (result.error) {
        return alert(result.error);
      }
      show();
      formRef.current?.reset();
      dialogRef.current?.close();
      networkRefetch();
    },
    [createStage, networkRefetch, show, tournamentId]
  );

  const onClickNewStage = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <StyledVerticalContainer>
      <StageDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
      />
      <StyledButtonBar>
        <ProTFTButton width="20%" onClick={onClickNewStage}>
          Add Stage
        </ProTFTButton>
      </StyledButtonBar>
      <StyledStagesContainer>
        {data?.tournament.stages?.map((stage) => {
          return (
            <Link key={stage.id} to={`${stage.id}/players`}>
              <StageCard key={stage.id} stage={stage} />
            </Link>
          );
        })}
      </StyledStagesContainer>
    </StyledVerticalContainer>
  );
};
