import { useCallback } from "react";
import { Text500 } from "../../design/fonts/NewFonts";
import { Tab, TabHeaderContainer } from "./TabHeader.styled";

export interface TabHeaderProps {
  options: { id: number; name: string }[];
  selectedOption: number;
  setSelectedOption: (selectedOption: number) => void;
}

export const TabHeader = ({
  options,
  selectedOption,
  setSelectedOption,
}: TabHeaderProps) => {
  const onClickTab = useCallback(
    (index: number) => () => {
      setSelectedOption(index);
    },
    [setSelectedOption]
  );

  return (
    <TabHeaderContainer numberOfOptions={options.length}>
      {options.map(({ id, name }) => (
        <Tab key={id} selected={id === selectedOption} onClick={onClickTab(id)}>
          <Text500>{name}</Text500>
        </Tab>
      ))}
    </TabHeaderContainer>
  );
};
