import { useCallback, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { FilterButton } from "../SearchFilterBar/FilterButton";
import { Button, FilterContainer, DropdownContainer } from "./Dropdown.styled";

export interface DropdownItem<T> {
  value: T;
  label: string;
}

interface Props<T> {
  options: DropdownItem<T>[];
  onSelectOption: (selectedOption: T) => void;
  transformer?: (htmlValue: string) => T;
}

export const Dropdown = <T extends string | number>({
  options,
  onSelectOption,
  transformer = (input: string) => input as unknown as T,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((curr) => !curr);
  }, []);

  const onClickOption = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const target = event.target as HTMLButtonElement;
      const selectedValue = target.value;
      onSelectOption(transformer(selectedValue));
      setIsOpen(false);
    },
    [onSelectOption, transformer]
  );

  return (
    <FilterContainer>
      <FilterButton onClick={toggleOpen} />
      {isOpen && (
        <OutsideClickHandler onOutsideClick={toggleOpen}>
          <DropdownContainer>
            {options.map(({ label, value }) => (
              <Button key={value} onClick={onClickOption} value={value}>
                {label}
              </Button>
            ))}
          </DropdownContainer>
        </OutsideClickHandler>
      )}
    </FilterContainer>
  );
};
