import { useCallback } from "react";
import { useMutation } from "urql";
import { ProTFTButton } from "../../../../components/Button/Button";
import { RegionsIndicator } from "../../../../components/RegionIndicator/RegionIndicator";
import { Player } from "../../../../graphql/schema";
import { useToast } from "../../Components/Toast/Toast";
import {
  DeletePlayerResult,
  DeletePlayerVariables,
  DELETE_PLAYER_MUTATION,
} from "../queries";
import { StyledContainer, StyledText } from "./PlayerListItem.styled";

interface Props {
  player: Player;
  afterDelete: () => void;
}

export const PlayerListItem = ({ player, afterDelete }: Props) => {
  const { show } = useToast();

  const [, deletePlayer] = useMutation<
    DeletePlayerResult,
    DeletePlayerVariables
  >(DELETE_PLAYER_MUTATION);

  const onDelete = useCallback(
    (id: number) => async () => {
      const result = await deletePlayer({ id });
      if (result.error) {
        return alert(result.error);
      }
      show();
      afterDelete();
    },
    [deletePlayer, afterDelete, show]
  );

  return (
    <StyledContainer>
      <StyledText>{player.name}</StyledText>
      <RegionsIndicator regionCodes={[player.region!]} />
      <StyledText>{player.country}</StyledText>
      <ProTFTButton onClick={onDelete(player.id)}>Delete</ProTFTButton>
    </StyledContainer>
  );
};
