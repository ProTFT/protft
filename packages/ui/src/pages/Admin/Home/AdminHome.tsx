import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { Tournament } from "../../../graphql/schema";
import { TournamentListItem } from "../../Tournaments/TournamentListItem/TournamentListItem";
import { StyledTournamentList } from "../../Tournaments/Tournaments.styled";
import { StyledAdminBar } from "../Components/AdminBar/AdminBar.styled";
import { useToast } from "../Components/Toast/Toast";
import { TournamentDialog } from "../Components/TournamentDialog/TournamentDialog";
import { StyledButton, StyledContainer } from "./AdminHome.styled";
import {
  CreateTournamentResult,
  CreateTournamentVariables,
  CREATE_PLAYER_SLUGS_MUTATION,
  CREATE_TOURNAMENT_QUERY,
  CREATE_TOURNAMENT_SLUGS_MUTATION,
  TournamentsQueryResult,
  TOURNAMENTS_QUERY,
} from "./queries";

export const AdminHome = () => {
  const searchQuery = "";
  const [{ data }, refetch] = useQuery<TournamentsQueryResult>({
    query: TOURNAMENTS_QUERY,
    variables: {
      searchQuery,
    },
  });

  const [, createTournament] = useMutation<
    CreateTournamentResult,
    CreateTournamentVariables
  >(CREATE_TOURNAMENT_QUERY);

  const [, createTournamentSlugs] = useMutation(
    CREATE_TOURNAMENT_SLUGS_MUTATION
  );

  const [, createPlayerSlugs] = useMutation(CREATE_PLAYER_SLUGS_MUTATION);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { show } = useToast();

  const onSubmit = async (tournament: Omit<Tournament, "id" | "set">) => {
    const result = await createTournament(tournament);
    if (result.error) {
      return alert(result.error);
    }
    show();
    formRef.current?.reset();
    dialogRef.current?.close();
    refetch();
  };

  const onCreateTournamentSlugs = useCallback(async () => {
    const result = await createTournamentSlugs({});
    if (result.error) {
      return alert(result.error);
    }
  }, [createTournamentSlugs]);

  const onCreatePlayerSlugs = useCallback(async () => {
    const result = await createPlayerSlugs({});
    if (result.error) {
      return alert(result.error);
    }
  }, [createPlayerSlugs]);

  return (
    <StyledContainer>
      <TournamentDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
      />
      <StyledAdminBar>
        <StyledButton onClick={onCreateTournamentSlugs}>
          Create Tournament Slugs
        </StyledButton>
        <StyledButton onClick={onCreatePlayerSlugs}>
          Create Player Slugs
        </StyledButton>
        <StyledButton onClick={() => dialogRef.current?.showModal()}>
          Add Tournament
        </StyledButton>
      </StyledAdminBar>
      <StyledTournamentList>
        {data?.tournaments.map((tournament) => (
          <Link key={tournament.id} to={`${tournament.id}`}>
            <TournamentListItem tournament={tournament} />
          </Link>
        ))}
      </StyledTournamentList>
    </StyledContainer>
  );
};
