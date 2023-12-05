import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../components/Button/Button";
import { TournamentListItem } from "../../Tournaments/TournamentListItem/TournamentListItem";
import { StyledAdminBar } from "../Components/AdminBar/AdminBar.styled";
import { useToast } from "../Components/Toast/Toast";
import { useTournamentDialog } from "../Components/Dialogs/TournamentDialog/TournamentDialog";
import {
  StyledContainer,
  StyledTournamentList,
} from "./AdminTournaments.styled";
import {
  CREATE_PLAYER_SLUGS_MUTATION,
  CREATE_TOURNAMENT_QUERY,
  TournamentsQueryResult,
  TOURNAMENTS_QUERY,
} from "./queries";
import { useObserver } from "../../../hooks/useObserver";
import { usePagination } from "../../../hooks/usePagination";
import { SearchField } from "../../../components/SearchFilterBar/SearchField";
import { CreateTournamentMutationVariables } from "../../../gql/graphql";
import { useAuth } from "../../../hooks/useAuth";
import { OnlyWebmaster } from "../../../components/AuthContainer/AuthContainer";

export const ADMIN_TOURNAMENTS_PATH = "/admin/tournaments";

const ITEMS_PER_PAGE = 20;

export const AdminTournaments = () => {
  const { show } = useToast();
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { paginationArgs } = usePagination(page, ITEMS_PER_PAGE);

  const [{ data }, refetch] = useQuery<TournamentsQueryResult>({
    query: TOURNAMENTS_QUERY,
    variables: { searchQuery, ...paginationArgs },
  });

  const [, createTournament] = useMutation(CREATE_TOURNAMENT_QUERY);

  const [, createPlayerSlugs] = useMutation(CREATE_PLAYER_SLUGS_MUTATION);

  const onSubmit = useCallback(
    (tournament: CreateTournamentMutationVariables) =>
      createTournament({
        ...tournament,
      }),
    [createTournament]
  );

  const onLoadMore = useCallback(() => {
    setPage((curr) => curr + 1);
  }, []);

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

  const bottomRef = useRef<HTMLDivElement>(null);

  useObserver(bottomRef, onLoadMore);

  return (
    <StyledContainer>
      {dialog}
      <StyledAdminBar>
        <SearchField
          placeholder="Search tournaments"
          setSearchQuery={setSearchQuery}
        />
        <OnlyWebmaster>
          <ProTFTButton onClick={onCreatePlayerSlugs}>
            Create Player Slugs
          </ProTFTButton>
        </OnlyWebmaster>
        <ProTFTButton onClick={onAddTournament}>Add Tournament</ProTFTButton>
      </StyledAdminBar>
      <StyledTournamentList>
        {data?.adminTournaments.map((tournament) => (
          <Link key={tournament.id} to={`${tournament.id}/players`}>
            <TournamentListItem tournament={tournament} />
          </Link>
        ))}
        <div ref={bottomRef} />
      </StyledTournamentList>
    </StyledContainer>
  );
};
