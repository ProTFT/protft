import { Suspense, useCallback, useRef, useState } from "react";
import { useMutation } from "urql";
import { ProTFTButton } from "../../../components/Button/Button";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { TextIconHorizontalContainer } from "../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { SearchField } from "../../../components/SearchFilterBar/SearchField";
import { client } from "../../../hooks/useAuth";
import { PlayersListSkeleton } from "../../Players/PlayersList/PlayersList.skeleton";
import { BulkPlayerDialog } from "../Components/Dialogs/BulkPlayerDialog/BulkPlayerDialog";
import {
  MergePlayerDialog,
  MergePlayerParameters,
} from "../Components/Dialogs/MergePlayerDialog/MergePlayerDialog";
import { useToast } from "../Components/Toast/Toast";
import { StyledContainer } from "./AdminPlayers.styled";
import { PlayerList } from "./PlayerList/PlayerList";
import {
  MergePlayerResult,
  MergePlayerVariables,
  MERGE_PLAYER_MUTATION,
} from "./queries";

export const AdminPlayers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { show } = useToast();
  const playerDialogRef = useRef<HTMLDialogElement>(null);
  const playerFormRef = useRef<HTMLFormElement>(null);

  const mergeDialogRef = useRef<HTMLDialogElement>(null);
  const mergeFormRef = useRef<HTMLFormElement>(null);

  const [, mergePlayer] = useMutation<MergePlayerResult, MergePlayerVariables>(
    MERGE_PLAYER_MUTATION
  );

  const onBulkAdd = useCallback(async (file: FileList, dryRun: boolean) => {
    if (!file?.item(0)) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file.item(0)!);
    formData.append("dryRun", String(dryRun));
    const response = await client.postForm("/players/uploadBulk", formData);
    return response;
  }, []);

  const onSubmitMergePlayer = useCallback(
    async ({ playerIdToMaintain, playerIdToRemove }: MergePlayerParameters) => {
      const result = await mergePlayer({
        playerIdToMaintain,
        playerIdToRemove,
      });
      if (result.error) {
        return alert(result.error);
      }
      show();
    },
    [mergePlayer, show]
  );

  const onSubmitBulkAddPlayer = useCallback(
    async ({ file, dryRun }: { file: FileList; dryRun: boolean }) => {
      const result = await onBulkAdd(file, dryRun);
      if (dryRun) {
        console.log(result?.data);
      }
      if (result?.status !== 201) {
        return alert(result?.statusText);
      }
      show();
      playerFormRef.current?.reset();
      playerDialogRef.current?.close();
    },
    [onBulkAdd, show]
  );

  const onClickAddBulkPlayer = useCallback(() => {
    playerDialogRef.current?.showModal();
  }, []);

  const onClickMergePlayer = useCallback(() => {
    mergeDialogRef.current?.showModal();
  }, []);

  return (
    <StyledContainer>
      <StyledHorizontalContainer>
        <SearchField
          placeholder="Search players"
          setSearchQuery={setSearchQuery}
        />
        <TextIconHorizontalContainer>
          <ProTFTButton onClick={onClickAddBulkPlayer}>Bulk Add</ProTFTButton>
          <ProTFTButton onClick={onClickMergePlayer}>Merge</ProTFTButton>
        </TextIconHorizontalContainer>
        <BulkPlayerDialog
          dialogRef={playerDialogRef}
          formRef={playerFormRef}
          onSubmit={onSubmitBulkAddPlayer}
        />
        <MergePlayerDialog
          dialogRef={mergeDialogRef}
          formRef={mergeFormRef}
          onSubmit={onSubmitMergePlayer}
        />
      </StyledHorizontalContainer>
      <Suspense fallback={<PlayersListSkeleton />}>
        <PlayerList searchQuery={searchQuery} />
      </Suspense>
    </StyledContainer>
  );
};
