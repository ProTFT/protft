import React from "react";
import { Stage } from "../../../../graphql/schema";
import { DialogForm } from "../DialogForm/DialogForm";
import { FormField } from "../DialogForm/FormField";

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (stage: Omit<Stage, "id" | "lobbies" | "rounds">) => void;
  stage?: Stage;
}

export const StageDialog = ({ dialogRef, formRef, onSubmit, stage }: Props) => {
  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={stage}
      onSubmit={onSubmit}
    >
      <FormField label="Name" name="name" />
      <FormField label="Description" name="description" />
      <FormField label="Order" name="sequence" type="number" />
      <FormField
        label="Point Schema"
        type="select"
        name="pointSchemaId"
        specialType="number"
      >
        <option value="2">8 - 1</option>
        <option value="1">10 - 8 - 6 - 1</option>
        <option value="3">9 - 7 - 1</option>
      </FormField>
      <FormField label="Round Count" name="roundCount" type="number" />
    </DialogForm>
  );
};
