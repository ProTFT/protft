import { useCallback, useState } from "react";
import { colors } from "../../design/colors";
import { useIsMobile } from "../../hooks/useIsMobile";
import { ButtonVariant, ProTFTButton } from "../Button/Button";
import { StyledButtonContainer } from "./SegmentedButton.styled";

interface Props<T> {
  buttons: { key: T; text: string }[];
  onChangeSelectedButton: (selected: T) => void;
}

const selectedButtonProperties = {
  variant: ButtonVariant.Primary,
};

const unselectedButtonProperties = {
  variant: ButtonVariant.Transparent,
  buttonColor: colors.blackBackground,
  textColor: colors.white,
};

export const SegmentedButton = <T extends Object>({
  buttons,
  onChangeSelectedButton,
}: Props<T>) => {
  const [selectedTab, setSelectedTab] = useState<T>(buttons[0].key);

  const buttonProperties = useCallback(
    (button: T) => {
      if (selectedTab === button) {
        return selectedButtonProperties;
      }
      return unselectedButtonProperties;
    },
    [selectedTab]
  );

  const onSelectTab = useCallback(
    (button: T) => () => {
      setSelectedTab(button);
      onChangeSelectedButton(button);
    },
    [onChangeSelectedButton]
  );

  const isMobile = useIsMobile();

  return (
    <StyledButtonContainer>
      {buttons.map(({ key, text }, index) => (
        <ProTFTButton
          key={index}
          {...(isMobile && { width: "100%" })}
          onClick={onSelectTab(key)}
          {...buttonProperties(key)}
        >
          {text}
        </ProTFTButton>
      ))}
    </StyledButtonContainer>
  );
};
