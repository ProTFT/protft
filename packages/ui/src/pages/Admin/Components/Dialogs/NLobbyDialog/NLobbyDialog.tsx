import { FormFieldProps } from "../../DialogForm/FormField";
import { BaseDialogProps } from "../Dialogs.types";
import { useEntityDialog } from "../useEntityDialog";

export interface NLobbyDialogFields {
  quantity: number;
}

const N_LOBBY_FORM_FIELDS: FormFieldProps[] = [
  {
    label: "Quantity",
    name: "quantity",
    type: "number",
  },
];

type Props = BaseDialogProps<NLobbyDialogFields>;

export const useNLobbyDialog = ({ onSubmit, onSuccess }: Props) =>
  useEntityDialog({
    formFields: N_LOBBY_FORM_FIELDS,
    onSubmit,
    onSuccess,
  });
