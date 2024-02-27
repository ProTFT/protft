import { AxiosError } from "axios";
import { Suspense, useCallback, useRef, useState } from "react";
import { useMutation } from "urql";
import { OnlyWebmaster } from "../../../components/AuthContainer/AuthContainer";
import { ProTFTButton } from "../../../components/Button/Button";
import { TextIconHorizontalContainer } from "../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { SearchField } from "../../../components/SearchFilterBar/SearchField";
import { client } from "../../../hooks/useAuth";
import { PlayersListSkeleton } from "../../Players/PlayersList/PlayersList.skeleton";
import { StyledAdminBar } from "../Components/AdminBar/AdminBar.styled";
import { FileDialog } from "../Components/Dialogs/FileDialog/FileDialog";
import {
  MergePlayerDialog,
  MergePlayerParameters,
} from "../Components/Dialogs/MergePlayerDialog/MergePlayerDialog";
import { useToast } from "../Components/Toast/Toast";
import { StyledContainer } from "./AdminPlayers.styled";
import { DryRunDialog, DryRunProps } from "./DryRunDialog";
import { PlayerList } from "./PlayerList/PlayerList";
import {
  MergePlayerResult,
  MergePlayerVariables,
  MERGE_PLAYER_MUTATION,
} from "./queries";

export const ADMIN_PLAYERS_PATH = "/admin/players";

export const AdminPlayers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dryRunData, setDryRunData] = useState<
    Pick<DryRunProps, "newPlayers" | "repeatedPlayers">
  >({
    newPlayers: [],
    repeatedPlayers: [],
  });
  const { show } = useToast();
  const playerDialogRef = useRef<HTMLDialogElement>(null);
  const playerFormRef = useRef<HTMLFormElement>(null);

  const mergeDialogRef = useRef<HTMLDialogElement>(null);
  const mergeFormRef = useRef<HTMLFormElement>(null);

  const dryRunDialogRef = useRef<HTMLDialogElement>(null);

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
    try {
      const response = await client.postForm("/players/uploadBulk", formData);
      if (dryRun) {
        setDryRunData(response.data);
        dryRunDialogRef.current?.showModal();
        return;
      }
      return response;
    } catch (error: unknown) {
      const axiosError = (error as AxiosError<{ message: string }>).response
        ?.data.message;
      alert(axiosError);
    }
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
        return;
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
      <StyledAdminBar>
        <SearchField
          placeholder="Search players"
          setSearchQuery={setSearchQuery}
        />
        <TextIconHorizontalContainer>
          <ProTFTButton onClick={onClickAddBulkPlayer}>Bulk Add</ProTFTButton>
          <OnlyWebmaster>
            <ProTFTButton onClick={onClickMergePlayer}>Merge</ProTFTButton>
          </OnlyWebmaster>
        </TextIconHorizontalContainer>
        <FileDialog
          dialogRef={playerDialogRef}
          formRef={playerFormRef}
          onSubmit={onSubmitBulkAddPlayer}
          showDryRun
        />
        <MergePlayerDialog
          dialogRef={mergeDialogRef}
          formRef={mergeFormRef}
          onSubmit={onSubmitMergePlayer}
        />
        <DryRunDialog dialogRef={dryRunDialogRef} {...dryRunData} />
      </StyledAdminBar>
      <Suspense fallback={<PlayersListSkeleton />}>
        <PlayerList searchQuery={searchQuery} />
      </Suspense>
    </StyledContainer>
  );
};
