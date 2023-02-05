import React from "react";
import { Player } from "../../../../graphql/schema";
import { DialogForm } from "../DialogForm/DialogForm";
import { FormField } from "../DialogForm/FormField";

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (args: { playerNames: string }) => void;
  player?: Player;
}

export const BulkPlayerTournamentDialog = ({
  dialogRef,
  formRef,
  onSubmit,
}: Props) => {
  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={{ playerNames: "" }}
      onSubmit={onSubmit}
    >
      <FormField label="Players" name="playerNames" type="multiline" />
    </DialogForm>
  );
};
