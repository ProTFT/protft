import { useCallback } from "react";
import { Checkbox } from "../../Checkbox/Checkbox";
import {
  StyledOptionContainer,
  StyledOptionText,
  StyledSubTitle,
} from "./FilterGroup.styled";

interface Props {
  title: string;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  options: FilterOptions[];
}

interface FilterOptions {
  value: string;
  label: string;
}

export const FilterGroup = ({ title, setSelected, options }: Props) => {
  const onSelect = useCallback(
    (changeEvent: [string, boolean]) => {
      const [field, value] = changeEvent;
      setSelected((curr) => [
        ...curr.filter((v) => v !== field),
        ...(value ? [field] : []),
      ]);
    },
    [setSelected]
  );

  return (
    <div>
      <StyledSubTitle>{title}</StyledSubTitle>
      <div>
        {options.map(({ value, label }) => (
          <StyledOptionContainer key={value}>
            <Checkbox field={value} onChange={onSelect} />
            <StyledOptionText>{label}</StyledOptionText>
          </StyledOptionContainer>
        ))}
      </div>
    </div>
  );
};
