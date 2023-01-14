import React from "react";
import { Player } from "../../../../graphql/schema";
import { DialogForm } from "../DialogForm/DialogForm";
import { FormField } from "../DialogForm/FormField";

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (player: Omit<Player, "id" | "playerStats">) => void;
  player?: Player;
}

export const PlayerDialog = ({
  dialogRef,
  formRef,
  onSubmit,
  player,
}: Props) => {
  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={player}
      onSubmit={onSubmit}
    >
      <FormField label="Name" name="name" />
      <FormField label="Region" name="region" />
      <FormField label="Country" name="country" />
    </DialogForm>
  );
};
