import { useCallback } from "react";
import { Text500 } from "../../design/fonts/NewFonts";
import { Tab, TabHeaderContainer } from "./TabHeader.styled";

export enum TabHeaderVariant {
  DEFAULT,
  MARKED,
  INACTIVE,
}

export interface TabHeaderProps {
  options: { id: number; name: string; variant?: TabHeaderVariant }[];
  selectedOption: number;
  setSelectedOption: (selectedOption: number) => void;
}

const variantMapToClass: { [key in TabHeaderVariant]: string } = {
  [TabHeaderVariant.DEFAULT]: "",
  [TabHeaderVariant.MARKED]: "marked",
  [TabHeaderVariant.INACTIVE]: "inactive",
};

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
      {options.map(({ id, name, variant = TabHeaderVariant.DEFAULT }) => (
        <Tab
          key={id}
          selected={id === selectedOption}
          onClick={
            variant === TabHeaderVariant.INACTIVE ? undefined : onClickTab(id)
          }
          className={variantMapToClass[variant]}
        >
          <Text500>{name}</Text500>
        </Tab>
      ))}
    </TabHeaderContainer>
  );
};
