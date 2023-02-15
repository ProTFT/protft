import React from "react";
import { StagePlayerInfo } from "../../../../graphql/schema";
import { DialogForm } from "../DialogForm/DialogForm";
import { FormField } from "../DialogForm/FormField";

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (
    stagePlayerInfo: Pick<StagePlayerInfo, "extraPoints" | "tiebreakerRanking">
  ) => void;
  stagePlayerInfo?: StagePlayerInfo;
}

export const StagePlayerDialog = ({
  dialogRef,
  formRef,
  onSubmit,
  stagePlayerInfo,
}: Props) => {
  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={stagePlayerInfo}
      onSubmit={onSubmit}
    >
      <FormField label="Extra points" type="number" name="extraPoints" />
      <FormField label="Tiebreaker #" type="number" name="tiebreakerRanking" />
    </DialogForm>
  );
};
