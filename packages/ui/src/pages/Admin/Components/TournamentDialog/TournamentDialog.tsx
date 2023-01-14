import React from "react";
import { Tournament } from "../../../../graphql/schema";
import { DialogForm } from "../DialogForm/DialogForm";
import { FormField } from "../DialogForm/FormField";

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (tournament: Omit<Tournament, "id" | "set">) => void;
  tournament?: Tournament;
}

const regionOptions = [
  {
    name: "World",
    value: "WO",
  },
  {
    name: "NA",
    value: "NA",
  },
  {
    name: "LATAM",
    value: "LA",
  },
  {
    name: "Brazil",
    value: "BR",
  },
  {
    name: "Oceania",
    value: "OCE",
  },
  {
    name: "EMEA",
    value: "EMEA",
  },
  {
    name: "Japan",
    value: "JP",
  },
  {
    name: "Korea",
    value: "KR",
  },
  {
    name: "China",
    value: "CN",
  },
];

export const TournamentDialog = ({
  dialogRef,
  formRef,
  onSubmit,
  tournament,
}: Props) => {
  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={tournament}
      onSubmit={onSubmit}
    >
      <FormField label="Name" name="name" />
      <FormField label="Region" type="text" name="region" specialType="array" />
      <FormField label="Host" name="host" />
      <FormField
        label="# of Participants"
        name="participantsNumber"
        type="number"
      />
      <FormField label="Set" type="select" name="setId" specialType="number">
        <option value="1">1 - Beta</option>
        <option value="2">2 - Rise of the Elements</option>
        <option value="3">3 - Galaxies</option>
        <option value="4">4 - Fates</option>
        <option value="5">5 - Reckoning</option>
        <option value="6">6 - Gizmos and Gadgets</option>
        <option value="7">7 - Dragonlands</option>
        <option value="8">8 - Monsters Attack!</option>
      </FormField>
      <FormField label="Prize Pool" type="number" name="prizePool" />
      <FormField label="Currency" name="currency" />
      <FormField label="Start Date" type="date" name="startDate" />
      <FormField label="End Date" type="date" name="endDate" />
    </DialogForm>
  );
};
