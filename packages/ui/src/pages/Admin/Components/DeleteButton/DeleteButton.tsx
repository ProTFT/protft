import { StyledDeleteButton } from "./DeleteButton.styled";

interface Props {
  onClick: () => void;
}

export const DeleteButton = ({ onClick }: Props) => {
  return <StyledDeleteButton onClick={onClick}>X</StyledDeleteButton>;
};
