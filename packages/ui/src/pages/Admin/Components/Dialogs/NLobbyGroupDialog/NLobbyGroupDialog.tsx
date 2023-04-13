import { FormFieldProps } from "../../DialogForm/FormField";
import { BaseDialogProps } from "../Dialogs.types";
import { useEntityDialog } from "../useEntityDialog";

export interface NLobbyGroupDialogFields {
  quantity: number;
  roundsPlayed: number;
}

const N_LOBBY_GROUP_FORM_FIELDS: FormFieldProps[] = [
  {
    label: "Quantity",
    name: "quantity",
    type: "number",
  },
  {
    label: "Rounds Played",
    name: "roundsPlayed",
    type: "number",
  },
];

type Props = BaseDialogProps<NLobbyGroupDialogFields>;

export const useNLobbyGroupDialog = ({ onSubmit, onSuccess }: Props) =>
  useEntityDialog({
    formFields: N_LOBBY_GROUP_FORM_FIELDS,
    onSubmit,
    onSuccess,
  });
