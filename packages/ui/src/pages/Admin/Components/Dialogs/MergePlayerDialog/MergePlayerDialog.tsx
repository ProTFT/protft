import React from "react";
import { DialogForm } from "../../DialogForm/DialogForm";
import { FormField } from "../../DialogForm/FormField";

export interface MergePlayerParameters {
  playerIdToMaintain: number;
  playerIdToRemove: number;
}

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: ({
    playerIdToMaintain,
    playerIdToRemove,
  }: MergePlayerParameters) => void;
}

export const MergePlayerDialog = ({ dialogRef, formRef, onSubmit }: Props) => {
  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={{}}
      onSubmit={onSubmit}
    >
      <FormField
        label="ID to maintain"
        name="playerIdToMaintain"
        type="number"
      />
      <FormField label="ID to remove" name="playerIdToRemove" type="number" />
    </DialogForm>
  );
};
