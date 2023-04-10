import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../components/Button/Button";
import { Tournament } from "../../../graphql/schema";
import { TournamentListItem } from "../../Tournaments/TournamentListItem/TournamentListItem";
import { StyledAdminBar } from "../Components/AdminBar/AdminBar.styled";
import { useToast } from "../Components/Toast/Toast";
import { useTournamentDialog } from "../Components/Dialogs/TournamentDialog/TournamentDialog";
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
  const { show } = useToast();

  const [{ data }, refetch] = useQuery<TournamentsQueryResult>({
    query: TOURNAMENTS_QUERY,
  });

  const [, createTournament] = useMutation<
    CreateTournamentResult,
    CreateTournamentVariables
  >(CREATE_TOURNAMENT_QUERY);

  const [, createPlayerSlugs] = useMutation(CREATE_PLAYER_SLUGS_MUTATION);

  const onSubmit = useCallback(
    (tournament: Omit<Tournament, "id" | "set">) =>
      createTournament({
        ...tournament,
      }),
    [createTournament]
  );

  const onCreatePlayerSlugs = useCallback(async () => {
    const result = await createPlayerSlugs({});
    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [createPlayerSlugs, show]);

  const { dialog, openDialog } = useTournamentDialog({
    onSubmit,
    onSuccess: refetch,
  });

  const onAddTournament = useCallback(() => {
    openDialog();
  }, [openDialog]);

  return (
    <StyledContainer>
      {dialog}
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
