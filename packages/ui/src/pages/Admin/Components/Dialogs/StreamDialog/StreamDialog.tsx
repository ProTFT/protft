import React from "react";
import { TournamentStream } from "../../../../../graphql/schema";
import { DialogForm } from "../../DialogForm/DialogForm";
import { FormField } from "../../DialogForm/FormField";
import * as lookup from "country-code-lookup";

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (tournament: TournamentStream) => void;
  tournamentStream?: TournamentStream;
}

export const TournamentStreamDialog = ({
  dialogRef,
  formRef,
  onSubmit,
  tournamentStream,
}: Props) => {
  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={tournamentStream}
      onSubmit={onSubmit}
    >
      <FormField label="Name" name="name" />
      <FormField label="Link" name="link" />
      <FormField label="Platform" name="platform" />
      <FormField label="Language" name="language" type="select">
        {[
          <option key={"WO"} value="WO">
            WO - World
          </option>,
          ...lookup.countries.map((country) => (
            <option key={country.iso2} value={country.iso3}>
              {`${country.iso3} - ${country.country}`}
            </option>
          )),
        ]}
      </FormField>
      <FormField label="LIVE" name="isLive" type="checkbox" />
      <FormField label="VOD" name="isVOD" type="checkbox" />
    </DialogForm>
  );
};
