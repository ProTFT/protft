import { useCallback, useRef } from "react";
import { EntityDialog, EntityDialogProps } from "./EntityDialog";

interface HookResponse {
  dialog: JSX.Element;
  openDialog: () => void;
}

export const useEntityDialog = (
  props: Omit<EntityDialogProps, "dialogRef">
): HookResponse => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  return {
    dialog: <EntityDialog dialogRef={dialogRef} {...props} />,
    openDialog,
  };
};
