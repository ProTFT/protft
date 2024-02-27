import { SnakeSeedType } from "../../../../../gql/graphql";
import { FormFieldProps } from "../../DialogForm/FormField";
import { BaseDialogProps } from "../Dialogs.types";
import { useEntityDialog } from "../useEntityDialog";

const SEEDING_TYPE_OPTIONS = [
  {
    value: SnakeSeedType.Seeding,
    name: "Tournament Seeding",
  },
  {
    value: SnakeSeedType.CurrentStage,
    name: "Current stage results",
  },
  {
    value: SnakeSeedType.LastStage,
    name: "Last stage results",
  },
];

const TOURNAMENT_FORM_FIELDS: FormFieldProps[] = [
  {
    label: "Seed based on",
    name: "type",
    type: "select",
    specialType: "string",
    options: SEEDING_TYPE_OPTIONS,
  },
];

export const useSnakeSeedDialog = ({
  onSubmit,
  onSuccess,
}: BaseDialogProps<any>) =>
  useEntityDialog({
    formFields: TOURNAMENT_FORM_FIELDS,
    onSubmit,
    onSuccess,
  });
