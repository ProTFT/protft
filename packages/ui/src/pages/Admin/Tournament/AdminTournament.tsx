import { useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { TournamentContent } from "../../../components/TournamentContent/TournamentContent";
import { Tournament } from "../../../graphql/schema";
import {
  TournamentQueryResponse,
  TOURNAMENT_QUERY,
} from "../../Tournament/queries";
import { StyledHeaderContainer } from "../../Tournament/Tournament.styled";
import { TournamentDialog } from "../Components/TournamentDialog/TournamentDialog";
import {
  StyledActionButton,
  StyledActionsContainer,
} from "./AdminTournament.styled";
import {
  DELETE_TOURNAMENT_MUTATION,
  TournamentsDeleteResult,
  TournamentsUpdateResult,
  TournamentUpdateVariables,
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
    navigate("/admin");
  }, [deleteTournament, tournamentId, navigate]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (tournament: Omit<Tournament, "id" | "set">) => {
    const result = await updateTournament({
      ...tournament,
      id: Number(tournamentId),
    });

    if (result.error) {
      return alert(result.error);
    }
    formRef.current?.reset();
    dialogRef.current?.close();
    refetch({ requestPolicy: "network-only" });
  };

  const handleUpdateTournament = () => {
    dialogRef.current?.showModal();
  };

  return (
    <div>
      <TournamentDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
        tournament={data?.tournament}
      />
      <StyledActionsContainer>
        <StyledActionButton onClick={handleUpdateTournament}>
          Update
        </StyledActionButton>
        <StyledActionButton onClick={handleDeleteTournament}>
          Delete
        </StyledActionButton>
      </StyledActionsContainer>
      <StyledHeaderContainer>
        <TournamentContent tournament={data!.tournament} />
      </StyledHeaderContainer>
    </div>
  );
};
