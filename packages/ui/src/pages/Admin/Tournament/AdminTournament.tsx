import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../components/Button/Button";
import { TournamentContent } from "../../../components/TournamentContent/TournamentContent";
import { Tournament } from "../../../graphql/schema";
import { StyledHeaderContainer } from "../../Tournament/Tournament.styled";
import { useToast } from "../Components/Toast/Toast";
import { useTournamentDialog } from "../Components/Dialogs/TournamentDialog/TournamentDialog";
import { ADMIN_TOURNAMENTS_PATH } from "../Tournaments/AdminTournaments";
import { StyledActionsContainer, StyledBar } from "./AdminTournament.styled";
import { AdminTournamentContent } from "./Content/Content";
import {
  CLONE_TOURNAMENT_MUTATION,
  DeleteResultsResult,
  DeleteResultsVariables,
  DELETE_RESULTS_MUTATION,
  DELETE_TOURNAMENT_MUTATION,
  LockResultsResult,
  LockResultsVariables,
  LOCK_RESULTS_MUTATION,
  TournamentQueryResponse,
  TournamentsDeleteResult,
  TournamentsUpdateResult,
  TournamentUpdateVariables,
  TOURNAMENT_QUERY,
  UPDATE_TOURNAMENT_MUTATION,
} from "./queries";
import { OnlyWebmaster } from "../../../components/AuthContainer/AuthContainer";
import {
  CloneTournamentMutation,
  CloneTournamentMutationVariables,
  MutationCloneTournamentArgs,
} from "../../../gql/graphql";
import { useCloneTournamentDialog } from "../Components/Dialogs/CloneTournamentDialog/CloneTournamentDialog";

export const AdminTournament = () => {
  const { id: tournamentId } = useParams();

  const navigate = useNavigate();
  const { show } = useToast();

  const [{ data }, refetch] = useQuery<TournamentQueryResponse>({
    query: TOURNAMENT_QUERY,
    variables: { id: Number(tournamentId) },
  });

  const [, deleteTournament] = useMutation<
    TournamentsDeleteResult,
    { id: number }
  >(DELETE_TOURNAMENT_MUTATION);

  const [, updateTournament] = useMutation<
    TournamentsUpdateResult,
    TournamentUpdateVariables
  >(UPDATE_TOURNAMENT_MUTATION);

  const [, cloneTournament] = useMutation<
    CloneTournamentMutation,
    CloneTournamentMutationVariables
  >(CLONE_TOURNAMENT_MUTATION);

  const [, lockResults] = useMutation<LockResultsResult, LockResultsVariables>(
    LOCK_RESULTS_MUTATION
  );

  const [, deleteResults] = useMutation<
    DeleteResultsResult,
    DeleteResultsVariables
  >(DELETE_RESULTS_MUTATION);

  const onDeleteTournament = useCallback(async () => {
    const deleteResult = await deleteTournament({ id: Number(tournamentId) });
    if (deleteResult.error) {
      return alert(deleteResult.error);
    }
    navigate(ADMIN_TOURNAMENTS_PATH);
  }, [deleteTournament, tournamentId, navigate]);

  const onSubmitUpdateTournament = useCallback(
    (tournament: Omit<Tournament, "id" | "set">) =>
      updateTournament({
        ...tournament,
        id: Number(tournamentId),
      }),
    [tournamentId, updateTournament]
  );

  const onSubmitCloneTournament = useCallback(
    ({ name, setId }: CloneTournamentMutationVariables) =>
      cloneTournament({
        name,
        setId,
        tournamentId: Number(tournamentId),
      }),
    [cloneTournament, tournamentId]
  );

  const onToggleVisibility = useCallback(async () => {
    const result = await updateTournament({
      id: Number(tournamentId),
      visibility: !Boolean(data?.tournament.visibility),
    });

    if (result.error) {
      return alert(result.error);
    }
    refetch();
    show();
  }, [
    data?.tournament.visibility,
    tournamentId,
    updateTournament,
    refetch,
    show,
  ]);

  const onLockResults = useCallback(async () => {
    const result = await lockResults({
      id: Number(tournamentId),
    });

    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [lockResults, tournamentId, show]);

  const onDeleteResults = useCallback(async () => {
    const result = await deleteResults({
      id: Number(tournamentId),
    });

    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [deleteResults, tournamentId, show]);

  const onBackToList = useCallback(() => {
    navigate(ADMIN_TOURNAMENTS_PATH);
  }, [navigate]);

  const { dialog: tournamentDialog, openDialog } = useTournamentDialog({
    onSubmit: onSubmitUpdateTournament,
    onSuccess: refetch,
    tournament: data?.tournament,
  });

  const onSuccessCloneTournament = useCallback(
    ({ cloneTournament }: CloneTournamentMutation) => {
      navigate(`${ADMIN_TOURNAMENTS_PATH}/${cloneTournament.id}/players`);
    },
    [navigate]
  );

  const {
    dialog: cloneTournamentDialog,
    openDialog: openCloneTournamentDialog,
  } = useCloneTournamentDialog({
    onSubmit: onSubmitCloneTournament,
    onSuccess: onSuccessCloneTournament,
    entity: {
      name: data?.tournament.name,
      setId: data?.tournament.setId,
    },
  });

  const onUpdateTournament = useCallback(() => {
    openDialog();
  }, [openDialog]);

  const onCloneTournament = useCallback(() => {
    openCloneTournamentDialog();
  }, [openCloneTournamentDialog]);

  return (
    <div>
      {tournamentDialog}
      {cloneTournamentDialog}
      <StyledBar>
        <StyledActionsContainer>
          <ProTFTButton onClick={onBackToList}>Back to list</ProTFTButton>
        </StyledActionsContainer>
        <StyledActionsContainer>
          <OnlyWebmaster>
            <ProTFTButton onClick={onLockResults}>Lock results</ProTFTButton>
            <ProTFTButton onClick={onDeleteResults}>
              Delete results
            </ProTFTButton>
          </OnlyWebmaster>
          <ProTFTButton onClick={onToggleVisibility}>
            Make {data?.tournament.visibility ? "invisible" : "visible"}
          </ProTFTButton>
          <OnlyWebmaster>
            <ProTFTButton onClick={onCloneTournament}>Clone</ProTFTButton>
          </OnlyWebmaster>
          <ProTFTButton onClick={onUpdateTournament}>Update</ProTFTButton>
          <ProTFTButton onClick={onDeleteTournament}>Delete</ProTFTButton>
        </StyledActionsContainer>
      </StyledBar>
      <StyledHeaderContainer>
        <TournamentContent tournament={data!.tournament} />
      </StyledHeaderContainer>
      <AdminTournamentContent />
    </div>
  );
};
