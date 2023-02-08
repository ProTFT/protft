import React from "react";
import { Player } from "../../../../graphql/schema";
import { DialogForm } from "../DialogForm/DialogForm";
import { FormField } from "../DialogForm/FormField";
import * as lookup from "country-code-lookup";

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
      <FormField label="Country" type="select" name="country">
        {lookup.countries.map((country) => (
          <option key={country.iso2} value={country.iso3}>
            {`${country.iso3} - ${country.country}`}
          </option>
        ))}
      </FormField>
    </DialogForm>
  );
};
