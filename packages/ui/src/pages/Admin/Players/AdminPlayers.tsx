import { Suspense, useCallback, useRef, useState } from "react";
import { ProTFTButton } from "../../../components/Button/Button";
import { StyledHorizontalContainer } from "../../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { StyledSearchFilterBar } from "../../../components/SearchFilterBar/SearchFilterBar";
import { client } from "../../../hooks/useAuth";
import { PlayersListSkeleton } from "../../Players/PlayersList/PlayersList.skeleton";
import { BulkPlayerDialog } from "../Components/BulkPlayerDialog/BulkPlayerDialog";
import { useToast } from "../Components/Toast/Toast";
import { StyledContainer } from "./AdminPlayers.styled";
import { PlayerList } from "./PlayerList/PlayerList";

export const AdminPlayers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { show } = useToast();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  const onSubmit = useCallback(
    async ({ file, dryRun }: { file: FileList; dryRun: boolean }) => {
      const result = await onBulkAdd(file, dryRun);
      if (dryRun) {
        console.log(result?.data);
      }
      if (result?.status !== 201) {
        return alert(result?.statusText);
      }
      show();
      formRef.current?.reset();
      dialogRef.current?.close();
    },
    [onBulkAdd, show]
  );

  const onClickAddBulkPlayer = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <StyledContainer>
      <StyledHorizontalContainer>
        <StyledSearchFilterBar
          placeholder="Search players"
          setSearchQuery={setSearchQuery}
        />
        <ProTFTButton onClick={onClickAddBulkPlayer}>Bulk Add</ProTFTButton>
        <BulkPlayerDialog
          dialogRef={dialogRef}
          formRef={formRef}
          onSubmit={onSubmit}
        />
      </StyledHorizontalContainer>
      <Suspense fallback={<PlayersListSkeleton />}>
        <PlayerList searchQuery={searchQuery} />
      </Suspense>
    </StyledContainer>
  );
};
