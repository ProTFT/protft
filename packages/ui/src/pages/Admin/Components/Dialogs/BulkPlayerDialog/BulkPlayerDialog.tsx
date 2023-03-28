import React from "react";
import { Player } from "../../../../../graphql/schema";
import { DialogForm } from "../../DialogForm/DialogForm";
import { FormField } from "../../DialogForm/FormField";

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (args: {
    file: FileList;
    dryRun: boolean;
    ignorePlayerNumber: boolean;
  }) => void;
  player?: Player;
}

export const BulkPlayerDialog = ({ dialogRef, formRef, onSubmit }: Props) => {
  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={{ file: null }}
      onSubmit={onSubmit}
    >
      <FormField label="File" name="file" type="file" />
      <FormField label="Dry-run" name="dryRun" type="checkbox" />
      <FormField
        label="Ignore validation"
        name="ignorePlayerNumber"
        type="checkbox"
      />
    </DialogForm>
  );
};
