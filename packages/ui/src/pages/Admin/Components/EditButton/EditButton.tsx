import { StyledEditButton } from "./EditButton.styled";

interface Props {
  onClick: () => void;
}

export const EditButton = ({ onClick }: Props) => {
  return <StyledEditButton onClick={onClick}>E</StyledEditButton>;
};
