import React, { useMemo } from "react";
import { useQuery } from "urql";
import { dbUTCDateTimeToHTML } from "../../../../../formatter/Date";
import { Stage, StageType } from "../../../../../graphql/schema";
import { DialogForm } from "../../DialogForm/DialogForm";
import { FormField } from "../../DialogForm/FormField";
import { PointSchemasResponse, POINT_SCHEMA_IDS_QUERY } from "./queries";

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (stage: Omit<Stage, "id" | "lobbies" | "rounds">) => void;
  stage?: Stage;
}

const eightToOnePointSchemaId = 2;

export const StageDialog = ({ dialogRef, formRef, onSubmit, stage }: Props) => {
  const [{ data }] = useQuery<PointSchemasResponse>({
    query: POINT_SCHEMA_IDS_QUERY,
  });

  const formattedStageData = useMemo(
    () => ({
      ...stage,
      startDateTime: dbUTCDateTimeToHTML(stage?.startDateTime || undefined),
    }),
    [stage]
  );

  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={formattedStageData}
      onSubmit={onSubmit}
      defaultValues={{ pointSchemaId: eightToOnePointSchemaId }}
    >
      <FormField label="Name" name="name" />
      <FormField label="Description" name="description" />
      <FormField label="Order" name="sequence" type="number" />
      <FormField
        label="Point Schema"
        type="select"
        name="pointSchemaId"
        specialType="number"
      >
        {data?.pointSchemas.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </FormField>
      <FormField label="Round Qty." name="roundCount" type="number" />
      <FormField label="Stage Type" type="select" name="stageType">
        <option value={StageType.RANKING}>Ranking</option>
        <option value={StageType.GROUP_BASED}>Group based</option>
      </FormField>
      <FormField
        label="Time (UTC)"
        type="datetime-local"
        name="startDateTime"
      />
      <FormField label="Qualified Qty." name="qualifiedCount" type="number" />
    </DialogForm>
  );
};
