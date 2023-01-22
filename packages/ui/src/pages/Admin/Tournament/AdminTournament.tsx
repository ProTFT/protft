import { useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { TournamentContent } from "../../../components/TournamentContent/TournamentContent";
import { Tournament } from "../../../graphql/schema";
import { StyledHeaderContainer } from "../../Tournament/Tournament.styled";
import { useToast } from "../Components/Toast/Toast";
import { TournamentDialog } from "../Components/TournamentDialog/TournamentDialog";
import {
  StyledActionButton,
  StyledActionsContainer,
  StyledBar,
} from "./AdminTournament.styled";
import { AdminTournamentContent } from "./Content/Content";
import {
  DELETE_TOURNAMENT_MUTATION,
  TournamentQueryResponse,
  TournamentsDeleteResult,
  TournamentsUpdateResult,
  TournamentUpdateVariables,
  TOURNAMENT_QUERY,
  UPDATE_TOURNAMENT_MUTATION,
} from "./queries";

export const AdminTournament = () => {
  const { id: tournamentId } = useParams();
  const navigate = useNavigate();
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

  const handleDeleteTournament = useCallback(async () => {
    const deleteResult = await deleteTournament({ id: Number(tournamentId) });
    if (deleteResult.error) {
      return alert(deleteResult.error);
    }
    navigate("/admin/tournaments");
  }, [deleteTournament, tournamentId, navigate]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { show } = useToast();

  const onSubmit = async (tournament: Omit<Tournament, "id" | "set">) => {
    const result = await updateTournament({
      ...tournament,
      id: Number(tournamentId),
    });

    if (result.error) {
      return alert(result.error);
    }
    show();
    formRef.current?.reset();
    dialogRef.current?.close();
    refetch();
  };

  const handleUpdateTournament = () => {
    dialogRef.current?.showModal();
  };

  const handleBackToList = useCallback(() => {
    navigate("/admin/tournaments");
  }, [navigate]);

  return (
    <div>
      <TournamentDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
        tournament={data?.tournament}
      />
      <StyledBar>
        <StyledActionsContainer>
          <StyledActionButton onClick={handleBackToList}>
            Back to list
          </StyledActionButton>
        </StyledActionsContainer>
        <StyledActionsContainer>
          <StyledActionButton onClick={handleUpdateTournament}>
            Update
          </StyledActionButton>
          <StyledActionButton onClick={handleDeleteTournament}>
            Delete
          </StyledActionButton>
        </StyledActionsContainer>
      </StyledBar>
      <StyledHeaderContainer>
        <TournamentContent tournament={data!.tournament} />
      </StyledHeaderContainer>
      <AdminTournamentContent />
    </div>
  );
};
