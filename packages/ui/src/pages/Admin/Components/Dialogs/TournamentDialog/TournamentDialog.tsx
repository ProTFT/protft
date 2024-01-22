import { Tournament } from "../../../../../graphql/schema";
import { FormFieldProps } from "../../DialogForm/FormField";
import { BaseDialogProps } from "../Dialogs.types";
import { useEntityDialog } from "../useEntityDialog";

export const SET_OPTIONS = [
  {
    value: "1",
    name: "1 - Beta",
  },
  {
    value: "2",
    name: "2 - Rise of the Elements",
  },
  {
    value: "3",
    name: "3 - Galaxies",
  },
  {
    value: "4",
    name: "4 - Fates",
  },
  {
    value: "5",
    name: "5 - Reckoning",
  },
  {
    value: "6",
    name: "6 - Gizmos and Gadgets",
  },
  {
    value: "7",
    name: "7 - Dragonlands",
  },
  {
    value: "8",
    name: "8 - Monsters Attack!",
  },
  {
    value: "9",
    name: "9 - Runeterra Reforged",
  },
  {
    value: "10",
    name: "10 - Remix Rumble",
  },
];

const TOURNAMENT_FORM_FIELDS: FormFieldProps[] = [
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Region",
    name: "region",
    type: "text",
    specialType: "array",
  },
  {
    label: "Host",
    name: "host",
  },
  {
    label: "# of Participants",
    name: "participantsNumber",
    type: "number",
  },
  {
    label: "Set",
    name: "setId",
    type: "select",
    specialType: "number",
    options: SET_OPTIONS,
  },
  {
    label: "Prize Pool",
    name: "prizePool",
    type: "number",
  },
  {
    label: "Currency",
    name: "currency",
  },
  {
    label: "Start Date",
    name: "startDate",
    type: "date",
  },
  {
    label: "End Date",
    name: "endDate",
    type: "date",
  },
];

export interface Props extends BaseDialogProps<any> {
  tournament?: Tournament;
}

export const useTournamentDialog = ({
  tournament,
  onSubmit,
  onSuccess,
}: Props) =>
  useEntityDialog({
    entity: tournament,
    formFields: TOURNAMENT_FORM_FIELDS,
    onSubmit,
    onSuccess,
  });
