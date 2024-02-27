import { CloneTournamentMutationVariables } from "../../../../../gql/graphql";
import { FormFieldProps } from "../../DialogForm/FormField";
import { BaseDialogProps } from "../Dialogs.types";
import { SET_OPTIONS } from "../TournamentDialog/TournamentDialog";
import { useEntityDialog } from "../useEntityDialog";

const TOURNAMENT_FORM_FIELDS: FormFieldProps[] = [
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Set",
    name: "setId",
    type: "select",
    specialType: "number",
    options: SET_OPTIONS,
  },
];

export interface Props
  extends BaseDialogProps<CloneTournamentMutationVariables> {
  entity: Partial<Pick<CloneTournamentMutationVariables, "name" | "setId">>;
}

export const useCloneTournamentDialog = ({
  entity,
  onSubmit,
  onSuccess,
}: Props) =>
  useEntityDialog({
    entity,
    formFields: TOURNAMENT_FORM_FIELDS,
    onSubmit,
    onSuccess,
  });
