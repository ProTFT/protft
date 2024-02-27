import React, { useCallback, useRef } from "react";
import { OperationResult } from "urql";
import { Tournament } from "../../../../graphql/schema";
import { DialogForm } from "../DialogForm/DialogForm";
import { FormField, FormFieldProps } from "../DialogForm/FormField";
import { useToast } from "../Toast/Toast";

export interface EntityDialogProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  onSubmit: (entity: any) => Promise<OperationResult>;
  onSuccess?: (result?: any) => void;
  entity?: any;
  formFields: FormFieldProps[];
}

export const EntityDialog = ({
  dialogRef,
  onSubmit,
  onSuccess,
  entity,
  formFields,
}: EntityDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { show } = useToast();

  const onClickSubmit = useCallback(
    async (payload: Tournament) => {
      const result = await onSubmit(payload);
      if (result.error) {
        return alert(result.error);
      }
      show();
      onSuccess?.(result.data);
      formRef.current?.reset();
      dialogRef.current?.close();
    },
    [dialogRef, onSubmit, onSuccess, show]
  );

  return (
    <DialogForm
      dialogRef={dialogRef}
      formRef={formRef}
      entity={entity}
      onSubmit={onClickSubmit}
    >
      {formFields.map((field) => (
        <FormField key={field.label} {...field} />
      ))}
    </DialogForm>
  );
};
