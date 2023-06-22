import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../../../components/Button/Button";
import { useCallback } from "react";
import { useToast } from "../../../Components/Toast/Toast";
import { StyledVerticalContainer } from "../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { DeleteButton } from "../../../Components/DeleteButton/DeleteButton";
import {
  CREATE_PLAYER_LINK_MUTATION,
  DELETE_PLAYER_LINK_MUTATION,
  PLAYER_LINKS_QUERY,
} from "./queries";
import {
  StreamList,
  StreamListItem,
  ButtonBar,
  ListContainer,
} from "./PlayerLinks.styled";
import { StyledBody } from "../../../../../design/fonts/Fonts";
import { usePlayerLinkDialog } from "../../../Components/Dialogs/PlayerLinkDialog/PlayerLinkDialog";
import {
  AdminPlayerLinksQuery,
  AdminPlayerLinksQueryVariables,
  DeletePlayerLinkMutation,
  DeletePlayerLinkMutationVariables,
  PlayerLink,
} from "../../../../../gql/graphql";

export const PlayerLinks = () => {
  const { id: playerId } = useParams();

  const { show } = useToast();

  const [{ data: playerLinks }, refetch] = useQuery<
    AdminPlayerLinksQuery,
    AdminPlayerLinksQueryVariables
  >({
    query: PLAYER_LINKS_QUERY,
    variables: { playerId: Number(playerId) },
  });

  const [, createPlayerLink] = useMutation(CREATE_PLAYER_LINK_MUTATION);

  const [, deleteLink] = useMutation<
    DeletePlayerLinkMutation,
    DeletePlayerLinkMutationVariables
  >(DELETE_PLAYER_LINK_MUTATION);

  const onSubmit = useCallback(
    async (stream: Omit<PlayerLink, "playerId">) =>
      createPlayerLink({
        playerId: Number(playerId),
        ...stream,
      }),
    [createPlayerLink, playerId]
  );

  const onDeleteLink = useCallback(
    (id: number) => async () => {
      const result = await deleteLink({
        id,
      });
      if (result.error) {
        return alert(result.error);
      }
      show();
      refetch();
    },
    [deleteLink, refetch, show]
  );

  const { dialog, openDialog } = usePlayerLinkDialog({
    onSubmit,
    onSuccess: refetch,
  });

  const onClickNewLink = useCallback(() => {
    openDialog();
  }, [openDialog]);

  return (
    <StyledVerticalContainer>
      {dialog}
      <ButtonBar>
        <ProTFTButton width="20%" onClick={onClickNewLink}>
          Add link
        </ProTFTButton>
      </ButtonBar>
      <ListContainer>
        <StreamList>
          {playerLinks?.player.links.map(({ id, type, link }) => (
            <StreamListItem>
              <StyledBody>{type}</StyledBody>
              <StyledBody>{link}</StyledBody>
              <DeleteButton onClick={onDeleteLink(id)} />
            </StreamListItem>
          ))}
        </StreamList>
      </ListContainer>
    </StyledVerticalContainer>
  );
};
