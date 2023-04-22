import { FormFieldProps } from "../../DialogForm/FormField";
import { BaseDialogProps } from "../Dialogs.types";
import { useEntityDialog } from "../useEntityDialog";

export interface BulkPlayerListDialogFields {
  playerNames: string;
}

const PLAYER_LIST_FIELDS: FormFieldProps[] = [
  {
    label: "Players",
    name: "playerNames",
    type: "multiline",
  },
];

type Props = BaseDialogProps<BulkPlayerListDialogFields>;

export const useBulkPlayerListDialog = ({ onSubmit, onSuccess }: Props) =>
  useEntityDialog({
    formFields: PLAYER_LIST_FIELDS,
    onSubmit,
    onSuccess,
  });
