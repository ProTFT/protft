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
      <FormField label="Point Schema" name="pointSchemaId" type="number" />
      <FormField label="Round Count" name="roundCount" type="number" />
      <FormField
        label="Tiebreakers"
        name="tiebreakers"
        specialType="numberArray"
      />
    </DialogForm>
  );
};

// id: number;
//   name: string;
//   sequence: number;
//   isFinal: boolean;
//   tournamentId: number;
//   pointSchemaId: number;
//   roundCount: number;
//   lobbies?: Nullable<Lobby[]>;
//   rounds?: Nullable<Round[]>;
