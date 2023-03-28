import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../components/Button/Button";
import { Tournament } from "../../../graphql/schema";
import { TournamentListItem } from "../../Tournaments/TournamentListItem/TournamentListItem";
import { StyledAdminBar } from "../Components/AdminBar/AdminBar.styled";
import { useToast } from "../Components/Toast/Toast";
import { TournamentDialog } from "../Components/Dialogs/TournamentDialog/TournamentDialog";
import {
  StyledContainer,
  StyledTournamentList,
} from "./AdminTournaments.styled";
import {
  CreateTournamentResult,
  CreateTournamentVariables,
  CREATE_PLAYER_SLUGS_MUTATION,
  CREATE_TOURNAMENT_QUERY,
  TournamentsQueryResult,
  TOURNAMENTS_QUERY,
} from "./queries";

export const ADMIN_TOURNAMENTS_PATH = "/admin/tournaments";

export const AdminTournaments = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { show } = useToast();

  const [{ data }, refetch] = useQuery<TournamentsQueryResult>({
    query: TOURNAMENTS_QUERY,
  });

  const [, createTournament] = useMutation<
    CreateTournamentResult,
    CreateTournamentVariables
  >(CREATE_TOURNAMENT_QUERY);

  const [, createPlayerSlugs] = useMutation(CREATE_PLAYER_SLUGS_MUTATION);

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

  const onCreatePlayerSlugs = useCallback(async () => {
    const result = await createPlayerSlugs({});
    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [createPlayerSlugs, show]);

  const onAddTournament = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <StyledContainer>
      <TournamentDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
      />
      <StyledAdminBar>
        <ProTFTButton onClick={onCreatePlayerSlugs}>
          Create Player Slugs
        </ProTFTButton>
        <ProTFTButton onClick={onAddTournament}>Add Tournament</ProTFTButton>
      </StyledAdminBar>
      <StyledTournamentList>
        {data?.adminTournaments.map((tournament) => (
          <Link key={tournament.id} to={`${tournament.id}/players`}>
            <TournamentListItem tournament={tournament} />
          </Link>
        ))}
      </StyledTournamentList>
    </StyledContainer>
  );
};
