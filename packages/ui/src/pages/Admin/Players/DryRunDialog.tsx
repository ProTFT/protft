import { useMemo } from "react";
import { ButtonVariant, ProTFTButton } from "../../../components/Button/Button";
import { StyledTitle } from "../../../design/fonts/Fonts";
import { Player } from "../../../gql/graphql";
import {
  StyledActionButtons,
  StyledAddTournamentDialog,
} from "../Components/Dialogs/TournamentDialog/TournamentDialog.styled";
import {
  DryRunContainer,
  DryRunNewPlayers,
  DryRunRepeatedPlayers,
} from "./DryRunDialog.styled";

export interface DryRunProps {
  newPlayers: Player[];
  repeatedPlayers: Player[];
  dialogRef: React.RefObject<HTMLDialogElement>;
}

const List = ({ players }: { players: Player[] }) => {
  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
  }, [players]);
  return (
    <>
      {sortedPlayers.map((player) => (
        <li key={player.id}>{player.name}</li>
      ))}
    </>
  );
};

export const DryRunDialog = ({
  newPlayers,
  repeatedPlayers,
  dialogRef,
}: DryRunProps) => {
  return (
    <StyledAddTournamentDialog style={{ borderRadius: "0" }} ref={dialogRef}>
      <StyledTitle>Dry Run</StyledTitle>
      <DryRunContainer>
        <DryRunNewPlayers>
          <StyledTitle>New</StyledTitle>
          <List players={newPlayers} />
        </DryRunNewPlayers>
        <DryRunRepeatedPlayers>
          <StyledTitle>Existing</StyledTitle>
          <List players={repeatedPlayers} />
        </DryRunRepeatedPlayers>
      </DryRunContainer>
      <StyledActionButtons>
        <ProTFTButton
          variant={ButtonVariant.Transparent}
          buttonColor="transparent"
          textColor="white"
          onClick={() => {
            dialogRef.current?.close();
          }}
        >
          Close
        </ProTFTButton>
      </StyledActionButtons>
    </StyledAddTournamentDialog>
  );
};
