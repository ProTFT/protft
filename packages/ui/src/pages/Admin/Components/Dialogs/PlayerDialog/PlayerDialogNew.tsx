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
  },
  {
    label: "Country",
    name: "country",
    type: "select",
    options: lookup.countries.map((country) => ({
      name: `${country.iso3} - ${country.country}`,
      value: country.iso3,
      key: country.iso2,
    })),
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
