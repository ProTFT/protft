import React from "react";
import { Lobby } from "../../../../../graphql/schema";
import { DialogForm } from "../../DialogForm/DialogForm";
import { FormField } from "../../DialogForm/FormField";

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (lobby: Omit<Lobby, "id" | "stageId" | "players">) => void;
  lobby?: Lobby;
}

export const LobbyDialog = ({ dialogRef, formRef, onSubmit, lobby }: Props) => {
  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={lobby}
      onSubmit={onSubmit}
    >
      <FormField label="Sequence" type="number" name="sequence" />
    </DialogForm>
  );
};
