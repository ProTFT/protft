import { StyledSwitch } from "./Switch.styled";

interface SwitchProps {
  text: string;
  // selected: boolean;
  // setSelected:
  selectedBgColor?: string;
}

export const Switch = ({ text, selectedBgColor }: SwitchProps) => {
  return (
    <StyledSwitch selectedBackgroundColor={selectedBgColor}>
      <div className="indicator" />
      {text}
    </StyledSwitch>
  );
};
