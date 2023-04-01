import { CloseButtonIcon } from "../../design/icons/CloseButton";
import {
  StyledContainer,
  StyledDrawerBody,
  StyledDrawerHeader,
} from "./Drawer.styled";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Drawer = ({
  isOpen,
  onClose,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <StyledContainer isOpen={isOpen}>
      <div>
        <StyledDrawerHeader>
          <CloseButtonIcon onClick={onClose} />
        </StyledDrawerHeader>
        <StyledDrawerBody>{children}</StyledDrawerBody>
      </div>
    </StyledContainer>
  );
};
