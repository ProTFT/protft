import { Player } from "../../../../../graphql/schema";
import { FormFieldProps } from "../../DialogForm/FormField";
import * as lookup from "country-code-lookup";
import { BaseDialogProps } from "../Dialogs.types";
import { useEntityDialog } from "../useEntityDialog";

const PLAYER_DIALOG_FIELDS: FormFieldProps[] = [
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Alias",
    name: "alias",
    type: "text",
    specialType: "array",
  },
  {
    label: "Region",
    name: "region",
    type: "select",
    options: [
      { name: "Brazil", value: "BR", key: "BR" },
      { name: "China", value: "CN", key: "CN" },
      { name: "EMEA", value: "EMEA", key: "EMEA" },
      { name: "Japan", value: "JP", key: "JP" },
      { name: "Korea", value: "KR", key: "KR" },
      { name: "LATAM", value: "LA", key: "LA" },
      { name: "North America", value: "NA", key: "NA" },
      { name: "Oceania", value: "OCE", key: "OCE" },
      { name: "SEA", value: "SEA", key: "SEA" },
    ],
  },
  {
    label: "Country",
    name: "country",
    type: "select",
    options: [
      ...lookup.countries.map((country) => ({
        name: `${country.iso3} - ${country.country}`,
        value: country.iso3,
        key: country.iso2,
      })),
      { name: "No Country EMEA", value: "!RL", key: "!RL" },
      { name: "No Country SEA", value: "!EA", key: "!EA" },
      { name: "No Country OCE", value: "!OC", key: "!OC" },
      { name: "No Country LATAM", value: "!LA", key: "!LA" },
    ],
  },
];

export interface Props extends BaseDialogProps<Player> {
  player?: Omit<Player, "links">;
}

export const usePlayerDialog = ({ player, onSubmit, onSuccess }: Props) =>
  useEntityDialog({
    entity: player,
    formFields: PLAYER_DIALOG_FIELDS,
    onSubmit,
    onSuccess,
  });
