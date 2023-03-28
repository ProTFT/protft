import React from "react";
import { LobbyGroup } from "../../../../../graphql/schema";
import { DialogForm } from "../../DialogForm/DialogForm";
import { FormField } from "../../DialogForm/FormField";

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (lobbyGroup: Omit<LobbyGroup, "id" | "stageId">) => void;
  lobbyGroup?: LobbyGroup;
}

export const LobbyGroupDialog = ({
  dialogRef,
  formRef,
  onSubmit,
  lobbyGroup,
}: Props) => {
  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={lobbyGroup}
      onSubmit={onSubmit}
    >
      <FormField label="Sequence" type="number" name="sequence" />
      <FormField label="Rounds Played" type="number" name="roundsPlayed" />
    </DialogForm>
  );
};
