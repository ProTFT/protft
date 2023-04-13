import { CloseButtonIcon } from "../../design/icons/CloseButton";
import { useScrollLock } from "../../hooks/useScrollLock";
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
  useScrollLock(true);

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
