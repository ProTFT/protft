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
  showDryRun?: boolean;
  showIgnoreValidation?: boolean;
}

export const FileDialog = ({
  dialogRef,
  formRef,
  onSubmit,
  showDryRun = false,
  showIgnoreValidation = false,
}: Props) => {
  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={{ file: null }}
      onSubmit={onSubmit}
    >
      <FormField label="File" name="file" type="file" />
      {showDryRun && (
        <FormField label="Dry-run" name="dryRun" type="checkbox" />
      )}
      {showIgnoreValidation && (
        <FormField
          label="Ignore validation"
          name="ignorePlayerNumber"
          type="checkbox"
        />
      )}
    </DialogForm>
  );
};
