import React from "react";
import { useState, useCallback } from "react";
import {
  ButtonVariant,
  ProTFTButton,
} from "../../../../components/Button/Button";
import {
  StyledAddTournamentDialog,
  StyledForm,
  StyledActionButtons,
} from "../TournamentDialog/TournamentDialog.styled";
import { dbDateToHTML } from "./Dialog.formatter";

export interface Props<T, K> {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (formEntity: K) => void;
  //   onConfirm: React.FormEventHandler<HTMLFormElement>;
  entity?: T;
}

const formValueToAPI = ({
  type,
  value,
  dataset,
  files,
  checked,
}: HTMLInputElement) => {
  if (type === "number" || dataset.sptype === "number") {
    return Number(value);
  }
  if (type === "file") {
    return files;
  }
  if (type === "checkbox") {
    return checked;
  }
  if (dataset.sptype === "array") {
    const splitValue = value.replaceAll(" ", "").split(",");
    return [...splitValue];
  }
  if (dataset.sptype === "numberArray") {
    const splitValue = value.replaceAll(" ", "").split(",").map(Number);
    return [...splitValue];
  }
  return value;
};

const APIValueToForm = (
  node:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactPortal,
  value: any
) => {
  if (node.props.type === "date") {
    return dbDateToHTML(value);
  }
  if (node.props.type === "file") {
    return undefined;
  }
  return value;
};

export const DialogForm = <T extends object, K extends object>({
  dialogRef,
  formRef,
  onSubmit,
  entity,
  //   onConfirm,
  children,
}: React.PropsWithChildren<Props<T, K>>) => {
  const [localEntity, setLocalEntity] = useState<T>((entity as T) || {});

  const onChangeFormInput = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = target;
      setLocalEntity((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const onConfirm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formFields = Array.from(
        event.currentTarget.elements
      ) as HTMLInputElement[];
      const payload = formFields.reduce((prev, input) => {
        if (!input.name) {
          return prev;
        }
        const formattedValue = formValueToAPI(input);
        return {
          ...prev,
          [input.name]: formattedValue,
        };
      }, {}) as K;
      onSubmit(payload);
    },
    [onSubmit]
  );

  return (
    <StyledAddTournamentDialog ref={dialogRef}>
      <StyledForm onSubmit={onConfirm} ref={formRef}>
        <>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                onChange: onChangeFormInput,
                value: APIValueToForm(
                  child,
                  localEntity[child.props.name as keyof T]
                ),
              });
            }
          })}
        </>
        <StyledActionButtons>
          <ProTFTButton
            variant={ButtonVariant.Transparent}
            buttonColor="transparent"
            textColor="white"
            onClick={() => {
              setLocalEntity({} as T);
              formRef.current?.reset();
              dialogRef.current?.close();
            }}
          >
            Close
          </ProTFTButton>
          <ProTFTButton type="submit">Save</ProTFTButton>
        </StyledActionButtons>
      </StyledForm>
    </StyledAddTournamentDialog>
  );
};
