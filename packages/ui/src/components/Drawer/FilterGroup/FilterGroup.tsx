import { useCallback } from "react";
import { Checkbox } from "../../Checkbox/Checkbox";
import {
  StyledOptionContainer,
  StyledOptionText,
  StyledSubTitle,
} from "./FilterGroup.styled";

interface Props<T> {
  title: string;
  setSelected: (values: T[]) => void;
  options: FilterOptions<T>[];
  selectedOptions: T[];
}

interface FilterOptions<T> {
  value: T;
  label: string;
}

export const FilterGroup = <T extends Object>({
  title,
  setSelected,
  options,
  selectedOptions,
}: Props<T>) => {
  const onSelect = useCallback(
    (changeEvent: [T, boolean]) => {
      const [field, value] = changeEvent;
      setSelected([
        ...selectedOptions.filter((v) => v !== field),
        ...(value ? [field] : []),
      ]);
    },
    [selectedOptions, setSelected]
  );

  return (
    <div>
      <StyledSubTitle>{title}</StyledSubTitle>
      <div>
        {options.map(({ value, label }) => (
          <StyledOptionContainer key={String(value)}>
            <Checkbox
              checked={selectedOptions.includes(value)}
              field={value}
              onChange={onSelect}
            />
            <StyledOptionText>{label}</StyledOptionText>
          </StyledOptionContainer>
        ))}
      </div>
    </div>
  );
};
