import React, { useCallback, useState } from "react";
import { Tournament } from "../../../../graphql/schema";
import { FormField } from "./FormField";
import { dbDateToHTML } from "./TournamentDialog.formatter";
import {
  StyledAddTournamentDialog,
  StyledActionButtons,
  StyledInactiveButton,
  StyledFullWidthButton,
  StyledForm,
} from "./TournamentDialog.styled";
import { TournamentForm } from "./TournamentDialog.types";

export interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>;
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (tournament: Omit<Tournament, "id" | "set">) => void;
  tournament?: Tournament;
}

export const TournamentDialog = ({
  dialogRef,
  formRef,
  onSubmit,
  tournament,
}: Props) => {
  const [localTournament, setLocalTournament] = useState<Tournament>({
    ...(tournament as Tournament),
    startDate: dbDateToHTML(tournament?.startDate),
    endDate: dbDateToHTML(tournament?.endDate),
  });

  const onChangeFormInput = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = target;
      setLocalTournament((prev) => ({
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
      const payload = formFields.reduce((prev, { name, type, value }) => {
        if (!name) {
          return prev;
        }
        const formattedValue = type === "number" ? Number(value) : value;
        return {
          ...prev,
          [name]: formattedValue,
        };
      }, {}) as TournamentForm;
      onSubmit({
        ...payload,
        region: [payload.region],
      });
    },
    [onSubmit]
  );

  return (
    <StyledAddTournamentDialog ref={dialogRef}>
      <StyledForm onSubmit={onConfirm} ref={formRef}>
        <FormField
          label="Name"
          name="name"
          value={localTournament.name}
          onChange={onChangeFormInput}
        />
        <FormField
          label="Region"
          name="region"
          value={localTournament.region}
          onChange={onChangeFormInput}
        />
        <FormField
          label="Host"
          name="host"
          value={localTournament.host}
          onChange={onChangeFormInput}
        />
        <FormField
          label="# of Participants"
          name="participantsNumber"
          type="number"
          value={localTournament.participantsNumber}
          onChange={onChangeFormInput}
        />
        <FormField
          label="Set"
          type="number"
          name="setId"
          value={localTournament.setId}
          onChange={onChangeFormInput}
        />
        <FormField
          label="Prize Pool"
          type="number"
          name="prizePool"
          value={localTournament.prizePool}
          onChange={onChangeFormInput}
        />
        <FormField
          label="Currency"
          name="currency"
          value={localTournament.currency}
          onChange={onChangeFormInput}
        />
        <FormField
          label="Start Date"
          type="date"
          name="startDate"
          value={localTournament.startDate}
          onChange={onChangeFormInput}
        />
        <FormField
          label="End Date"
          type="date"
          name="endDate"
          value={localTournament.endDate}
          onChange={onChangeFormInput}
        />
        <StyledActionButtons>
          <StyledInactiveButton
            type="button"
            onClick={() => {
              formRef.current?.reset();
              dialogRef.current?.close();
            }}
          >
            Close
          </StyledInactiveButton>
          <StyledFullWidthButton type="submit">Save</StyledFullWidthButton>
        </StyledActionButtons>
      </StyledForm>
    </StyledAddTournamentDialog>
  );
};
