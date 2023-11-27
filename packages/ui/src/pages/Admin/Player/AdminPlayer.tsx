import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../components/Button/Button";
import { useToast } from "../Components/Toast/Toast";
import { StyledActionsContainer, StyledBar } from "./AdminPlayer.styled";
import { AdminPlayerContent } from "./Content/Content";
import {
  AdminPlayerQuery,
  AdminPlayerQueryVariables,
  DeletePlayerMutation,
  DeletePlayerMutationVariables,
  Player,
  UpdatePlayerMutation,
  UpdatePlayerMutationVariables,
} from "../../../gql/graphql";
import { PLAYER_QUERY } from "./queries";
import { ADMIN_PLAYERS_PATH } from "../Players/AdminPlayers";
import { usePlayerDialog } from "../Components/Dialogs/PlayerDialog/PlayerDialog";
import {
  DELETE_PLAYER_MUTATION,
  UPDATE_PLAYER_MUTATION,
} from "../Players/queries";
import { Header } from "../Components/Header/Header";
import { StyledBody, StyledTitle } from "../../../design/fonts/Fonts";
import {
  CountryIndicator,
  RegionsIndicator,
} from "../../../components/RegionIndicator/RegionIndicator";

export const AdminPlayer = () => {
  const { id: playerId } = useParams();

  const navigate = useNavigate();
  const { show } = useToast();

  const [{ data }, refetch] = useQuery<
    AdminPlayerQuery,
    AdminPlayerQueryVariables
  >({
    query: PLAYER_QUERY,
    variables: { id: Number(playerId) },
  });

  const backToList = useCallback(() => {
    navigate(ADMIN_PLAYERS_PATH);
  }, [navigate]);

  const [, deletePlayer] = useMutation<
    DeletePlayerMutation,
    DeletePlayerMutationVariables
  >(DELETE_PLAYER_MUTATION);

  const [, updatePlayer] = useMutation<
    UpdatePlayerMutation,
    UpdatePlayerMutationVariables
  >(UPDATE_PLAYER_MUTATION);

  const onDelete = useCallback(
    (id: number) => async () => {
      const result = await deletePlayer({ id });
      if (result.error) {
        return alert(result.error);
      }
      show();
      backToList();
    },
    [deletePlayer, backToList, show]
  );

  const onSubmitPlayerUpdate = useCallback(
    (playerId: number) =>
      async (player: Omit<Player, "id" | "playerStats" | "links">) =>
        updatePlayer({
          id: playerId,
          ...player,
        }),
    [updatePlayer]
  );

  const { dialog, openDialog } = usePlayerDialog({
    player: data?.player,
    onSubmit: onSubmitPlayerUpdate(data?.player.id!),
    onSuccess: refetch,
  });

  const onUpdate = useCallback(() => {
    openDialog();
  }, [openDialog]);

  return (
    <div>
      {dialog}
      <StyledBar>
        <StyledActionsContainer>
          <ProTFTButton onClick={backToList}>Back to list</ProTFTButton>
        </StyledActionsContainer>
        <StyledActionsContainer>
          <ProTFTButton onClick={onUpdate}>Update</ProTFTButton>
          <ProTFTButton onClick={onDelete(data?.player.id!)}>
            Delete
          </ProTFTButton>
        </StyledActionsContainer>
      </StyledBar>
      <Header src="/no_pic.webp" alt={data?.player.name || ""}>
        <div>
          <StyledTitle>{data?.player.name}</StyledTitle>
          <StyledBody>AKA: {data?.player.alias}</StyledBody>
        </div>
        <div>
          <CountryIndicator countryCode={data?.player.country} showName />
          <RegionsIndicator
            regionCodes={data?.player.region ? [data?.player.region] : []}
            showName
          />
        </div>
      </Header>
      <AdminPlayerContent />
    </div>
  );
};
