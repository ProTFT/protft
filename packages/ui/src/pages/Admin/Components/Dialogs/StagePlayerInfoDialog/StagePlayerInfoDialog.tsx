import { StagePlayerInfo } from "../../../../../graphql/schema";
import { FormFieldProps } from "../../DialogForm/FormField";
import { BaseDialogProps } from "../Dialogs.types";
import { useEntityDialog } from "../useEntityDialog";

export interface StagePlayerInfoDialogFields {
  extraPoints: number;
  tiebreakerRanking: number;
}

const STAGE_PLAYER_INFO_FIELDS: FormFieldProps[] = [
  {
    label: "Extra points",
    name: "extraPoints",
    type: "number",
  },
  {
    label: "Tiebreaker #",
    name: "tiebreakerRanking",
    type: "number",
  },
];

export interface Props extends BaseDialogProps<any> {
  stagePlayerInfo?: StagePlayerInfo;
}

export const useStagePlayerInfoDialog = ({
  onSubmit,
  onSuccess,
  stagePlayerInfo,
}: Props) =>
  useEntityDialog({
    entity: stagePlayerInfo,
    formFields: STAGE_PLAYER_INFO_FIELDS,
    onSubmit,
    onSuccess,
  });
