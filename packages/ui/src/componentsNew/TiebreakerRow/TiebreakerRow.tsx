import {
  TiebreakerRowContainer,
  TiebreakerRowDescription,
  TiebreakerRowSequence,
} from "./TiebreakerRow.styled";

export const TiebreakerRow = () => {
  return (
    <TiebreakerRowContainer>
      <TiebreakerRowSequence>1</TiebreakerRowSequence>
      <TiebreakerRowDescription>
        Higher number of 1st places in the whole event
      </TiebreakerRowDescription>
    </TiebreakerRowContainer>
  );
};
