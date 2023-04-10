import { OperationResult } from "urql";

export interface BaseDialogProps<T> {
  onSubmit: (variables: T) => Promise<OperationResult>;
  onSuccess?: () => void;
}
