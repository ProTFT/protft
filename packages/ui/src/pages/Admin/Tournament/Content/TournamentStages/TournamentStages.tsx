import { Link, useParams } from "react-router-dom";
import { StyledContainer } from "../Content.styled";
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
import { StageDialog } from "../../../Components/StageDialog/StageDialog";
import { Stage } from "../../../../../graphql/schema";
import {
  StyledButtonBar,
  StyledStagesContainer,
} from "./TournamentStages.styled";
import { StageCard } from "./StageCard/StageCard";
import { useToast } from "../../../Components/Toast/Toast";

export const TournamentStages = () => {
  const { id: tournamentId } = useParams();
  const [{ data }, refetch] = useQuery<TournamentStageQueryResponse>({
    query: TOURNAMENT_STAGES_QUERY,
    variables: { id: Number(tournamentId) },
  });
  const networkRefetch = useCallback(() => refetch(), [refetch]);

  const [, createStage] = useMutation<CreateStageResult, CreateStageVariables>(
    CREATE_STAGE_MUTATION
  );

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { show } = useToast();

  const onSubmit = async (stage: Omit<Stage, "id" | "rounds" | "lobbies">) => {
    const result = await createStage({
      ...stage,
      tournamentId: Number(tournamentId),
      isFinal: false,
    });
    if (result.error) {
      return alert(result.error);
    }
    show();
    formRef.current?.reset();
    dialogRef.current?.close();
    networkRefetch();
  };

  const onClickNewStage = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <StyledContainer>
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
            <Link key={stage.id} to={`${stage.id}`}>
              <StageCard key={stage.id} stage={stage} />
            </Link>
          );
        })}
      </StyledStagesContainer>
    </StyledContainer>
  );
};
