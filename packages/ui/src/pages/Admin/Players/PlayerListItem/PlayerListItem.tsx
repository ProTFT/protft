import { useCallback } from "react";
import { useMutation } from "urql";
import { ProTFTButton } from "../../../../components/Button/Button";
import { TextIconHorizontalContainer } from "../../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { RegionsIndicator } from "../../../../components/RegionIndicator/RegionIndicator";
import { Player } from "../../../../graphql/schema";
// import { PlayerDialog } from "../../Components/Dialogs/PlayerDialog/PlayerDialog";
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
  // const playerDialogRef = useRef<HTMLDialogElement>(null);
  // const playerFormRef = useRef<HTMLFormElement>(null);

  const [, deletePlayer] = useMutation<
    DeletePlayerResult,
    DeletePlayerVariables
  >(DELETE_PLAYER_MUTATION);

  // const [, updatePlayer] = useMutation<
  //   TournamentsUpdateResult,
  //   TournamentUpdateVariables
  // >(UPDATE_PLAYER_MUTATION);

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

  // const onUpdate = useCallback(() => {
  //   playerDialogRef.current?.show();
  // }, []);

  // const onSubmitPlayerUpdate = useCallback(
  //   async (player: Omit<Player, "id">) => {
  //     const result = await updatePlayer({
  //       ...player,
  //     });

  //     if (result.error) {
  //       return alert(result.error);
  //     }
  //     show();
  //     playerFormRef.current?.reset();
  //     playerFormRef.current?.close();
  //   },
  //   [show, updatePlayer]
  // );

  return (
    <StyledContainer>
      <StyledText>{`${player.id} - ${player.name}`}</StyledText>
      <RegionsIndicator regionCodes={[player.region!]} />
      <StyledText>{player.country}</StyledText>
      <TextIconHorizontalContainer>
        <ProTFTButton onClick={onDelete(player.id)}>Delete</ProTFTButton>
        {/* <ProTFTButton onClick={onUpdate}>Update</ProTFTButton> */}
      </TextIconHorizontalContainer>
      {/* <PlayerDialog
        dialogRef={playerDialogRef}
        formRef={playerFormRef}
        onSubmit={onSubmitPlayerUpdate}
        player={player}
      /> */}
    </StyledContainer>
  );
};
