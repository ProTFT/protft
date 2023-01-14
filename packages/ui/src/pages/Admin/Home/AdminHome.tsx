import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { Tournament } from "../../../graphql/schema";
import { useAuth } from "../../../hooks/useAuth";
import { TournamentListItem } from "../../Tournaments/TournamentListItem/TournamentListItem";
import { StyledTournamentList } from "../../Tournaments/Tournaments.styled";
import { StyledAdminBar } from "../Components/AdminBar/AdminBar.styled";
import { TournamentDialog } from "../Components/TournamentDialog/TournamentDialog";
import {
  CreateTournamentResult,
  CreateTournamentVariables,
  CREATE_TOURNAMENT_QUERY,
} from "../TournamentWizard/queries";
import { StyledButton, StyledContainer } from "./AdminHome.styled";
import { TournamentsQueryResult, TOURNAMENTS_QUERY } from "./queries";

export const AdminHome = () => {
  const { signout } = useAuth();
  const searchQuery = "";
  const [{ data }, refetch] = useQuery<TournamentsQueryResult>({
    query: TOURNAMENTS_QUERY,
    variables: {
      searchQuery,
    },
    requestPolicy: "network-only",
  });

  const [, createTournament] = useMutation<
    CreateTournamentResult,
    CreateTournamentVariables
  >(CREATE_TOURNAMENT_QUERY);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (tournament: Omit<Tournament, "id" | "set">) => {
    const result = await createTournament(tournament);
    if (result.error) {
      return alert(result.error);
    }
    formRef.current?.reset();
    dialogRef.current?.close();
    refetch();
  };

  return (
    <StyledContainer>
      <TournamentDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
      />
      <StyledAdminBar>
        <button
          onClick={() => {
            signout();
          }}
        >
          Logout
        </button>
        <StyledButton onClick={() => dialogRef.current?.showModal()}>
          Add Tournament
        </StyledButton>
      </StyledAdminBar>
      <StyledTournamentList>
        {data?.tournaments.map((tournament) => (
          <Link key={tournament.id} to={`tournaments/${tournament.id}`}>
            <TournamentListItem tournament={tournament} />
          </Link>
        ))}
      </StyledTournamentList>
    </StyledContainer>
  );
};
